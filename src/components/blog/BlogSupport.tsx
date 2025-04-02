import LikeButton from '@/components/blog/LikeButton';

export default function BlogSupport({ postId }: { postId: number }) {
  return (
    <div className="my-8 flex w-full items-center gap-2 rounded-xl border-[1px] border-zinc-300 p-8 dark:border-zinc-700">
      <div className="flex flex-row items-center">
        <LikeButton postId={postId} />
        <p className="ml-2 text-lg text-zinc-500 dark:text-zinc-400">
          Did you enjoy this post?
        </p>
      </div>
    </div>
  );
}
