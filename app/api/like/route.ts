import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/utils/redis-client';

const redis = getRedisClient();

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
