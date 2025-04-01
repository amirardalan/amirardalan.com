import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  try {
    // Only get likes data - no page view tracking
    const likes = postId
      ? (await redis.get(`likes:post:${postId}`)) || 0
      : null;

    return NextResponse.json({ likes });
  } catch (error) {
    console.error('Error fetching likes from Redis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    );
  }
}
