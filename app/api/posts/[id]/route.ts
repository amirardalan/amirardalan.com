import { NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

type RevalidateResponse = {
  revalidate: (path: string) => Promise<void>;
};

export async function PUT(
  req: Request,
  { params, res }: { params: { id: string }; res: RevalidateResponse }
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

    // Revalidate the blog post page and the blog landing page
    await res.revalidate(`/blog/${slug}`);
    await res.revalidate('/blog');

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
  { params, res }: { params: { id: string }; res: RevalidateResponse }
) {
  try {
    const post = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(eq(posts.id, parseInt(params.id, 10)))
      .limit(1);

    if (post.length) {
      await db.delete(posts).where(eq(posts.id, parseInt(params.id, 10)));

      // Revalidate the blog post page and the blog landing page
      await res.revalidate(`/blog/${post[0].slug}`);
      await res.revalidate('/blog');

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
