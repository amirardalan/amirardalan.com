import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import Navigation from '@/components/ui/Navigation';
import AuthMenu from '@/components/auth/AuthMenu';
import HeaderControls from '@/components/ui/HeaderControls';

export default async function Header() {
  return (
    <div className="fixed top-0 z-50 flex w-full flex-row justify-between bg-zinc-50/10 px-6 py-4 backdrop-blur-lg lg:px-10 lg:py-8 dark:bg-zinc-950/10">
      <Link href="/">
        <Logo size={35} />
      </Link>
      <div className="flex w-full max-w-screen-xl items-center justify-end space-x-4">
        <Navigation header />
        <HeaderControls />
        <AuthMenu />
      </div>
    </div>
  );
}
