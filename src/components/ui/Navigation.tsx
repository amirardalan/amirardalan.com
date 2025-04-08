'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navigation({ header = false }: { header?: boolean }) {
  const { isActive } = useActiveLink();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    return clsx({
      // Header & Footer
      'border-b-2 pb-1': isActive(href),
      // Header only
      'mr-12 text-xxs uppercase': header,
      'text-dark dark:text-light mr-12 text-xxs uppercase':
        !isActive(href) && header,
      'border-dark text-dark dark:border-light dark:text-light':
        isActive(href) && header,
      // Footer only
      'text-light dark:text-dark': !isActive(href) && !header,
      'border-light text-light dark:border-dark dark:text-dark':
        isActive(href) && !header,
      'mr-6': !isLast && !header,
    });
  };

  return (
    <nav className="text-light">
      <div className={clsx('flex flex-row')}>
        <Link href="/">
          <span className={getNavItemClass('/')}>Home</span>
        </Link>
        <Link href="/blog">
          <span className={getNavItemClass('/blog')}>Blog</span>
        </Link>
        <Link href="/about">
          <span className={getNavItemClass('/about')}>About</span>
        </Link>
        <Link href="/uses">
          <span className={getNavItemClass('/uses', true)}>Uses</span>
        </Link>
      </div>
    </nav>
  );
}
