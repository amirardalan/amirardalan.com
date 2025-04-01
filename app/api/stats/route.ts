import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get('pathname') || '/';
  const postId = searchParams.get('postId');

  try {
    const pageviews = (await kv.get(`pageviews:${pathname}`)) || 0;
    const likes = postId ? (await kv.get(`likes:post:${postId}`)) || 0 : null;

    return NextResponse.json({ pathname, pageviews, likes });
  } catch (error) {
    console.error('Error fetching stats from Redis:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
