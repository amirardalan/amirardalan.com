import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

/*
 * Note: Supabase provides built-in rate limiting for its APIs.
 * This middleware adds an additional layer of rate limiting for custom logic
 * or for users who are not using Supabase.
 */
export function middleware(request: NextRequest) {
  // Only apply to blog API routes
  if (request.nextUrl.pathname.startsWith('/api/blog')) {
    // Safely extract the IP address from the x-forwarded-for header
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor?.split(',')[0]?.trim() || 'anonymous';

    const userId = request.cookies.get('userId')?.value || ip;
    const identifier = `${userId}:${request.nextUrl.pathname}`;

    // Use a stateless rate-limiting mechanism
    const requestCount = parseInt(
      request.cookies.get(identifier)?.value || '0',
      10
    );

    if (requestCount >= MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set updated request count in cookies
    const response = NextResponse.next();
    response.cookies.set(identifier, (requestCount + 1).toString(), {
      maxAge: RATE_LIMIT_WINDOW / 1000, // Expire with the time window
    });

    return response;
  }

  return NextResponse.next();
}
