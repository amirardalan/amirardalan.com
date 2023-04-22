import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const {
    data: likeCount,
    isValidating,
    isLoading,
  } = useSWR(`/api/likes/${id}`, fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: true,
    revalidateOnMount: true,
    dedupingInterval: 2000,
    revalidateOnReconnect: true,
    method: 'GET',
  });

  return {
    likeCount,
    isValidating,
    isLoading,
  };
};

export default useLikeCount;
