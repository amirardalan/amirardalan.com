import { NextResponse } from 'next/server';
import { createPost, updatePost } from '@/src/db/queries/posts';
import { generateCsrfToken, validateCsrfToken } from '@/lib/csrf';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { csrfToken, ...data } = body;

    const serverToken = req.headers.get('x-csrf-token');
    validateCsrfToken(csrfToken, serverToken);

    if (!data.title || !data.slug || !data.content || !data.user_id) {
      return NextResponse.json(
        { error: 'Title, slug, content, and user_id are required.' },
        { status: 400 }
      );
    }

    const postData = {
      ...data,
      excerpt: data.excerpt || null,
      created_at: new Date(),
    };

    const postId = await createPost(postData);
    return NextResponse.json({ id: postId }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to create post.' },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { csrfToken, id, ...data } = body;

    const serverToken = req.headers.get('x-csrf-token');
    validateCsrfToken(csrfToken, serverToken);

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    if (!data.title || !data.slug || !data.content || !data.user_id) {
      return NextResponse.json(
        { error: 'Title, slug, content, and user_id are required.' },
        { status: 400 }
      );
    }

    const result = await updatePost(parseInt(id, 10), data);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to update post.' },
      { status: 500 }
    );
  }
}
