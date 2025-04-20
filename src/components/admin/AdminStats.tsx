'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPostCounts } from '@/services/stats';

interface BlogCountStats {
  publishedCount: number;
  draftCount: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<BlogCountStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPostCounts();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const totalCount = stats ? stats.publishedCount + stats.draftCount : 0;

  return (
    <div className="mb-4">
      <div className="rounded-lg border border-zinc-200 p-6 text-dark dark:border-zinc-700 dark:text-light">
        <h3 className="mb-3 text-lg font-medium">Blog Stats</h3>
        {loading && (
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div className="mb-2 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700"></div>
                <div className="h-8 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700"></div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <p className="text-sm text-red-500">Error loading stats: {error}</p>
        )}

        {stats && !loading && !error && (
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-600">
              <p className="text-zinc-500 dark:text-zinc-400">Published</p>
              <p className="text-2xl font-semibold">
                <Link href="/admin/blog/published" className="hover:underline">
                  {stats.publishedCount}
                </Link>
              </p>
            </div>

            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-600">
              <p className="text-zinc-500 dark:text-zinc-400">Drafts</p>
              <p className="text-2xl font-semibold">
                <Link href="/admin/blog/drafts" className="hover:underline">
                  {stats.draftCount}
                </Link>
              </p>
            </div>

            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-600">
              <p className="text-zinc-500 dark:text-zinc-400">Total Posts</p>
              <p className="text-2xl font-semibold">{totalCount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
