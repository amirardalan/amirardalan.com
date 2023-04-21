import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const { data: likeCount, isValidating } = useSWR(
    `/api/likes/${id}`,
    fetcher,
    {
      refreshInterval: 10000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnMount: true,
      dedupingInterval: 0,
      revalidateOnReconnect: true,
      method: 'GET',
    }
  );

  return {
    likeCount,
    isValidating,
  };
};

export default useLikeCount;
