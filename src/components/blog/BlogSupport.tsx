'use client';

import { useLikesStore } from '@/src/store/likes';
import LikeButton from '@/components/blog/LikeButton';
import LikeCount from '@/components/blog/LikeCount';
import ShareOnXButton from '@/components/blog/ShareOnXButton';

export default function BlogSupport({ postId }: { postId: number }) {
  const { likes, initialLoadingStates } = useLikesStore();
  const count = likes[postId] || 0;
  const isLoading = initialLoadingStates[postId] !== false;

  return (
    <div className="my-8 flex w-full items-center gap-2 rounded-xl border-[1px] border-zinc-300 p-8 dark:border-zinc-700">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Enjoyed this? Like or share it:
          </p>
        </div>

        <div className="flex items-center">
          <div className="w-24 text-center">
            <LikeButton postId={postId} showIcon={true}>
              <LikeCount count={count} isLoading={isLoading} />
            </LikeButton>
          </div>
          <ShareOnXButton />
        </div>
      </div>
    </div>
  );
}
