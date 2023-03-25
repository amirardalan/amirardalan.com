import { useState, useEffect, useCallback } from 'react';

// Usage: const isBreakpoint = useMediaQuery(890)
export const useMediaQuery = (width: Number) => {
  const [targetReached, setTargetReached] = useState(false);
  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener('change', (e) => updateTarget(e));

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e));
  }, [updateTarget, width]);

  return targetReached;
};
