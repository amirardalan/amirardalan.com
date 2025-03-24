import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { auth } from '@/auth';

export async function DELETE({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user || !session.user.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Await params before using it
    const params = await paramsPromise;
    const { id } = params;

    // Connect to Supabase
    const supabase = await createClient();

    // Fetch the post to verify it exists
    const { data: post, error: fetchError } = await supabase
      .from('Post')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      console.error('Post not found or fetch error:', fetchError); // Log fetch error
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Fetch the user from the database to verify the email
    const { data: user, error: userError } = await supabase
      .from('users') // Correct table name
      .select('email')
      .eq('id', post.authorId)
      .single();

    if (userError || !user || user.email !== session.user.email) {
      console.error('User not found or email mismatch:', userError); // Log user fetch error
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only allow deletion of draft posts
    if (post.published) {
      return NextResponse.json(
        { message: 'Cannot delete published posts' },
        { status: 403 }
      );
    }

    // Delete the post
    const { error: deleteError } = await supabase
      .from('Post')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Failed to delete post:', deleteError); // Log delete error
      return NextResponse.json(
        { message: 'Failed to delete post', error: deleteError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting post:', error); // Log general error
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
