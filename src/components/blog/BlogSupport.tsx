'use client';

import { useLikesStore } from '@/src/store/likes';
import LikeButton from '@/components/blog/LikeButton';
import LikeCount from '@/components/blog/LikeCount';
import IconX from '@/components/icons/IconX';

function ShareOnXButton() {
  const handleShare = () => {
    const url = window.location.href;
    const shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="ml-6 flex items-center text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
    >
      <IconX size={20} />
      <span className="ml-3 text-xs uppercase">Share on X</span>
    </button>
  );
}

export default function BlogSupport({ postId }: { postId: number }) {
  const { likes, initialLoadingStates } = useLikesStore();
  const count = likes[postId] || 0;
  const isLoading = initialLoadingStates[postId] !== false;

  return (
    <div className="my-8 flex w-full items-center gap-2 rounded-xl border-[1px] border-zinc-300 p-8 dark:border-zinc-700">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Enjoyed this? Like or share it!
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
