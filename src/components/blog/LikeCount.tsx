import clsx from 'clsx';

export default function LikeCount({
  count,
  isLoading = false,
}: {
  count: number;
  isLoading?: boolean;
}) {
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

  // Dynamic loading skeleton widths
  const countWidthClass = clsx({
    'w-2': formattedCount.length <= 1,
    'w-3': formattedCount.length === 2,
    'w-4': formattedCount.length === 3,
    'w-5': formattedCount.length >= 4,
  });
  const textWidthClass = clsx({
    'w-5': likesText === 'Like',
    'w-6': likesText === 'Likes',
  });

  return (
    <div className="text-xs uppercase leading-none text-zinc-500 dark:text-zinc-400">
      {isLoading ? (
        <div className="flex items-center justify-start">
          <div
            className={clsx('h-3 animate-pulse rounded-md', countWidthClass)}
          ></div>
          <div
            className={clsx(
              'ml-1 h-3 animate-pulse rounded-md',
              textWidthClass
            )}
          ></div>
        </div>
      ) : (
        <>
          {formattedCount} {likesText}
        </>
      )}
    </div>
  );
}
