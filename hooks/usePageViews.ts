import { useEffect, useState } from 'react';
import Fetcher from '@/lib/fetcher';

const usePageviewsCount = () => {
  const [pageviewsCount, setPageviewsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getPageviewsCount() {
      try {
        const { pageviews } = await Fetcher('/api/pageviews');
        setPageviewsCount(pageviews);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    getPageviewsCount();
  }, []);

  return {
    pageviewsCount,
    isLoading,
  };
};

export default usePageviewsCount;
