'use client';

import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
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
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(Cookies.get('likedPosts') || '{}');
    setIsLiked(!!likedPosts[postId]);
  }, [postId]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      mutate(
        `/api/stats?pathname=/blog/${slug}&postId=${postId}`,
        {
          ...stats,
          likes: (stats?.likes || 0) + (isLiked ? -1 : 1),
        },
        false
      );

      const response = await fetch('/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, like: !isLiked }),
      });

      if (!response.ok) {
        throw new Error(
          isLiked ? 'Failed to unlike the post' : 'Failed to like the post'
        );
      }

      const { likes } = await response.json();

      // Update the SWR cache with the server response
      mutate(`/api/stats?pathname=/blog/${slug}&postId=${postId}`, {
        ...stats,
        likes,
      });

      // Update the likedPosts cookie
      const likedPosts = JSON.parse(Cookies.get('likedPosts') || '{}');
      if (!isLiked) {
        likedPosts[postId] = true;
      } else {
        delete likedPosts[postId];
      }
      Cookies.set('likedPosts', JSON.stringify(likedPosts));

      // Toggle the liked state
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating post like status:', error);
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
        {isLiking ? 'Processing...' : isLiked ? 'Unlike' : 'Like'}
      </button>
    </div>
  );
}
