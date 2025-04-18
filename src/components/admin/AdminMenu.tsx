'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';
import Container from '@/components/content/Container';

export default function AdminMenu() {
  const { isActive } = useActiveLink();

  const getLinkClass = (href: string) => {
    return clsx(
      !isActive(href) && 'text-zinc-400 dark:text-zinc-500',
      isActive(href) && 'text-zinc-800 dark:text-zinc-300'
    );
  };

  return (
    <Container>
      <nav className="mt-24 flex justify-between">
        <div className="flex flex-wrap space-x-4">
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
          <Link
            href="/admin/blog/categories"
            className={getLinkClass('/admin/blog/categories')}
          >
            Categories
          </Link>
        </div>
        <div className="flex flex-wrap space-x-4">
          <Link
            href="/admin/account"
            className={getLinkClass('/admin/account')}
          >
            Account
          </Link>
        </div>
      </nav>
    </Container>
  );
}
