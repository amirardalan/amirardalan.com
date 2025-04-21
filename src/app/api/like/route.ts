import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import devCache from '@/utils/dev-cache';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const isDev = process.env.NODE_ENV === 'development';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function shouldEnableCache(req: NextRequest): boolean {
  if (!isDev) return false;

  const { searchParams } = new URL(req.url);
  if (searchParams.get('enableCache') === 'true') {
    return true;
  }

  if (process.env.ENABLE_DEV_CACHE === 'true') {
    return true;
  }

  return false;
}

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

    // Configure cache based on parameters
    if (isDev) {
      devCache.setUseCache(shouldEnableCache(req));
    }

    const cacheKey = `likes:post:${postId}`;

    // Use in-memory cache in development mode
    if (isDev && devCache.has(cacheKey)) {
      const cachedLikes = devCache.get(cacheKey);
      return NextResponse.json({ success: true, likes: cachedLikes });
    }

    // Fallback to Redis
    const likes = (await redis.get(cacheKey)) || 0;

    // Cache the result in development mode
    if (isDev && devCache.isEnabled()) {
      devCache.set(cacheKey, likes, CACHE_TTL);
    }

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

    // Configure cache based on parameters
    if (isDev) {
      devCache.setUseCache(shouldEnableCache(req));
    }

    const cacheKey = `likes:post:${postId}`;

    let currentLikes;
    let likes;

    // In development mode, we can update the cache and avoid Redis if possible
    if (isDev) {
      // Get current likes from cache or Redis
      currentLikes = devCache.has(cacheKey)
        ? devCache.get(cacheKey)
        : ((await redis.get(cacheKey)) as number) || 0;

      // Update likes count
      likes = like !== false ? currentLikes + 1 : Math.max(0, currentLikes - 1);

      // Update the in-memory cache first if enabled
      if (devCache.isEnabled()) {
        devCache.set(cacheKey, likes, CACHE_TTL);
      }

      // In development, we can still update Redis to keep consistency with production
      if (like !== false) {
        await redis.incr(cacheKey);
      } else if (currentLikes > 0) {
        await redis.decr(cacheKey);
      }
    } else {
      // Production path - direct Redis updates
      if (like !== false) {
        await redis.incr(cacheKey);
      } else {
        currentLikes = ((await redis.get(cacheKey)) as number) || 0;
        if (currentLikes > 0) {
          await redis.decr(cacheKey);
        }
      }

      likes = await redis.get(cacheKey);
    }

    return NextResponse.json({ success: true, likes });
  } catch (error) {
    console.error('Error updating likes:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
