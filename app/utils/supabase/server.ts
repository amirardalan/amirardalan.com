import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Regular client with cookies - use for authenticated/request-scoped operations
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.DATABASE_URL!,
    process.env.DATABASE_API_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Static client without cookies - use for static generation
export function createStaticClient() {
  return createServerClient(
    process.env.DATABASE_URL!,
    process.env.DATABASE_API_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // No-op during static generation
        },
      },
    }
  );
}
