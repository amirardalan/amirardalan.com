'use client';

import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { fetcher } from '@/utils/fetcher';

export default function BlogPostStats({
  slug,
  postId,
}: {
  slug: string;
  postId: number;
}) {
  const { data: stats, error } = useSWR(
    `/api/stats?pathname=/blog/${slug}&postId=${postId}`,
    fetcher,
    {
      refreshInterval: process.env.NODE_ENV === 'development' ? 60000 : 10000, // 1 minute in dev, 10 seconds in prod
    }
  );

  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      // Optimistically update the UI
      mutate(
        `/api/stats?pathname=/blog/${slug}&postId=${postId}`,
        { ...stats, likes: (stats?.likes || 0) + 1 },
        false // Do not revalidate immediately
      );

      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId }),
      });

      if (!response.ok) {
        throw new Error('Failed to like the post');
      }

      const { likes } = await response.json();

      // Update the SWR cache with the server response
      mutate(`/api/stats?pathname=/blog/${slug}&postId=${postId}`, {
        ...stats,
        likes,
      });
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (error) {
    return <div>Error loading stats.</div>;
  }

  return (
    <div>
      Views: {stats?.pageviews || 0} | Likes: {stats?.likes || 0}
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="ml-4 rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isLiking ? 'Liking...' : 'Like'}
      </button>
    </div>
  );
}
