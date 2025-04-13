import { NextResponse } from 'next/server';
import { dbCreatePost, dbUpdatePost } from '@/db/queries/posts';

export async function POST(req: Request) {
  try {
    const data = await req.json();

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

    const postId = await dbCreatePost(postData);
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
    const data = await req.json();
    const { id, ...postData } = data;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    if (
      !postData.title ||
      !postData.slug ||
      !postData.content ||
      !postData.user_id
    ) {
      return NextResponse.json(
        { error: 'Title, slug, content, and user_id are required.' },
        { status: 400 }
      );
    }

    const result = await dbUpdatePost(parseInt(id, 10), postData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to update post.' },
      { status: 500 }
    );
  }
}
