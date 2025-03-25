import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('x-revalidate-token');
    const { tag } = await request.json();

    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (!tag) {
      return NextResponse.json(
        { message: 'Tag is required for revalidation' },
        { status: 400 }
      );
    }

    // Revalidate the specified tag
    revalidateTag(tag);

    return NextResponse.json({ revalidated: true, tag }, { status: 200 });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: (error as Error).message },
      { status: 500 }
    );
  }
}
