'use client';

import { usePathname } from 'next/navigation';
import { useEditPostStore } from '@/store/edit';

export function useActiveLink() {
  const pathname = usePathname();
  const { currentPostPublished } = useEditPostStore();

  const isActive = (href: string) => {
    const currentPath = pathname ?? '/';

    // Special handling for edit pages
    if (
      currentPath.startsWith('/admin/blog/edit/') &&
      (href === '/admin/blog/published' || href === '/admin/blog/drafts')
    ) {
      // If we're on an edit page, highlight based on post status
      if (currentPostPublished !== null) {
        return (
          (currentPostPublished && href === '/admin/blog/published') ||
          (!currentPostPublished && href === '/admin/blog/drafts')
        );
      }
      // Default behavior if post status is not available
      return false;
    }

    if (href === '/') {
      return currentPath === '/';
    }

    if (currentPath === href) {
      return true;
    }

    if (currentPath.startsWith(`${href}/`)) {
      const remainingPath = currentPath.slice(href.length + 1);
      return !remainingPath.includes('/');
    }

    return false;
  };

  return { isActive };
}
