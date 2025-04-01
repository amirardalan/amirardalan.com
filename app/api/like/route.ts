import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { revalidatePath } from 'next/cache';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const redis = new Redis({
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

    // Increment the likes counter in Redis
    const newLikes = await redis.incr(`likes:post:${postId}`);

    // Trigger on-demand revalidation for the stats endpoint
    await revalidatePath(`/api/stats?postId=${postId}`);
    console.log(`[Revalidation] Path revalidated: /api/stats?postId=${postId}`);

    return NextResponse.json({ success: true, likes: newLikes });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
