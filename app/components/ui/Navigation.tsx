'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navigation() {
  const pathname = usePathname();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    const currentPath = pathname ?? '/';
    return clsx({
      'text-zinc-950 dark:text-zinc-50':
        currentPath === href ||
        (href !== '/' && currentPath.startsWith(`${href}/`)),
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
