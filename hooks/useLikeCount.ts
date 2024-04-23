import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const {
    data: likeCount,
    isValidating,
    isLoading,
  } = useSWR(`/api/likes/${id}`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    revalidateOnMount: false,
    dedupingInterval: 100000,
    revalidateOnReconnect: false,
    method: 'GET',
  });

  return {
    likeCount,
    isValidating,
    isLoading,
  };
};

export default useLikeCount;
