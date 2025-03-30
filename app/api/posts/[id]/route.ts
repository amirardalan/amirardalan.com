import { updatePost, deletePost } from '@/db/queries/posts';
import { auth } from '@/auth';

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();
    const { title, slug, excerpt, content, category, published } = data;

    if (!id || !title || !slug || !content) {
      return NextResponse.json(
        { error: 'Post ID, title, slug, and content are required.' },
        { status: 400 }
      );
    }

    // Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        {
          error:
            'Invalid slug format. Only lowercase letters, numbers, and hyphens are allowed.',
        },
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
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

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
