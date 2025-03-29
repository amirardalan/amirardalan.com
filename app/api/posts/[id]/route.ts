import { NextResponse } from 'next/server';
import { updatePost, deletePost } from '@/services/posts';
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

    // Use the service to update the post
    const { oldSlug, newSlug } = await updatePost(parseInt(id, 10), {
      title,
      slug,
      excerpt,
      content,
      category,
      published,
    });

    console.log('Post updated:', { id, slug, published });

    // Revalidation strategy
    // 1. Always revalidate the blog listing page and blog tag
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    // 2. Revalidate the specific post page (both old and new slug if changed)
    await revalidatePath(`/blog/${slug}`);

    if (oldSlug && oldSlug !== newSlug) {
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
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // Use the service to delete the post
    const { slug, wasPublished } = await deletePost(parseInt(id, 10));

    console.log('Post deleted:', { id, slug, wasPublished });

    // Revalidation strategy
    // 1. Always revalidate the blog listing page
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    // 2. Revalidate the specific post page if it was published
    if (wasPublished) {
      await revalidatePath(`/blog/${slug}`);
    }

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
