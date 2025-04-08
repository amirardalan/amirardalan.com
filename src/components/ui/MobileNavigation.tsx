'use client';

import { useState, useEffect } from 'react';
import { NavLinks } from '@/components/ui/Navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import IconMobileNav from '@/components/icons/IconMobileNav';

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(768); // 768px is Tailwind's md breakpoint

  // Close menu when pressing escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Close menu when screen size exceeds mobile breakpoint
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <IconMobileNav isOpen={false} onClick={() => setIsOpen(true)} />

      {/* Mobile Navigation Panel */}
      <div
        className={`fixed inset-0 z-[100] cursor-pointer bg-black bg-opacity-30 backdrop-blur-sm transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-[101] flex h-[100dvh] w-[300px] transform flex-col bg-light bg-opacity-90 p-6 shadow-lg backdrop-blur-md transition-transform duration-300 ease-in-out dark:bg-dark dark:bg-opacity-90 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-lg font-medium">Menu</h2>
          <IconMobileNav
            isOpen={true}
            onClick={() => setIsOpen(false)}
            className="static p-2"
          />
        </div>

        <nav className="flex flex-1 flex-col">
          <div className="flex flex-col space-y-6">
            <NavLinks variant="mobile" onClick={() => setIsOpen(false)} />
          </div>
        </nav>
      </div>
    </>
  );
}
