import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const usePostviews = (slug: string) => {
  const { data: postviews, error } = useSWR(
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
    postviews,
    error,
  };
};

export default usePostviews;
