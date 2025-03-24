'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navigation() {
  const pathname = usePathname();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    return clsx('text-zinc-400', {
      'text-zinc-600 dark:text-zinc-200':
        pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)),
      'mr-6': !isLast,
    });
  };

  return (
    <nav className={clsx('flex justify-end')}>
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
        <Link href="/account">
          <span className={getNavItemClass('/account')}>Account</span>
        </Link>
        <Link href="/admin">
          <span className={getNavItemClass('/admin')}>Admin</span>
        </Link>
      </div>
    </nav>
  );
}
