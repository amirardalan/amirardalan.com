import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/utils/redis-client';

const redis = getRedisClient();

export async function POST(req: NextRequest) {
  try {
    const { pathname } = await req.json();

    await redis.incr(`pageviews:${pathname}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking pageview in Redis:', error);
    return NextResponse.json(
      { error: 'Failed to track pageview' },
      { status: 500 }
    );
  }
}
