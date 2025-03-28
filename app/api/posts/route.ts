import { NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { posts } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, user_id, published } =
      body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required to create a post.' },
        { status: 400 }
      );
    }

    await db.insert(posts).values({
      title,
      slug,
      excerpt,
      content,
      category,
      user_id,
      published,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({ message: 'Post created successfully.' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
