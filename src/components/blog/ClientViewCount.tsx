'use client';

import { useEffect } from 'react';
import { useViewsStore } from '@/store/views';
import clsx from 'clsx';
import { formatCount } from '@/utils/format-count';

interface ClientViewCountProps {
  route: string;
  textColor: string;
}

export default function ClientViewCount({
  route,
  textColor,
}: ClientViewCountProps) {
  const { views, initialLoadingStates, error, fetchViews } = useViewsStore();

  useEffect(() => {
    fetchViews(route);
  }, [fetchViews, route]);

  const routeError = error[route];
  const isLoading = initialLoadingStates[route] ?? true;
  const currentViews = views[route];

  if (routeError) {
    return <span className={`leading-none ${textColor}`}>— Views</span>;
  }

  const formattedViews =
    currentViews !== undefined ? formatCount(currentViews) : '—';

  return (
    <span title="Views" className={`leading-none ${textColor}`}>
      {isLoading ? (
        <span title="Loading views..." className={`leading-none ${textColor}`}>
          <div className="flex items-center justify-start">
            <div
              className={clsx(
                'h-3 w-4 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700'
              )}
            ></div>
            <div
              className={clsx(
                'ml-1 h-3 w-6 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-700'
              )}
            ></div>
          </div>
        </span>
      ) : (
        <>{formattedViews} views</>
      )}
    </span>
  );
}
