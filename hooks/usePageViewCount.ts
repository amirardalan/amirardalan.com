import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

type PageViewCount = {
  pageviews: number;
  error: any;
};

const usePageViewCount = (): PageViewCount => {
  const { data: pageviews, error } = useSWR(
    '/api/analytics/pageviews',
    fetcher,
    {
      refreshInterval: 3600000,
      revalidateOnFocus: true,
      shouldRetryOnError: true,
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

export default usePageViewCount;
