import { dbUpdatePost, dbDeletePost } from '@/db/queries/posts';
import { auth } from '@/lib/auth';

// Import NextRequest again
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

// Update PUT handler signature to expect params as a Promise
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Revert params type to Promise
): Promise<NextResponse> {
  try {
    const session = await auth();

    // Ensure user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Await the params promise to get the id
    const { id } = await params;
    const postId = parseInt(id);
    if (isNaN(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const requestData = await request.json();

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
    // Ensure the error response also matches NextResponse
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Update DELETE handler signature to expect params as a Promise
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Revert params type to Promise
): Promise<NextResponse> {
  try {
    const session = await auth();

    // Ensure user is authenticated
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Await the params promise to get the id
    const { id } = await params;
    const postId = parseInt(id);
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
    // Ensure the error response also matches NextResponse
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
