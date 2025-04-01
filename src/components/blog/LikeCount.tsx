export default function LikeCount({ count }: { count: number }) {
  const formatLikesCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(count >= 10000000 ? 0 : 1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`;
    }
    return count.toString();
  };

  const formattedCount = formatLikesCount(count);
  const likesText = count === 1 ? 'Like' : 'Likes';

  return (
    <div className="text-xs uppercase leading-none text-zinc-500 dark:text-zinc-400">
      {formattedCount} {likesText}
    </div>
  );
}
