import { NextResponse } from 'next/server';
import { db } from '@/app/db/connector';
import { posts } from '@/app/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ensure user_id is included in the payload
    const { title, slug, excerpt, content, category, user_id, published } =
      body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required to create a post.' },
        { status: 400 }
      );
    }

    // Insert the new post into the database
    await db.insert(posts).values({
      title,
      slug,
      excerpt,
      content,
      category,
      user_id, // Store user_id
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
