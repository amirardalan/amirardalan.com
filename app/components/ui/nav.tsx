'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export default function Navigation() {
  const pathname = usePathname();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    return clsx('text-gray-400', {
      'text-primary dark:text-primary': pathname === href,
      'mr-6': !isLast,
    });
  };

  return (
    <nav className={clsx('flex justify-end')}>
      <div className={clsx('flex flex-row')}>
        <Link href="/">
          <span className={getNavItemClass('/')}>Home</span>
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
      </div>
    </nav>
  );
}
