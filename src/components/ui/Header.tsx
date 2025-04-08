import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { NavLinks } from '@/components/ui/Navigation';
import HeaderControls from '@/components/ui/HeaderControls';

export default async function Header() {
  return (
    <header
      className="animate-fade-in-top fixed top-0 z-50 w-full bg-zinc-50/70 backdrop-blur-lg lg:py-4 dark:bg-zinc-950/70"
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-light"
      >
        Skip to main content
      </a>

      <div className="flex w-full flex-row justify-between px-6 py-4 lg:px-10">
        <Link href="/" aria-label="Home">
          <Logo size={35} title="amir.sh" />
        </Link>
        <div className="flex w-full max-w-screen-xl items-center justify-end space-x-4">
          <nav aria-label="Main navigation" className="hidden md:block">
            <div className="flex flex-row">
              <NavLinks variant="header" />
            </div>
          </nav>
          <HeaderControls />
        </div>
      </div>
    </header>
  );
}
