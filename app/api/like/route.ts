import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const kv = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { postId } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    await kv.incr(`likes:post:${postId}`);
    const likes = await kv.get(`likes:post:${postId}`);

    return NextResponse.json({ success: true, likes });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
