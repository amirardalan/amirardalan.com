import { NextResponse } from 'next/server';
import { createPost } from '@/services/posts';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, category, user_id, published } =
      body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required to create a post.' },
        { status: 400 }
      );
    }

    // Use the service to create a post
    const postId = await createPost({
      title,
      slug,
      excerpt,
      content,
      category,
      user_id,
      published,
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log('Post created:', { id: postId, slug });

    // Revalidation strategy
    // 1. Always revalidate the blog listing page
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    // 2. If published, revalidate the specific post page
    if (published) {
      await revalidatePath(`/blog/${slug}`);
    }

    return NextResponse.json({
      message: 'Post created successfully.',
      id: postId,
    });
  } catch (error) {
    console.error('Post creation error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
