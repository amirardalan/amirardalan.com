'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useLikesStore } from '@/src/store/likes';
import IconLike from '@/components/icons/IconLike';

export default function LikeButton({
  postId,
}: {
  postId: number;
  slug?: string;
}) {
  const { updateLike, fetchLikes } = useLikesStore();
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchLikes(postId);
  }, [fetchLikes, postId]);

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
    } catch (error) {
      console.error('Error updating post like status:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="self-start">
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
    </div>
  );
}
