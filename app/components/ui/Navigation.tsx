'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navigation() {
  const { isActive } = useActiveLink();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    return clsx({
      'text-zinc-950 dark:text-zinc-50': isActive(href),
      'mr-6': !isLast,
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
          <span className={getNavItemClass('/uses')}>Uses</span>
        </Link>
      </div>
    </nav>
  );
}
