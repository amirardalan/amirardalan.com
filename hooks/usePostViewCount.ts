import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

type PostViewCount = {
  postviews: number;
  isValidating: boolean;
};

const usePostViewCount = (slug: string): PostViewCount => {
  const { data: postviews, isValidating } = useSWR(
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
    isValidating,
    postviews,
  };
};

export default usePostViewCount;
