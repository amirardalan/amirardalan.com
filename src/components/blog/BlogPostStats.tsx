'use client';

import useSWR, { mutate } from 'swr';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetcher } from '@/utils/fetcher';
import IconLike from '@/components/icons/IconLike';

// Format number with K, M abbreviations
const formatLikesCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`;
  }
  return count.toString();
};

export default function BlogPostStats({
  postId,
}: {
  slug?: string;
  postId: number;
}) {
  const { data: stats, error } = useSWR(
    `/api/stats?postId=${postId}`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 600000, // 10 minutes
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
        `/api/stats?postId=${postId}`,
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
      mutate(`/api/stats?postId=${postId}`, {
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
    return <div>Error loading likes.</div>;
  }

  const likesCount = stats?.likes || 0;
  const formattedCount = formatLikesCount(likesCount);
  const likesText = likesCount === 1 ? 'Like' : 'Likes';

  return (
    <div className="flex flex-col items-start gap-3">
      {/* Like button component */}
      <div className="flex items-center">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-1 rounded-full p-1 transition-all hover:bg-zinc-100 disabled:opacity-50 dark:hover:bg-zinc-800"
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
          title={isLiked ? 'Unlike post' : 'Like post'}
        >
          <IconLike active={isLiked} />
        </button>
      </div>

      {/* Like count display - can be positioned elsewhere */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {formattedCount} {likesText}
      </div>
    </div>
  );
}
