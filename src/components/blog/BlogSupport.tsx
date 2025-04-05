'use client';

import { useLikesStore } from '@/store/likes';
import LikeButton from '@/components/blog/LikeButton';
import LikeCount from '@/components/blog/LikeCount';
import ShareOnXButton from '@/components/blog/ShareOnXButton';
import Tooltip from '@/components/ui/Tooltip';

export default function BlogSupport({ postId }: { postId: number }) {
  const { likes, initialLoadingStates } = useLikesStore();
  const count = likes[postId] || 0;
  const isLoading = initialLoadingStates[postId] !== false;

  return (
    <div className="my-8 flex w-full items-center gap-2 rounded-xl border-[1px] border-zinc-300 p-8 dark:border-zinc-700">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Enjoy this post? Like and share!
          </p>
        </div>

        <div className="flex items-center">
          <div className="mr-6 flex w-24 items-center text-center">
            <Tooltip text="Like post" pos="l">
              <LikeButton postId={postId} showIcon={true}>
                <LikeCount count={count} isLoading={isLoading} />
              </LikeButton>
            </Tooltip>
          </div>
          <Tooltip text="Share on X" pos="l">
            <ShareOnXButton />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
