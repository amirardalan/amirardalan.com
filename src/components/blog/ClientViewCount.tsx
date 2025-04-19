'use client';

import { useEffect, useState } from 'react';

export default function ClientViewCount({ route }: { route: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function fetchViews() {
      try {
        const res = await fetch(
          `/api/views?route=${encodeURIComponent(route)}`
        );
        const data = await res.json();
        setViews(data.views ?? 0);
      } catch {
        setViews(null);
      }
    }
    fetchViews();
  }, [route]);

  return (
    <span title="Views" className="text-zinc-500 dark:text-zinc-400">
      {views !== null ? views.toLocaleString() : '—'} Views
    </span>
  );
}
