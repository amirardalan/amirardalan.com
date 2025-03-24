import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

/**
 * Check if an email is authorized based on environment variables
 */
export function isAuthorizedEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  // Get allowed emails from environment variable
  const allowedEmails =
    process.env.ALLOWED_EMAILS?.split(',').map((e) => e.trim()) || [];
  if (allowedEmails.includes(email)) return true;

  // Get allowed domains from environment variable
  const allowedDomains =
    process.env.ALLOWED_EMAIL_DOMAINS?.split(',').map((d) => d.trim()) || [];
  const emailDomain = email.split('@')[1];
  if (emailDomain && allowedDomains.includes(emailDomain)) return true;

  return false;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      // Check if user's email is in our allowlist
      return isAuthorizedEmail(user.email);
    },
    async redirect({ url, baseUrl }) {
      // If url starts with baseUrl, it's a relative URL, so we can return it directly
      if (url.startsWith(baseUrl)) return url;
      // Otherwise, make sure we only redirect to relative URLs for security
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Fall back to the default behavior which is to go to the homepage
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

// Helper function to check if the current user is authorized
export async function isAuthorized() {
  const session = await auth();
  return !!session?.user && isAuthorizedEmail(session.user.email);
}
