import { auth } from '@/auth';
import Link from 'next/link';

export default async function User() {
  const session = await auth();
  return (
    <>
      {session && (
        <div className="mb-6 min-w-40 font-mono text-xs uppercase text-dark dark:text-light">
          Welcome,&nbsp;
          <Link href="/admin/account" className="text-primary">
            {session?.user?.name?.split(' ')[0]}
          </Link>
        </div>
      )}
    </>
  );
}
