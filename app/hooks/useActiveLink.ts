'use client';

import { usePathname } from 'next/navigation';

export function useActiveLink() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const currentPath = pathname ?? '/';

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
