'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatCount } from '@/utils/format-count'; // Import formatCount

interface PostStatInfo {
  title: string;
  slug: string;
  likes?: number;
  views?: number;
}

interface BlogStats {
  publishedCount: number;
  draftCount: number;
  totalCount: number;
  mostLikedPost: PostStatInfo | null;
  mostViewedPost: PostStatInfo | null; // Add this
}

export default function AdminStats() {
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data: BlogStats = await response.json();
        setStats(data);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mb-4">
      <div className="rounded-lg border border-zinc-200 p-6 text-dark dark:border-zinc-700 dark:text-light">
        <h3 className="mb-3 text-lg font-medium">Blog Stats</h3>
        {loading && <p className="text-sm text-zinc-500">Loading stats...</p>}
        {error && (
          <p className="text-sm text-red-500">Error loading stats: {error}</p>
        )}
        {stats && !loading && !error && (
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            {/* Published Count */}
            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-600">
              <p className="text-zinc-500 dark:text-zinc-400">Published</p>
              <p className="text-2xl font-semibold">
                <Link href="/admin/blog/published" className="hover:underline">
                  {stats.publishedCount}
                </Link>
              </p>
            </div>
            {/* Draft Count */}
            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-600">
              <p className="text-zinc-500 dark:text-zinc-400">Drafts</p>
              <p className="text-2xl font-semibold">
                <Link href="/admin/blog/drafts" className="hover:underline">
                  {stats.draftCount}
                </Link>
              </p>
            </div>
            {/* Total Count */}
            <div className="rounded border border-zinc-200 p-3 dark:border-zinc-600">
              <p className="text-zinc-500 dark:text-zinc-400">Total Posts</p>
              <p className="text-2xl font-semibold">{stats.totalCount}</p>
            </div>

            {/* Most Liked Post */}
            <div className="rounded border border-zinc-200 p-3 md:col-span-1 dark:border-zinc-600">
              <p className="mb-1 text-zinc-500 dark:text-zinc-400">
                Most Liked
              </p>
              {stats.mostLikedPost ? (
                <div>
                  <Link
                    href={`/blog/${stats.mostLikedPost.slug}`}
                    className="font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {stats.mostLikedPost.title}
                  </Link>
                  <p className="text-lg font-semibold text-primary">
                    {formatCount(stats.mostLikedPost.likes ?? 0)}{' '}
                    <span className="text-xs uppercase">
                      Like{stats.mostLikedPost.likes !== 1 ? 's' : ''}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-500">N/A</p>
              )}
            </div>

            {/* Most Viewed Post (Placeholder) */}
            <div className="rounded border border-zinc-200 p-3 md:col-span-2 dark:border-zinc-600">
              <p className="mb-1 text-zinc-500 dark:text-zinc-400">
                Most Viewed
              </p>
              {stats.mostViewedPost ? (
                <div>
                  <Link
                    href={`/blog/${stats.mostViewedPost.slug}`}
                    className="font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {stats.mostViewedPost.title}
                  </Link>
                  <p className="text-lg font-semibold text-primary">
                    {formatCount(stats.mostViewedPost.views ?? 0)}{' '}
                    <span className="text-xs uppercase">
                      View{stats.mostViewedPost.views !== 1 ? 's' : ''}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-zinc-400 dark:text-zinc-500">
                  [Coming Soon]
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
