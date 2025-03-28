'use client';

import { usePathname } from 'next/navigation';

export function useActiveLink() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    const currentPath = pathname ?? '/';
    return (
      currentPath === href ||
      (href !== '/' && currentPath.startsWith(`${href}/`))
    );
  };

  return { isActive };
}
