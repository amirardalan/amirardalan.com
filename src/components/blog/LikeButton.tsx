'use client';

import { useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useLikesStore } from '@/src/store/likes';
import IconLike from '@/components/icons/IconLike';

interface LikeButtonProps {
  postId: number;
  children?: ReactNode;
  showIcon?: boolean;
}

// Added debounce time to prevent multiple fetches
const FETCH_DEBOUNCE_TIME = 30000; // 30 seconds

export default function LikeButton({
  postId,
  children,
  showIcon = true,
}: LikeButtonProps) {
  const { updateLike, fetchLikes, likes } = useLikesStore();
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lastFetch, setLastFetch] = useState(0);

  useEffect(() => {
    // Fetch likes only if we haven't fetched recently
    const now = Date.now();
    if (now - lastFetch > FETCH_DEBOUNCE_TIME) {
      fetchLikes(postId);
      setLastFetch(now);
    }
  }, [fetchLikes, postId, lastFetch]);

  // Check if post is liked from cookie
  useEffect(() => {
    const likedPosts = JSON.parse(Cookies.get('likedPosts') || '{}');
    setIsLiked(!!likedPosts[postId]);
  }, [postId]);

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    try {
      await updateLike(postId, !isLiked);

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

      // Reset the fetch timer so we don't immediately fetch again
      setLastFetch(Date.now());
    } catch (error) {
      console.error('Error updating post like status:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (children) {
    return (
      <button
        onClick={handleLike}
        disabled={isLiking}
        className="flex items-center gap-2 disabled:opacity-50"
        aria-label={isLiked ? 'Unlike post' : 'Like post'}
        title={isLiked ? 'Unlike post' : 'Like post'}
      >
        {showIcon && <IconLike active={isLiked} />}
        {children}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="self-start">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-1 rounded-full p-1"
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
          title={isLiked ? 'Unlike post' : 'Like post'}
        >
          <IconLike active={isLiked} />
        </button>
      </div>
    </div>
  );
}
