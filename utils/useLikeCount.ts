import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const { data: likeCount, error } = useSWR(`/api/like/${id}`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnMount: true,
    dedupingInterval: 10000,
    revalidateOnReconnect: true,
    method: 'GET',
  });

  return {
    likeCount,
    error,
  };
};

export default useLikeCount;
