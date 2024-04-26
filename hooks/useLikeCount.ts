import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const {
    data: likeCount,
    isValidating,
    isLoading,
  } = useSWR(`/api/likes/${id}`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnMount: false,
    dedupingInterval: 10000,
    errorRetryCount: 0,
    errorRetryInterval: 20000,
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
