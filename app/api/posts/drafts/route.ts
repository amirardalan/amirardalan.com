import { NextResponse } from 'next/server';
import { db } from '@/app/db/db';
import { posts } from '@/app/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET() {
  try {
    const drafts = await db
      .select()
      .from(posts)
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
