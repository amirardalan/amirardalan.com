'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import { NavLinks } from '@/components/ui/Navigation';
import HeaderControls from '@/components/ui/HeaderControls';
import AuthMenu from '@/components/auth/AuthMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Header() {
  const isTablet = useMediaQuery(1024);

  return (
    <header
      className="animate-fade-in-top fixed top-0 z-30 w-full bg-zinc-50/70 px-6 py-4 backdrop-blur-lg lg:px-10 lg:py-8 dark:bg-zinc-950/70"
      role="banner"
    >
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
