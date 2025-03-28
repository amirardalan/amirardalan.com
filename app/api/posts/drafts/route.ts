// This file can be removed since we're now using the posts service directly
// in the drafts page component. The code below is just for reference:

import { NextResponse } from 'next/server';
import { getDraftPosts } from '@/services/posts';

export async function GET() {
  try {
    const drafts = await getDraftPosts();
    return NextResponse.json(drafts);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
