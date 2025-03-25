import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for tracking request counts
// Note: This won't work with multiple instances/serverless environments
const requestStore: Record<string, { count: number; timestamp: number }> = {};

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export function middleware(request: NextRequest) {
  // Only apply to blog API routes
  if (request.nextUrl.pathname.startsWith('/api/blog')) {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
    const userId = request.cookies.get('userId')?.value || ip;
    const identifier = `${userId}:${request.nextUrl.pathname}`;

    const now = Date.now();

    // Clean up old entries
    Object.keys(requestStore).forEach((key) => {
      if (now - requestStore[key].timestamp > RATE_LIMIT_WINDOW) {
        delete requestStore[key];
      }
    });

    // Initialize or update request count
    if (!requestStore[identifier]) {
      requestStore[identifier] = { count: 1, timestamp: now };
    } else {
      requestStore[identifier].count++;
    }

    // Check if rate limited
    if (requestStore[identifier].count > MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return NextResponse.next();
}
