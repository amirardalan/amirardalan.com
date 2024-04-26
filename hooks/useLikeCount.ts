import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/hooks/useDebounce';

const useLikeCount = (id: number) => {
  const debouncedId = useDebounce(id, 2000);

  const {
    data: likeCount,
    isValidating,
    isLoading,
  } = useSWR(`/api/likes/${debouncedId}`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: true,
    revalidateOnMount: false,
    dedupingInterval: 10000,
    errorRetryCount: 1,
    errorRetryInterval: 5000,
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
