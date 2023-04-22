import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

type PostViewCount = {
  viewCount: number;
  isLoading: boolean;
};

const usePostViewCount = (slug: string): PostViewCount => {
  const { data: viewCount, isLoading } = useSWR(
    `/api/analytics/postviews?slug=${slug}`,
    fetcher,
    {
      refreshInterval: 300000,
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      revalidateOnMount: false,
      dedupingInterval: 2000,
      revalidateOnReconnect: true,
      method: 'GET',
    }
  );

  return {
    isLoading,
    viewCount,
  };
};

export default usePostViewCount;
