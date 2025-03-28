import { NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const { title, slug, excerpt, content, category, published } = data;

    if (!params.id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

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

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const post = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(eq(posts.id, parseInt(id, 10)))
      .limit(1);

    if (post.length) {
      await db.delete(posts).where(eq(posts.id, parseInt(id, 10)));

      revalidatePath('/blog');
      revalidatePath(`/blog/${post[0].slug}`);

      return NextResponse.json({ message: 'Post deleted successfully' });
    }

    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
