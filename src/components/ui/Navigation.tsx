'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navigation({ header = false }: { header?: boolean }) {
  const { isActive } = useActiveLink();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    return clsx({
      'border-b-2 pb-1': isActive(href),
      'border-light text-light': isActive(href) && !header,
      'border-dark text-dark': isActive(href) && header,
      'dark:border-dark dark:text-dark': isActive(href) && !header,
      'dark:border-light dark:text-light': isActive(href) && header,
      'text-light': !isActive(href) && !header,
      'text-dark': !isActive(href) && header,
      'dark:text-dark': !isActive(href) && !header,
      'dark:text-light': !isActive(href) && header,
      'mr-6': !isLast && !header,
      'mr-12': header,
      'text-xxs uppercase': header,
    });
  };

  return (
    <nav>
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
