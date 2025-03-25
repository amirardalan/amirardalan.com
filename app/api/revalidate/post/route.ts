import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-revalidate-token');
    const { slug } = await request.json();

    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (!slug) {
      // Revalidate the blog index page
      revalidateTag('blog-index');
      return NextResponse.json(
        { revalidated: true, message: 'Revalidated blog index' },
        { status: 200 }
      );
    }

    // Revalidate the specific blog post and the blog index
    revalidateTag(`post-${slug}`);
    revalidateTag('blog-index');

    return NextResponse.json(
      { revalidated: true, tags: [`post-${slug}`, 'blog-index'] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during post revalidation:', error);
    return NextResponse.json(
      { message: 'Error revalidating post', error: (error as Error).message },
      { status: 500 }
    );
  }
}
