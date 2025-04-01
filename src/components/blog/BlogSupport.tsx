import LikeButton from '@/components/blog/LikeButton';

export default function BlogSupport({ postId }: { postId: number }) {
  return (
    <div className="my-8 flex w-full items-center gap-2 rounded-xl border-2 border-zinc-500 p-8 dark:border-zinc-700">
      <LikeButton postId={postId} />
    </div>
  );
}
