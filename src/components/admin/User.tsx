'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Link from 'next/link';

export default function User() {
  const { session } = useAuth();

  return (
    <>
      {session && (
        <div className="min-w-40 text-right text-xs uppercase text-dark dark:text-light">
          <span className="mr-1">Welcome,</span>
          <Link href="/admin/account" className="text-primary">
            {session?.user?.name?.split(' ')[0]}
          </Link>
        </div>
      )}
    </>
  );
}
