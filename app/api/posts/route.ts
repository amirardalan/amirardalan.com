import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { dbCreatePost, dbUpdatePost } from '@/db/queries/posts';
import { getUserIdByEmail } from '@/db/queries/users';
import { BlogPost } from '@/types/blog';

export async function POST(req: NextRequest) {
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
      category_id: data.category_id !== undefined ? data.category_id : null,
      created_at: new Date(),
      published: data.published === true,
      featured: data.featured === true,
      show_updated: data.show_updated === true,
    };

    const postId = await dbCreatePost(postData);

    revalidateTag('posts');
    if (postData.published) {
      revalidateTag('published-posts');
      revalidateTag('blog-list');
      revalidateTag(`blog-post:${postData.slug}`);
      revalidateTag('sitemap');
    }

    return NextResponse.json({ id: postId }, { status: 201 });
  } catch (error) {
    console.error('POST /api/posts Error:', error);
    if (error instanceof Error && error.message.includes('posts_slug_unique')) {
      const reqBody = await req.clone().json();
      return NextResponse.json(
        {
          error: `A post with the slug "${reqBody.slug}" already exists. posts_slug_unique`,
        },
        { status: 409 }
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to create post';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const postData = await req.json();
    const id = postData.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<BlogPost> = {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      published: postData.published,
      featured: postData.featured,
      show_updated: postData.show_updated,
      category_id:
        postData.category_id !== undefined ? postData.category_id : null,
    };

    const result = await dbUpdatePost(parseInt(id, 10), updateData);

    revalidateTag('posts');
    revalidateTag('published-posts');
    revalidateTag('sitemap');
    revalidatePath(`/blog/${result.newSlug || result.oldSlug}`);
    revalidatePath('/admin/blog/edit/[slug]', 'page');

    if (result.wasPublished || updateData.published) {
      revalidateTag('blog-list');
      revalidateTag(`blog-post:${result.oldSlug}`);
      if (result.newSlug && result.newSlug !== result.oldSlug) {
        revalidateTag(`blog-post:${result.newSlug}`);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('PUT /api/posts Error:', error);
    if (error instanceof Error && error.message.includes('posts_slug_unique')) {
      const reqBody = await req.clone().json();
      return NextResponse.json(
        {
          error: `A post with the slug "${reqBody.slug}" already exists. posts_slug_unique`,
        },
        { status: 409 }
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to update post';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
