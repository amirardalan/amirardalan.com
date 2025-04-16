'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BlogPostAdminControls({ slug }: { slug: string }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch session info from an API route or use a client-side auth library
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) setIsAdmin(true);
      })
      .catch(() => {});
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="text-right">
      <Link
        href={`/admin/blog/edit/${slug}`}
        className="inline-block rounded bg-zinc-800 px-2 py-1 text-sm text-light dark:bg-zinc-50 dark:text-dark"
      >
        Edit Post
      </Link>
    </div>
  );
}
