import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the secret token from the request
    const token = request.headers.get('x-revalidate-token');
    const { path = '/' } = await request.json();

    // Check if the token is valid
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Revalidate the specific path
    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path }, { status: 200 });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: (error as Error).message },
      { status: 500 }
    );
  }
}
