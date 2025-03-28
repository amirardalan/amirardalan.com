import { NextResponse } from 'next/server';
import { db } from '@/app/db/connector';
import { posts } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, slug, excerpt, content, category, authorId, published } =
      body;

    await db.insert(posts).values({
      title,
      slug,
      excerpt,
      content,
      category,
      authorId,
      published,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return NextResponse.json({ message: 'Post created successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
