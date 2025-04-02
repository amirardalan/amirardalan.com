'use client';

import { useLikesStore } from '@/src/store/likes';
import LikeButton from '@/components/blog/LikeButton';
import LikeCount from '@/components/blog/LikeCount';

export default function BlogSupport({ postId }: { postId: number }) {
  const { likes, initialLoadingStates } = useLikesStore();
  const count = likes[postId] || 0;
  const isLoading = initialLoadingStates[postId] !== false;

  return (
    <div className="my-8 flex w-full items-center gap-2 rounded-xl border-[1px] border-zinc-300 p-8 dark:border-zinc-700">
      <div className="flex flex-row items-center">
        <p className="ml-2 text-lg text-zinc-500 dark:text-zinc-400">
          Did you enjoy this post?
        </p>
        <div className="ml-4 flex items-center">
          <LikeButton postId={postId} />
          <div className="ml-2">
            <LikeCount count={count} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
