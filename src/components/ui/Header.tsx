'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import { NavLinks } from '@/components/ui/Navigation';
import HeaderControls from '@/components/ui/HeaderControls';
import AuthMenu from '@/components/auth/AuthMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Header() {
  const isTablet = useMediaQuery(1024);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const headerBaseClasses =
    'animate-fade-in-top fixed top-0 z-30 w-full px-6 py-4 lg:px-10 lg:py-8';
  const headerBgClasses = isHomePage
    ? 'bg-transparent dark:bg-transparent'
    : 'bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-lg';

  return (
    <header className={`${headerBaseClasses} ${headerBgClasses}`} role="banner">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-light"
      >
        Skip to main content
      </a>

      <div className="flex w-full flex-row items-center justify-between">
        <Link href="/" aria-label="Home">
          <Logo size={isTablet ? 25 : 35} title="amir.sh" />
        </Link>
        <div className="flex w-full max-w-screen-xl items-center justify-end space-x-4">
          <nav
            aria-label="Main navigation"
            className="hidden md:flex md:items-center"
          >
            <div className="flex flex-row items-center">
              <NavLinks variant="header" />
            </div>
          </nav>
          <HeaderControls />
          <div className="hidden md:flex md:items-center">
            <AuthMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
