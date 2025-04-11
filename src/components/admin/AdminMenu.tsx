'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

import IconBlogControls from '@/components/icons/IconBlogControls';
import IconAccount from '@/components/icons/IconAccount';

export default function AdminMenu() {
  const { isActive } = useActiveLink();

  const getLinkClass = (href: string) => {
    return clsx(
      !isActive(href) && 'text-zinc-400 dark:text-zinc-500',
      isActive(href) && 'text-zinc-800 dark:text-zinc-300'
    );
  };

  return (
    <nav className="leading-2 mt-24 flex items-center justify-between px-10 py-3 text-xs uppercase text-zinc-500 dark:text-zinc-400">
      <div className="flex flex-wrap space-x-4">
        <IconBlogControls />
        <Link href="/admin" className={getLinkClass('/admin')}>
          Dashboard
        </Link>
        <Link
          href="/admin/blog/new"
          className={getLinkClass('/admin/blog/new')}
        >
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
      </div>
      <div className="flex flex-wrap space-x-4">
        <IconAccount />
        <Link href="/admin/account" className={getLinkClass('/admin/account')}>
          Account
        </Link>
        <Link
          href="/api/auth/signout?callbackUrl=/&redirect=false"
          className="text-zinc-400 dark:text-zinc-500"
        >
          Sign Out
        </Link>
      </div>
    </nav>
  );
}
