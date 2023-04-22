import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useLikeCount = (id: number) => {
  const { data: likeCount, isValidating } = useSWR(
    `/api/likes/${id}`,
    fetcher,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      revalidateOnMount: true,
      dedupingInterval: 2000,
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
