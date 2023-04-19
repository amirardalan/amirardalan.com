import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const usePageviews = () => {
  const { data: pageviews, error } = useSWR(
    '/api/analytics/pageviews',
    fetcher,
    {
      refreshInterval: 3600000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnMount: true,
      dedupingInterval: 0,
      revalidateOnReconnect: true,
      method: 'GET',
    }
  );

  return {
    pageviews,
    error,
  };
};

export default usePageviews;
