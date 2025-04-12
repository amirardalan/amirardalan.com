import { dbUpdatePost, dbDeletePost } from '@/db/queries/posts';
import { auth } from '@/lib/auth';
import { validateCsrfToken } from '@/lib/csrf';

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // Ensure user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const requestData = await request.json();

    // Extract CSRF token from headers
    const csrfToken = request.headers.get('x-csrf-token');

    // Check if token exists - but we need to pass both tokens to validateCsrfToken
    if (!csrfToken) {
      return NextResponse.json(
        { error: 'CSRF token is missing from headers.' },
        { status: 400 }
      );
    }

    // Only validate if requestData.csrfToken exists
    if (requestData.csrfToken) {
      validateCsrfToken(requestData.csrfToken, csrfToken);
    }

    // Update the post in the database
    const result = await dbUpdatePost(postId, {
      title: requestData.title,
      slug: requestData.slug,
      excerpt: requestData.excerpt,
      content: requestData.content,
      category: requestData.category,
      published: requestData.published,
      show_updated: requestData.show_updated,
      featured: requestData.featured,
    });

    // Revalidate paths
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');
    await revalidatePath(`/blog/${requestData.slug}`);

    if (result.oldSlug && result.oldSlug !== requestData.slug) {
      await revalidatePath(`/blog/${result.oldSlug}`);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in PUT /api/posts/[id]:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // Ensure user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const postId = parseInt(params.id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    // Delete the post
    const result = await dbDeletePost(postId);

    // Revalidate paths
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    if (result.wasPublished) {
      await revalidatePath(`/blog/${result.slug}`);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in DELETE /api/posts/[id]:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
