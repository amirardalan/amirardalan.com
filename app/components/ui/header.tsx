import { auth } from '@/auth';
import ThemeMenu from '@/components/theme/theme-menu';
import AuthMenu from '@/components/auth/menu';
import Logo from '@/components/ui/logo';
import Link from 'next/link';
import HeaderExternalLinks from '@/components/ui/header-external-links';

export default async function Header() {
  const session = await auth();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="min-w-40 font-mono text-xxs uppercase text-dark dark:text-light">
        {session ? (
          <>
            Welcome,&nbsp;
            <Link href="/account">{session?.user?.name?.split(' ')[0]}</Link>
          </>
        ) : (
          'Welcome, Guest'
        )}
      </div>
      <Logo />
      <div className="flex min-w-40 justify-end">
        <HeaderExternalLinks />
        <div className="mr-6 mt-1 flex items-center align-middle">
          <ThemeMenu />
        </div>
        <div>
          <AuthMenu />
        </div>
      </div>
    </div>
  );
}
