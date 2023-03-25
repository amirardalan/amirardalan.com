import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const { data: likeCount, error } = useSWR(`/api/likes/${id}`, fetcher, {
    refreshInterval: 1000,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnMount: true,
    dedupingInterval: 2000,
    revalidateOnReconnect: true,
    method: 'GET',
  });

  return {
    likeCount,
    error,
  };
};

export default useLikeCount;
