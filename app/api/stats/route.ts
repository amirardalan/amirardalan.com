import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { getPublishedPostsCount, getDraftPostsCount } from '@/db/queries/posts';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    // Or return an error response if preferred
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  try {
    // Fetch counts from the database
    const publishedCount = await getPublishedPostsCount();
    const draftCount = await getDraftPostsCount();
    const totalCount = publishedCount + draftCount;

    // Potentially fetch most liked/viewed post info here in the future

    return NextResponse.json({
      publishedCount,
      draftCount,
      totalCount,
      // likes: postId ? (await redis.get(`likes:post:${postId}`)) || 0 : null, // Keep or remove based on future needs
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog stats' },
      { status: 500 }
    );
  }
}
