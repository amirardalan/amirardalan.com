import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/utils/redis-client';

const redis = getRedisClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get('pathname') || '/';
  const postId = searchParams.get('postId');

  try {
    const pageviews = (await redis.get(`pageviews:${pathname}`)) || 0;
    const likes = postId
      ? (await redis.get(`likes:post:${postId}`)) || 0
      : null;

    return NextResponse.json({ pathname, pageviews, likes });
  } catch (error) {
    console.error('Error fetching stats from Redis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
