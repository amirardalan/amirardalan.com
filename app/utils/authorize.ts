import { redirect } from 'next/navigation';
import { auth, isAuthorizedEmail } from '@/auth';

/**
 * Server component helper to require authorization
 * Redirects to error page if user is not authorized
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect(
      '/auth/signin?callbackUrl=' +
        encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL || '')
    );
  }

  if (!isAuthorizedEmail(session.user.email)) {
    redirect('/auth/error?error=AccessDenied');
  }

  return session;
}
