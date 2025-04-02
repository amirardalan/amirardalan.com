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
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    const likes = (await redis.get(`likes:post:${postId}`)) || 0;

    return NextResponse.json({ success: true, likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { postId, like } = await req.json();

    if (!postId) {
      return NextResponse.json(
        { error: 'postId is required' },
        { status: 400 }
      );
    }

    if (like !== false) {
      await redis.incr(`likes:post:${postId}`);
    } else {
      const currentLikes =
        ((await redis.get(`likes:post:${postId}`)) as number) || 0;
      if (currentLikes > 0) {
        await redis.decr(`likes:post:${postId}`);
      }
    }

    const likes = await redis.get(`likes:post:${postId}`);

    return NextResponse.json({ success: true, likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
