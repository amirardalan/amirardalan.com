import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware function to handle requests
export function middleware(request: NextRequest) {
  // Pass through the request without modifications
  return NextResponse.next();
}

// Configuration to match all paths
export const config = {
  matcher: '/:path*',
};
