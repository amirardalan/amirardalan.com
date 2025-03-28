import { NextResponse } from 'next/server';
import { db } from '@/db/connector';
import { posts } from '@/db/schema';
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

    // Insert new post into database
    const result = await db
      .insert(posts)
      .values({
        title,
        slug,
        excerpt,
        content,
        category,
        user_id,
        published,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning({ id: posts.id });

    console.log('Post created:', { id: result[0]?.id, slug });

    // Revalidation strategy
    // 1. Always revalidate the blog listing page
    await revalidatePath('/blog');
    await revalidateTag('blog-posts');

    // 2. If published, revalidate the specific post page
    if (published) {
      await revalidatePath(`/blog/${slug}`);
    }

    // 3. Call revalidate API for additional paths if needed
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: process.env.REVALIDATION_TOKEN,
          path: '/blog',
          slug: published ? slug : null,
        }),
      });
    } catch (revalidateErr) {
      console.error('Revalidation API error:', revalidateErr);
    }

    return NextResponse.json({
      message: 'Post created successfully.',
      id: result[0]?.id,
    });
  } catch (error) {
    console.error('Post creation error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
