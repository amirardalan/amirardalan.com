import { auth } from '@/src/auth/auth';
import Link from 'next/link';

export default async function User() {
  const session = await auth();
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
