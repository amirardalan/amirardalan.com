import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Clone the response and set the custom header
  const response = NextResponse.next();
  response.headers.set('x-next-pathname', pathname);

  return response;
}

// Specify the paths where the middleware should run
export const config = {
  matcher: '/:path*', // Apply middleware to all routes
};
