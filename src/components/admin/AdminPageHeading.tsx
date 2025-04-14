'use client';

import Link from 'next/link';
import User from '@/components/admin/User';
import { usePathname } from 'next/navigation';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  const pathname = usePathname();
  const isAdminDashboard = pathname === '/admin';
  return (
    <div className="flex pb-4 text-md text-dark text-zinc-500 dark:text-zinc-400">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {isAdminDashboard ? (
            <p>Admin</p>
          ) : (
            <Link href="/admin" className="text-dynamic text-primary">
              Admin
            </Link>
          )}
          <span className="text-zinc-500 dark:text-zinc-400">/</span>
          <h1>{title}</h1>
        </div>
        <User />
      </div>
    </div>
  );
}
