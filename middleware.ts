import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { generateCsrfToken } from '@/utils/csrf';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Clone the response and set the custom header
  const response = NextResponse.next();
  response.headers.set('x-next-pathname', pathname);

  // Generate and set CSRF token cookie for forms
  if (pathname.startsWith('/admin/blog')) {
    const csrfToken = await generateCsrfToken();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: true,
    });
  }

  return response;
}

// Specify the paths where the middleware should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory files (e.g., /images/, /fonts/)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images/|fonts/).*)',
  ],
};
