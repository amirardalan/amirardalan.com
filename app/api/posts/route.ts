import { NextResponse } from 'next/server';
import { createPost, updatePost } from '@/src/db/queries/posts';
import sanitizeHtml from 'sanitize-html';

interface PostData {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  published: boolean;
  user_id: number;
  show_updated?: boolean;
}

function sanitizePostData(data: Partial<PostData>): PostData {
  if (!data.user_id || typeof data.user_id !== 'number' || data.user_id <= 0) {
    throw new Error('A valid user_id is required.');
  }

  return {
    title: sanitizeHtml(data.title || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    slug: sanitizeHtml(data.slug || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    excerpt: sanitizeHtml(data.excerpt || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    content: sanitizeHtml(data.content || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    category: sanitizeHtml(data.category || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    published: data.published === true,
    user_id: data.user_id,
    show_updated: data.show_updated === true,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sanitizedData = sanitizePostData(body);

    if (!sanitizedData.title || !sanitizedData.slug || !sanitizedData.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required.' },
        { status: 400 }
      );
    }

    const postData = {
      ...sanitizedData,
      excerpt: sanitizedData.excerpt || null,
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
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required.' },
        { status: 400 }
      );
    }

    const sanitizedData = sanitizePostData(data);

    if (!sanitizedData.title || !sanitizedData.slug || !sanitizedData.content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required.' },
        { status: 400 }
      );
    }

    const result = await updatePost(parseInt(id, 10), sanitizedData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || 'Failed to update post.' },
      { status: 400 }
    );
  }
}
