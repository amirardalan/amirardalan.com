import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

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
