import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { path, slug, tag, token } = await req.json();

    // Validate revalidation token for security
    const revalidateToken = process.env.REVALIDATION_TOKEN;
    if (!revalidateToken || token !== revalidateToken) {
      return NextResponse.json(
        { message: 'Invalid revalidation token' },
        { status: 401 }
      );
    }

    console.log('Revalidation request:', { path, slug, tag });

    const revalidated = [];

    if (path) {
      // Revalidate the specified path
      await revalidatePath(path);
      revalidated.push(`path: ${path}`);
    }

    if (slug) {
      // Revalidate a specific blog post page
      await revalidatePath(`/blog/${slug}`);
      revalidated.push(`slug: /blog/${slug}`);
    }

    if (tag) {
      // Revalidate content by tag
      await revalidateTag(tag);
      revalidated.push(`tag: ${tag}`);
    }

    console.log('Revalidation successful:', revalidated.join(', '));
    return NextResponse.json({
      revalidated: true,
      items: revalidated,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return NextResponse.json(
      { message: 'Error revalidating', error: (err as Error).message },
      { status: 500 }
    );
  }
}
