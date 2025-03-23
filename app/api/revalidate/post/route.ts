import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from the request
    const token = request.headers.get('x-revalidate-token');
    const { slug } = await request.json();

    // Check if the token is valid
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (!slug) {
      // Revalidate the entire blog section if no slug is provided
      revalidatePath('/blog');
      return NextResponse.json(
        { revalidated: true, message: 'Revalidated all blog posts' },
        { status: 200 }
      );
    }

    // Revalidate the specific blog post
    revalidatePath(`/blog/${slug}`);

    // Also revalidate the blog index page to update the listing
    revalidatePath('/blog');

    return NextResponse.json(
      { revalidated: true, path: `/blog/${slug}` },
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
