import { createClient } from '@/utils/supabase/server';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const {
      title,
      slug,
      content,
      excerpt,
      category,
      featured,
      published,
      showEdited,
    } = await request.json();

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { message: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Fetch the user's email from the database using the email from the session
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('Post')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        { message: 'A post with this slug already exists' },
        { status: 409 }
      );
    }

    // Insert new post
    const { data, error } = await supabase
      .from('Post')
      .insert({
        title,
        slug,
        content,
        excerpt,
        category,
        featured,
        published,
        showEdited,
        authorId: user.id,
        publishedAt: new Date().toISOString(),
        editedAt: new Date().toISOString(),
        likes: 0,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating post:', error);
      return NextResponse.json(
        { message: 'Failed to create post', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        message: 'An unexpected error occurred',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
