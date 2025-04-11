import { useState, useEffect, useCallback } from 'react';

type MediaQueryType = 'width' | 'height';

export const useMediaQuery = (size: number, type: MediaQueryType = 'width') => {
  const [targetReached, setTargetReached] = useState<boolean>(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(`(max-${type}: ${size}px)`);
      media.addEventListener('change', updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener('change', updateTarget);
    }

    return () => {};
  }, [updateTarget, size, type]);

  return targetReached;
};
