'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface UseUnsavedChangesProps {
  hasUnsavedChanges: boolean;
  onDiscard: () => void;
}

export function useUnsavedChanges({
  hasUnsavedChanges,
  onDiscard,
}: UseUnsavedChangesProps) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const beforeUnloadHandlerRef = useRef<((e: BeforeUnloadEvent) => any) | null>(
    null
  );

  // Handle browser back/forward/refresh
  useEffect(() => {
    beforeUnloadHandlerRef.current = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return 'You have unsaved changes. Are you sure you want to leave?';
    };

    const cleanupBeforeUnloadListener = () => {
      if (beforeUnloadHandlerRef.current) {
        window.removeEventListener(
          'beforeunload',
          beforeUnloadHandlerRef.current
        );
      }
    };

    if (hasUnsavedChanges) {
      window.addEventListener('beforeunload', beforeUnloadHandlerRef.current);

      const handlePopState = (e: PopStateEvent) => {
        window.history.pushState(null, '', pathname);

        setPendingNavigation('back');
        setShowModal(true);
      };

      window.history.pushState(null, '', pathname);
      window.addEventListener('popstate', handlePopState);

      return () => {
        cleanupBeforeUnloadListener();
        window.removeEventListener('popstate', handlePopState);
      };
    } else {
      cleanupBeforeUnloadListener();
    }
  }, [hasUnsavedChanges, pathname]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      let linkElement: HTMLAnchorElement | null = null;

      while (target && !linkElement) {
        if (target.tagName === 'A') {
          linkElement = target as HTMLAnchorElement;
        }
        target = target.parentElement as HTMLElement;
        if (!target) break;
      }

      if (
        linkElement &&
        linkElement.href &&
        !linkElement.href.startsWith('javascript:') &&
        !linkElement.href.includes('#') &&
        !linkElement.target &&
        linkElement.getAttribute('download') === null &&
        new URL(linkElement.href).origin === window.location.origin
      ) {
        if (hasUnsavedChanges) {
          e.preventDefault();
          e.stopPropagation();

          setPendingNavigation(linkElement.href);
          setShowModal(true);
          return false;
        }
      }
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [hasUnsavedChanges]);

  const handleConfirmNavigation = useCallback(() => {
    if (beforeUnloadHandlerRef.current) {
      window.removeEventListener(
        'beforeunload',
        beforeUnloadHandlerRef.current
      );
      beforeUnloadHandlerRef.current = null;
    }

    onDiscard();
    setShowModal(false);

    setTimeout(() => {
      if (pendingNavigation === 'back') {
        window.history.go(-2);
      } else if (pendingNavigation) {
        window.location.href = pendingNavigation;
      } else {
        window.history.back();
      }
    }, 10);
  }, [pendingNavigation, onDiscard]);

  const handleCancelNavigation = useCallback(() => {
    setShowModal(false);
    setPendingNavigation(null);
  }, []);

  return {
    showUnsavedChangesModal: showModal,
    handleConfirmNavigation,
    handleCancelNavigation,
  };
}
