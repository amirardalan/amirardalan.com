import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from '@/db/connector';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

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

// Fetch the user's ID from the database using their email
export async function getUserIdByEmail(email: string): Promise<number | null> {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  console.log('Fetched user ID:', user.length ? user[0].id : null); // Debug log

  return user.length ? user[0].id : null;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user }) {
      // Check if user's email is in our allowlist
      if (!isAuthorizedEmail(user.email)) {
        return false;
      }

      // Check if the user already exists in the database
      const existingUser = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, user.email!))
        .limit(1);

      // If the user does not exist, insert them into the database
      if (!existingUser.length) {
        await db.insert(users).values({
          name: user.name || 'Unknown User',
          email: user.email!,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to /admin after sign-in
      return `${baseUrl}/admin`;
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
