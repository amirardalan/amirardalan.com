import { NextResponse } from 'next/server';
import { db } from '@/app/db/connector';
import { posts, users } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const drafts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        updated_at: posts.updated_at,
        user_name: users.name,
      })
      .from(posts)
      .leftJoin(users, eq(posts.user_id, users.id))
      .where(eq(posts.published, false))
      .orderBy(desc(posts.updated_at));

    return NextResponse.json(drafts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
