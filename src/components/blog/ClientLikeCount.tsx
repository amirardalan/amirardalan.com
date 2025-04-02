'use client';

import { useEffect } from 'react';
import { useLikesStore } from '@/src/store/likes';
import LikeCount from './LikeCount';

export default function ClientLikeCount({ postId }: { postId: number }) {
  const { likes, initialLoadingStates, error, fetchLikes } = useLikesStore();

  useEffect(() => {
    fetchLikes(postId);
  }, [fetchLikes, postId]);

  if (error[postId]) {
    return <div className="leading-none">Error loading likes.</div>;
  }

  const count = likes[postId] || 0;

  const isLoading = initialLoadingStates[postId] !== false;

  return <LikeCount count={count} isLoading={isLoading} />;
}
