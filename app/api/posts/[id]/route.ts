import { NextResponse } from 'next/server';
import { db } from '@/app/db/connector';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, published } = body;

    await db
      .update(posts)
      .set({
        title,
        slug,
        excerpt,
        content,
        category,
        published,
        updated_at: new Date(),
      })
      .where(eq(posts.id, parseInt(params.id, 10)));

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.delete(posts).where(eq(posts.id, parseInt(params.id, 10)));

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
