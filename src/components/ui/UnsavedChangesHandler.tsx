'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Modal from '@/components/ui/Modal';

interface UnsavedChangesHandlerProps {
  hasUnsavedChanges: boolean;
  onDiscard: () => void;
}

export default function UnsavedChangesHandler({
  hasUnsavedChanges,
  onDiscard,
}: UnsavedChangesHandlerProps) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(
    null
  );
  const beforeUnloadHandlerRef = useRef<((e: BeforeUnloadEvent) => any) | null>(
    null
  );

  // Handle browser back/forward buttons and page refresh
  useEffect(() => {
    // Store the handler in a ref so we can remove the same function reference later
    beforeUnloadHandlerRef.current = (e: BeforeUnloadEvent) => {
      // Modern approach - just preventDefault is sufficient for modern browsers
      e.preventDefault();
      // For older browsers that still require returnValue (IE/Edge)
      return 'You have unsaved changes. Are you sure you want to leave?';
    };

    // Function to add and remove the beforeunload listener
    const cleanupBeforeUnloadListener = () => {
      if (beforeUnloadHandlerRef.current) {
        window.removeEventListener(
          'beforeunload',
          beforeUnloadHandlerRef.current
        );
      }
    };

    // Only add listener if there are unsaved changes
    if (hasUnsavedChanges) {
      window.addEventListener('beforeunload', beforeUnloadHandlerRef.current);

      // Handle back button for browser navigation
      const handlePopState = (e: PopStateEvent) => {
        // Prevent navigation and show modal
        window.history.pushState(null, '', pathname);

        // Store that we're trying to go back
        setPendingNavigation('back');
        setShowModal(true);
      };

      // Push a state to catch back button
      window.history.pushState(null, '', pathname);
      window.addEventListener('popstate', handlePopState);

      return () => {
        // Clean up all event listeners
        cleanupBeforeUnloadListener();
        window.removeEventListener('popstate', handlePopState);
      };
    } else {
      // If no unsaved changes, ensure handler is removed
      cleanupBeforeUnloadListener();
    }
  }, [hasUnsavedChanges, pathname]);

  // Handle Link clicks by intercepting all click events
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleClick = (e: MouseEvent) => {
      // Find if the click was on a Next.js Link or anchor tag
      let target = e.target as HTMLElement;
      let linkElement: HTMLAnchorElement | null = null;

      // Traverse up to find closest anchor element
      while (target && !linkElement) {
        if (target.tagName === 'A') {
          linkElement = target as HTMLAnchorElement;
        }
        target = target.parentElement as HTMLElement;
        if (!target) break;
      }

      // If this is a Link/anchor and it's not an external link or anchor
      if (
        linkElement &&
        linkElement.href &&
        !linkElement.href.startsWith('javascript:') &&
        !linkElement.href.includes('#') &&
        !linkElement.target &&
        linkElement.getAttribute('download') === null &&
        new URL(linkElement.href).origin === window.location.origin
      ) {
        // Check if we have unsaved changes
        if (hasUnsavedChanges) {
          e.preventDefault();
          e.stopPropagation();

          // Store the URL we're trying to navigate to
          setPendingNavigation(linkElement.href);
          setShowModal(true);
          return false;
        }
      }
    };

    // Capture clicks during the capture phase to intercept before React's event handlers
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [hasUnsavedChanges]);

  const handleConfirmNavigation = useCallback(() => {
    // First, completely remove the beforeunload handler
    if (beforeUnloadHandlerRef.current) {
      window.removeEventListener(
        'beforeunload',
        beforeUnloadHandlerRef.current
      );
      beforeUnloadHandlerRef.current = null;
    }

    // Mark changes as handled
    onDiscard();
    setShowModal(false);

    // Use a short timeout to ensure the beforeunload event handler is fully removed
    setTimeout(() => {
      if (pendingNavigation === 'back') {
        // For back navigation, we need to go back twice:
        // Once to get to the state we pushed to prevent navigation
        // And once more to actually go back to the previous page
        window.history.go(-2);
      } else if (pendingNavigation) {
        // For link navigation, go to the target URL
        window.location.href = pendingNavigation;
      } else {
        // Fallback
        window.history.back();
      }
    }, 10);
  }, [pendingNavigation, onDiscard]);

  const handleCancelNavigation = useCallback(() => {
    setShowModal(false);
    setPendingNavigation(null);
  }, []);

  return (
    <Modal
      isOpen={showModal}
      title="Unsaved Changes"
      message="You have unsaved changes. Are you sure you want to leave this page?"
      onCancel={handleCancelNavigation}
      onConfirm={handleConfirmNavigation}
      confirmText="Leave Page"
    />
  );
}
