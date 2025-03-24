import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { BlogService } from '@/lib/services/blog-service';

export async function DELETE({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user || !session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Await params before using it
    const params = await paramsPromise;
    const { id } = params;

    // Use the blog service to delete the post
    const { success, error } = await BlogService.deletePost(
      id,
      session.user.id
    );

    if (!success) {
      return NextResponse.json(
        { message: error },
        { status: error === 'Post not found' ? 404 : 403 }
      );
    }

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
