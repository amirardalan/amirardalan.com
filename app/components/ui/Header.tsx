import { auth } from '@/auth';
import AuthMenu from '@/components/auth/AuthMenu';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import HeaderControls from '@/app/components/ui/HeaderControls';

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="min-w-40 font-mono text-xxs uppercase text-dark dark:text-light">
        {session ? (
          <>
            Welcome,&nbsp;
            <Link href="/account" className="text-primary">
              {session?.user?.name?.split(' ')[0]}
            </Link>
          </>
        ) : (
          'Welcome, Guest'
        )}
      </div>
      <Link href="/" className="mt-2">
        <Logo fontSize={'text-4xl'} logoText={'Amir Ardalan'} />
      </Link>
      <div className="flex">
        <HeaderControls />
        <AuthMenu />
      </div>
    </div>
  );
}
