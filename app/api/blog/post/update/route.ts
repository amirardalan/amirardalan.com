import { createClient } from '@/utils/supabase/server';
import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
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
    const { id, title, slug, content, excerpt, category, published } =
      await request.json();

    // Validate required fields
    if (!id || !title || !slug || !content) {
      return NextResponse.json(
        { message: 'ID, title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const supabase = await createClient();

    // Check if the post exists
    const { data: existingPost, error: fetchError } = await supabase
      .from('Post')
      .select('id, slug, published')
      .eq('id', id)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Check if the new slug already exists for a different post
    if (slug !== existingPost.slug) {
      const { data: slugCheck } = await supabase
        .from('Post')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .single();

      if (slugCheck) {
        return NextResponse.json(
          { message: 'A different post with this slug already exists' },
          { status: 409 }
        );
      }
    }

    // Update the post
    const { data, error } = await supabase
      .from('Post')
      .update({
        title,
        slug,
        content,
        excerpt,
        category,
        published,
        editedAt: new Date().toISOString(),
        publishedAt:
          published && !existingPost.published
            ? new Date().toISOString()
            : undefined,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating post:', error);
      return NextResponse.json(
        { message: 'Failed to update post', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
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
