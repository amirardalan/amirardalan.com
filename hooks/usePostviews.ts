import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const usePostviewsCount = (slug: string) => {
  const { data: postviewsCount, error } = useSWR(
    `/api/analytics/postviews?slug=${slug}`,
    fetcher,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnMount: true,
      dedupingInterval: 0,
      revalidateOnReconnect: true,
      method: 'GET',
    }
  );

  return {
    postviewsCount,
    error,
  };
};

export default usePostviewsCount;
