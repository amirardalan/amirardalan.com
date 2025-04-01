'use client';

import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import LikeCount from './LikeCount';

export default function ClientLikeCount({ postId }: { postId: number }) {
  const { data: stats, error } = useSWR(
    `/api/stats?postId=${postId}`,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 600000,
    }
  );

  if (error) {
    return <div className="leading-none">Error loading likes.</div>;
  }

  return <LikeCount count={stats?.likes || 0} />;
}
