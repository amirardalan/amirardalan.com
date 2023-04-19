import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

type PostViewCount = {
  postviews: number;
  error: any;
};

const usePostViewCount = (slug: string): PostViewCount => {
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

export default usePostViewCount;
