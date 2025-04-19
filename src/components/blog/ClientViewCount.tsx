'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { formatCount } from '@/utils/format-count';

export default function ClientViewCount({ route }: { route: string }) {
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchViews() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/views?route=${encodeURIComponent(route)}`
        );
        const data = await res.json();
        setViews(data.views ?? 0);
      } catch {
        setViews(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchViews();
  }, [route]);

  const formattedViews = views !== null ? formatCount(views) : '—';
  const viewsText = 'Views';

  // Dynamic loading skeleton widths
  const countWidthClass = clsx({
    'w-2': isLoading,
    'w-3': formattedViews.length === 2 && !isLoading,
    'w-4': formattedViews.length === 3 && !isLoading,
    'w-5': formattedViews.length === 4 && !isLoading,
    'w-6': formattedViews.length >= 5 && !isLoading,
  });
  const textWidthClass = 'w-6';

  return (
    <span
      title="Views"
      className="leading-none text-zinc-500 dark:text-zinc-400"
    >
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
          {formattedViews} {viewsText}
        </>
      )}
    </span>
  );
}
