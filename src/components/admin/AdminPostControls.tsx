'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AdminPostControlsProps {
  slug: string;
  published: boolean;
}

export default function AdminPostControls({
  slug,
  published,
}: AdminPostControlsProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="flex w-full justify-between space-x-2">
      <Link
        href={`/admin/blog/edit/${slug}`}
        className="rounded bg-zinc-800 px-2 py-1 text-sm text-light dark:bg-zinc-50 dark:text-dark"
      >
        Edit Post
      </Link>
      {!published && (
        <Link
          href="/admin/blog/drafts"
          className="rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200"
          title="View all drafts"
        >
          Draft
        </Link>
      )}
    </div>
  );
}
