import { NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const { title, slug, excerpt, content, category, published } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get the original post to check if publish status changed
    const originalPost = await db
      .select({ published: posts.published, slug: posts.slug })
      .from(posts)
      .where(eq(posts.id, parseInt(id, 10)))
      .limit(1);

    const wasPublished = originalPost[0]?.published;
    const oldSlug = originalPost[0]?.slug;

    // Update post in database
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
      .where(eq(posts.id, parseInt(id, 10)));

    console.log('Post updated:', { id, slug, published });

    // Revalidation strategy
    // 1. Always revalidate the blog listing page and blog tag
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    // 2. Revalidate the specific post page (both old and new slug if changed)
    await revalidatePath(`/blog/${slug}`);

    if (oldSlug && oldSlug !== slug) {
      await revalidatePath(`/blog/${oldSlug}`);
    }

    // 3. Call the revalidation API for additional revalidation
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: process.env.REVALIDATION_TOKEN,
          path: '/blog',
          slug: slug,
          tag: 'blog-posts',
        }),
      });
    } catch (revalidateErr) {
      console.error('Revalidation API error:', revalidateErr);
    }

    return NextResponse.json({
      message: 'Post updated successfully',
      slug: slug,
    });
  } catch (error) {
    console.error('Post update error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // For DELETE, we're using searchParams instead of params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Get the post slug before deletion for revalidation
    const post = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(eq(posts.id, parseInt(id, 10)))
      .limit(1);

    if (!post.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const slug = post[0].slug;

    // Delete the post
    await db.delete(posts).where(eq(posts.id, parseInt(id, 10)));

    console.log('Post deleted:', { id, slug });

    // Revalidation strategy
    // 1. Always revalidate the blog listing page
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    // 2. Revalidate the specific post page
    await revalidatePath(`/blog/${slug}`);

    // 3. Call the revalidation API
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: process.env.REVALIDATION_TOKEN,
          path: '/blog',
          slug: slug,
          tag: 'blog-posts',
        }),
      });
    } catch (revalidateErr) {
      console.error('Revalidation API error:', revalidateErr);
    }

    return NextResponse.json({
      message: 'Post deleted successfully',
      slug: slug,
    });
  } catch (error) {
    console.error('Post deletion error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
