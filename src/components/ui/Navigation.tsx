'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

type NavVariant = 'header' | 'footer' | 'mobile';

export default function Navigation({ header = false }: { header?: boolean }) {
  const { isActive } = useActiveLink();

  const getNavItemClass = (href: string, isLast?: boolean) => {
    return clsx({
      // Header & Footer
      'border-b-2 pb-1': isActive(href),
      // Header only
      'mr-12 text-xxs uppercase': header,
      'text-dark dark:text-light mr-12 text-xxs uppercase':
        !isActive(href) && header,
      'border-dark text-dark dark:border-light dark:text-light':
        isActive(href) && header,
      // Footer only
      'text-light dark:text-dark': !isActive(href) && !header,
      'border-light text-light dark:border-dark dark:text-dark':
        isActive(href) && !header,
      'mr-6': !isLast && !header,
    });
  };

  return (
    <nav className="hidden text-light sm:block">
      <div className={clsx('flex flex-row')}>
        <Link href="/">
          <span className={getNavItemClass('/')}>Home</span>
        </Link>
        <Link href="/blog">
          <span className={getNavItemClass('/blog')}>Blog</span>
        </Link>
        <Link href="/about">
          <span className={getNavItemClass('/about')}>About</span>
        </Link>
        <Link href="/uses">
          <span className={getNavItemClass('/uses', true)}>Uses</span>
        </Link>
      </div>
    </nav>
  );
}

const getNavLinkStyles = (
  variant: NavVariant,
  isActive: boolean,
  isLast?: boolean
) => {
  // Base styles that apply to all variants
  const baseStyles = clsx({
    'border-b-2 pb-1': isActive,
  });

  // Variant-specific styles
  const variantStyles = {
    header: clsx({
      'mr-12 text-xxs uppercase': true,
      'text-dark dark:text-light': !isActive,
      'border-dark text-dark dark:border-light dark:text-light': isActive,
    }),
    footer: clsx({
      'mr-6': !isLast,
      'text-light dark:text-dark': !isActive,
      'border-light text-light dark:border-dark dark:text-dark': isActive,
    }),
    mobile: clsx({
      'block w-full py-3 text-lg font-medium': true,
      'text-dark dark:text-light': !isActive,
      'border-dark text-dark dark:border-light dark:text-light': isActive,
    }),
  };

  return `${baseStyles} ${variantStyles[variant]}`;
};

export const NavLinks = ({
  variant = 'header',
  onClick = () => {},
}: {
  variant?: NavVariant;
  onClick?: () => void;
}) => {
  const { isActive } = useActiveLink();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/uses', label: 'Uses' },
  ];

  return (
    <>
      {links.map((link, index) => (
        <Link key={link.href} href={link.href} onClick={onClick}>
          <span
            className={getNavLinkStyles(
              variant,
              isActive(link.href),
              index === links.length - 1
            )}
          >
            {link.label}
          </span>
        </Link>
      ))}
    </>
  );
};
