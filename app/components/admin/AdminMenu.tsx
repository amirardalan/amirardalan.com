'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function AdminMenu() {
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive =
      pathname === href || (href !== '/admin' && pathname.startsWith(href));

    return clsx(
      'hover:underline',
      isActive && 'underline text-zinc-800 dark:text-zinc-300'
    );
  };

  return (
    <nav className="flex flex-wrap space-x-4 rounded-lg bg-zinc-200 p-4 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
      <Link href="/admin" className={getLinkClass('/admin')}>
        Dashboard
      </Link>
      <Link href="/admin/blog/new" className={getLinkClass('/admin/blog/new')}>
        New Post
      </Link>
      <Link
        href="/admin/blog/drafts"
        className={getLinkClass('/admin/blog/drafts')}
      >
        Drafts
      </Link>
      <Link
        href="/admin/blog/published"
        className={getLinkClass('/admin/blog/published')}
      >
        Published
      </Link>
      <span>|</span>
      <Link href="/admin/account" className={getLinkClass('/admin/account')}>
        Account
      </Link>
      <Link
        href="/api/auth/signout?callbackUrl=/&redirect=false"
        className={getLinkClass('/api/auth/signout')}
      >
        Sign Out
      </Link>
    </nav>
  );
}
