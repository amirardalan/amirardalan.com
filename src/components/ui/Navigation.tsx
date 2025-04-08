'use client';

import { useActiveLink } from '@/hooks/useActiveLink';
import Link from 'next/link';
import clsx from 'clsx';

type NavVariant = 'header' | 'footer' | 'mobile';

export default function Navigation({ header = false }: { header?: boolean }) {
  return (
    <nav className="hidden text-light sm:flex sm:items-center">
      <div className={clsx('flex flex-row items-center')}>
        <NavLinks variant={header ? 'header' : 'footer'} />
      </div>
    </nav>
  );
}

const getNavLinkStyles = (
  variant: NavVariant,
  isActive: boolean,
  isLast?: boolean
) => {
  // Variant-specific styles
  const variantStyles = {
    header: clsx({
      'mr-12 text-xxs uppercase': true,
      'text-dark dark:text-light': !isActive,
      'border-none text-primary': isActive,
    }),
    footer: clsx({
      'mr-6': !isLast,
      'text-light dark:text-dark': !isActive,
      'pb-1 border-b-2 border-light text-light dark:border-dark dark:text-dark':
        isActive,
    }),
    mobile: clsx({
      'block w-full text-md font-medium mt-8': true,
      'text-dark dark:text-light': !isActive,
      'text-primary border-none': isActive,
    }),
  };

  return `${variantStyles[variant]}`;
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
