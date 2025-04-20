import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import {
  getPublishedPostsCount,
  getDraftPostsCount,
  getPostTitleSlugById,
} from '@/db/queries/posts';
import { getCachedMostViewedPost } from '@/services/views'; // Import the new cached function
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error('Upstash Redis environment variables are missing.');
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// Helper function to find the most liked post from Redis
async function findMostLikedPost(
  redis: Redis
): Promise<{ title: string; slug: string; likes: number } | null> {
  try {
    let cursor = 0;
    let maxLikes = -1;
    let mostLikedPostId: number | null = null;

    do {
      const [nextCursor, keys] = await redis.scan(cursor, {
        match: 'likes:post:*',
        count: 100, // Adjust count as needed
      });
      cursor = parseInt(nextCursor, 10);

      if (keys.length > 0) {
        const values = await redis.mget<number[]>(...keys);
        keys.forEach((key, index) => {
          const currentLikes = values[index] ?? 0;
          if (currentLikes > maxLikes) {
            maxLikes = currentLikes;
            const postIdStr = key.split(':').pop();
            if (postIdStr) {
              mostLikedPostId = parseInt(postIdStr, 10);
            }
          }
        });
      }
    } while (cursor !== 0);

    if (mostLikedPostId !== null && maxLikes > 0) {
      const postDetails = await getPostTitleSlugById(mostLikedPostId);
      if (postDetails) {
        return { ...postDetails, likes: maxLikes };
      }
    }
    return null;
  } catch (redisError) {
    console.error('Error in findMostLikedPost:', redisError);
    return null; // Don't fail the whole request
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  try {
    // Fetch counts and stats in parallel
    const [
      publishedCount,
      draftCount,
      mostLikedPost,
      mostViewedPost, // Use the cached function
    ] = await Promise.all([
      getPublishedPostsCount(),
      getDraftPostsCount(),
      findMostLikedPost(redis),
      getCachedMostViewedPost(), // Fetch most viewed post data
    ]);

    const totalCount = publishedCount + draftCount;

    return NextResponse.json({
      publishedCount,
      draftCount,
      totalCount,
      mostLikedPost,
      mostViewedPost, // Include the fetched data
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog stats' },
      { status: 500 }
    );
  }
}
