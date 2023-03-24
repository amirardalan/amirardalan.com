import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

type TotalLikes = {
  totalLikesCount: number;
  error: any;
};

const useTotalLikes = (): TotalLikes => {
  const { data: totalLikesCount, error } = useSWR(
    '/api/total-likes/',
    fetcher,
    {
      refreshInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnMount: true,
      dedupingInterval: 2000,
      revalidateOnReconnect: true,
      method: 'GET',
    }
  );

  return {
    totalLikesCount,
    error,
  };
};

export default useTotalLikes;
