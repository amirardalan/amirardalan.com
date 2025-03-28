import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const { path, slug } = await req.json();

  console.log('Revalidation request:', { path, slug });

  try {
    if (path) {
      // Revalidate the blog listing page
      await revalidatePath(path);
    }

    if (slug) {
      // Revalidate a specific blog post page
      await revalidatePath(`/blog/${slug}`);
    }
    console.log('Revalidation successful:', { path, slug });
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 }
    );
  }
}
