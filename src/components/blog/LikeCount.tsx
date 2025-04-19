import clsx from 'clsx';
import { formatCount } from '@/utils/format-count';

interface LikeCountProps {
  count: number;
  isLoading?: boolean;
}

export default function LikeCount({
  count,
  isLoading = false,
}: LikeCountProps) {
  const formattedCount = formatCount(count);
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
    <div className="leading-none text-zinc-500 dark:text-zinc-400">
      {isLoading ? (
        <div className="flex items-center justify-start">
          <div
            className={clsx(
              'h-3 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700',
              countWidthClass
            )}
          ></div>
          <div
            className={clsx(
              'ml-1 h-3 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700',
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
