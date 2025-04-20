'use server';

import { getPublishedPostsCount, getDraftPostsCount } from '@/db/queries/posts';
import { auth } from '@/lib/auth';

// Interface for the return type
interface PostCounts {
  publishedCount: number;
  draftCount: number;
}

export async function getPostCounts(): Promise<PostCounts> {
  // Optional: Add auth check if needed, though counts might not be sensitive
  const session = await auth();
  if (!session?.user) {
    // You might want to handle this differently, e.g., return null or specific error codes
    throw new Error('Not authenticated');
  }

  try {
    // Fetch counts in parallel
    const [publishedCount, draftCount] = await Promise.all([
      getPublishedPostsCount(),
      getDraftPostsCount(),
    ]);
    return { publishedCount, draftCount };
  } catch (error) {
    console.error('Error fetching post counts via server action:', error);
    // Re-throw or return a specific error structure
    throw new Error('Failed to fetch post counts');
  }
}
