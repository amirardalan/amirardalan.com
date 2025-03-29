import { db } from '@/src/db/connector';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

// Get a user ID by their email address
export async function getUserIdByEmail(email: string): Promise<number | null> {
  const user = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user.length ? user[0].id : null;
}

// Create a new user
export async function createUser(name: string, email: string) {
  await db.insert(users).values({
    name: name || 'Unknown User',
    email: email,
    created_at: new Date(),
    updated_at: new Date(),
  });
}

// Check if a user already exists
export async function userExists(email: string) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return existingUser.length > 0;
}
