import { NextResponse } from 'next/server';
import { dbCreatePost, dbUpdatePost, dbDeletePost } from '@/db/queries/posts';
import { auth } from '@/lib/auth';
import { getUserIdByEmail } from '@/db/queries/users';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = await getUserIdByEmail(session.user.email);
    if (!userId) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const data = await req.json();

    // Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required.' },
        { status: 400 }
      );
    }

    const postData = {
      ...data,
      user_id: userId,
      excerpt: data.excerpt || null,
      created_at: new Date(),
      published: data.published === true,
      featured: data.featured === true,
      show_updated: data.show_updated === true,
    };

    const postId = await dbCreatePost(postData);

    // If published, revalidate blog-list, blog-post:{slug}, and sitemap
    if (postData.published) {
      await revalidateTag('blog-list');
      await revalidateTag(`blog-post:${postData.slug}`);
      await revalidateTag('sitemap');
    }

    return NextResponse.json({ id: postId }, { status: 201 });
  } catch (error) {
    // Check for specific database errors like unique constraint violation
    if (error instanceof Error && error.message.includes('posts_slug_unique')) {
      return NextResponse.json(
        {
          error: `A post with the slug "${(await req.clone().json()).slug}" already exists.`,
        },
        { status: 409 }
      );
    }
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post.' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const data = await req.json();
    const { id, ...postData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    // Basic validation for core fields during update
    if (
      postData.title === '' ||
      postData.slug === '' ||
      postData.content === ''
    ) {
      return NextResponse.json(
        { error: 'Title, slug, and content cannot be empty.' },
        { status: 400 }
      );
    }

    // Ensure boolean values are handled correctly and category_id is properly processed
    const updateData = {
      ...postData,
      published: postData.published === true,
      featured: postData.featured === true,
      show_updated: postData.show_updated === true,
      // Explicitly handle category_id to make sure null is sent as null, not undefined
      category_id:
        postData.category_id !== undefined ? postData.category_id : null,
    };

    const result = await dbUpdatePost(parseInt(id, 10), updateData);

    // If the post was published or is now published, revalidate
    if (result.wasPublished || updateData.published) {
      await revalidateTag('blog-list');
      await revalidateTag(`blog-post:${result.oldSlug}`);
      if (result.newSlug && result.newSlug !== result.oldSlug) {
        await revalidateTag(`blog-post:${result.newSlug}`);
      }
      await revalidateTag('sitemap');
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.message.includes('posts_slug_unique')) {
      return NextResponse.json(
        {
          error: `A post with the slug "${(await req.clone().json()).slug}" already exists.`,
        },
        { status: 409 }
      );
    }
    console.error('Failed to update post:', error);
    return NextResponse.json(
      { error: 'Failed to update post.' },
      { status: 500 }
    );
  }
}

// Add DELETE handler for completeness
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const data = await req.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    const result = await dbDeletePost(parseInt(id, 10));

    // If the post was published, revalidate
    if (result.wasPublished) {
      await revalidateTag('blog-list');
      await revalidateTag(`blog-post:${result.slug}`);
      await revalidateTag('sitemap');
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post.' },
      { status: 500 }
    );
  }
}
