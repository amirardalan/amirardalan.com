import { FC } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { css } from '@emotion/react';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import { appTitle } from '@/data/content';

const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false,
});
const BlogAdmin = dynamic(() => import('@/components/BlogAdmin'), {
  ssr: true,
});

type HeaderProps = {
  toggleTheme: () => void;
};

const Header: FC<HeaderProps> = ({ toggleTheme }) => {
  const styleToggleSkeleton = css({
    display: 'flex',
    alignItems: 'center',
    minHeight: 26,
    minWidth: 34,
  });
  const styleHeaderWrapper = css({
    padding: '2rem 4rem 0',
    position: 'sticky',
    top: '-2rem',
    backgroundColor: 'var(--color-bg-opaque)',
    backdropFilter: 'blur(10px)',
    zIndex: 5,
    '.excludeInHeader': {
      display: 'none',
    },
    '@media(max-width: 1024px)': {
      padding: '0 2.5rem',
      top: 0,
    },
    '@media(max-width: 600px)': {
      padding: '0 2rem',
    },
  });
  const styleHeader = css({
    '@keyframes fadein': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    paddingBottom: '1rem',
    paddingTop: '1rem',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    a: { textDecoration: 'none' },
    '.headerRight': {
      display: 'flex',
      width: 'fit-content',
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 0,
      animation: 'fadein 1s forwards',
      '@media (max-width: 768px)': {
        flexDirection: 'row-reverse',
        minWidth: 'unset',
      },
    },
  });
  const styleLogoButton = css({
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    fontFamily: 'var(--font-secondary)',
    cursor: 'pointer',
  });

  return (
    <>
      <BlogAdmin />
      <header css={styleHeaderWrapper}>
        <div css={styleHeader}>
          <Link href="/" aria-label={`${appTitle} Logo`} passHref>
            <button css={styleLogoButton}>
              <Logo animate={true} size={25} color="var(--color-heading)" />
            </button>
          </Link>
          <div className="headerRight">
            <Navigation />
            <div css={styleToggleSkeleton}>
              <ThemeToggle toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
