import { FC, useState, Key, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { gtagEvent } from '@/lib/gtag';
import CloseIcon from '@/components/CloseIcon';
import MenuIcon from '@/components/MenuIcon';
import Logo from '@/components/Logo';
import { nav } from '@/data/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Navigation: FC = () => {
  const router = useRouter();

  const isMobile = useMediaQuery(768);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    if (isMobile && toggleMenu) {
      setToggleMenu(true);
      document.body.style.overflowY = 'hidden';
      document.addEventListener('touchmove', preventDefault, {
        passive: false,
      });
    } else {
      setToggleMenu(false);
      document.body.style.overflowY = 'scroll';
      document.removeEventListener('touchmove', preventDefault);
    }

    return () => {
      document.removeEventListener('touchmove', preventDefault);
    };
  }, [isMobile, toggleMenu]);

  const styleMainNav = css({
    display: 'flex',
    alignItems: 'center',
    marginRight: '2rem',
    fontSize: 14,
    a: {
      margin: '0 1.5rem',
      color: 'var(--color-heading)',
      '&:hover': {
        color: 'var(--color-primary)',
      },
    },
    '@media(max-width: 768px)': {
      display: 'none',
    },
  });

  const styleMobileNavWrapper = css({
    position: 'fixed',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    pointerEvents: toggleMenu ? 'auto' : 'none',
    '.mobileNavPanel': {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      right: 0,
      transform: toggleMenu ? 'translateX(0)' : 'translateX(100%)',
      zIndex: 2,
      width: '70%',
      height: '100dvh',
      padding: '3.5rem',
      background: 'var(--color-bg)',
      'a.link': {
        content: '""',
        borderBottom: '1px solid var(--color-accent)',
        width: '100%',
        height: '100%',
      },
      transition: 'transform 0.5s ease-in-out',
    },
    '.closeArea': {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100dvh',
      width: '100dvw',
      opacity: toggleMenu ? 0.8 : 0,
      background: 'var(--color-gradient)',
      transition: 'opacity 0.5s ease-in-out',
    },
    '@media(min-width: 769px)': {
      display: 'none',
    },
  });

  const styleMobileNavButton = css({
    display: 'flex',
    zIndex: 3,
    marginLeft: '2rem',
  });

  const styleNavItems = css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '&:after': {
      borderBottom: '1px solid var(--color-primary)',
      width: '100%',
      height: 1,
    },
    a: {
      position: 'relative',
      color: 'var(--color-heading)',
      '&.active': {
        '&::before': {
          color: 'var(--color-primary)',
          position: 'absolute',
          content: '">"',
          left: -12,
          '@media(max-width: 768px)': {
            left: -20,
          },
        },
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      lineHeight: '3.4rem',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      paddingRight: '1rem',
      lineHeight: '3rem',
    },
  });
  const styleMobileNavSecondary = css({
    marginTop: '3rem',
    position: 'relative',
    a: {
      display: 'block',
      marginBottom: '.5rem',
      color: 'var(--color-gray)',
      animation: 'slideUp .4s ease',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      display: 'none',
    },
  });
  const styleGhButton = css({
    margin: '0 1.5rem',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignSelf: 'left',
    '.githubButton': {
      borderBottom: 'none',
      width: 'fit-content',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'var(--color-heading)',
      padding: '.05rem .3rem',
      borderRadius: '4px',
      textDecoration: 'none',
      svg: {
        marginRight: '.25rem',
      },
      a: {
        borderBottom: 'none',
        color: 'var(--color-bg)',
        fontSize: 12,
        width: 'auto',
        margin: 0,
      },
      '@media(min-width: 1025px)': {
        '&:hover': {
          a: {
            color: 'var(--color-bg)',
          },
          backgroundColor: 'var(--color-primary)',
        },
      },
      '@media (max-width: 768px)': {
        marginTop: '1.5rem',
      },
    },
  });
  interface NavItem {
    path: string;
    cName: string;
    aria: string;
    icon: boolean;
    title: string;
  }

  const NavItems = () => (
    <nav css={styleNavItems}>
      {nav.map((item: NavItem, index: Key) => {
        const isHome = item.path === '/';
        const isActiveNav = router.asPath === item.path;
        const isDeepLink =
          router.asPath.startsWith(item.path) &&
          router.asPath.split('/').length > item.path.split('/').length &&
          !isHome;

        return (
          <Link
            href={item.path}
            key={index}
            onClick={handleToggleMenu}
            className={`link ${
              isActiveNav || isDeepLink ? item.cName + ' active' : item.cName
            }`}
            aria-label={item.aria}
          >
            {item.title}
          </Link>
        );
      })}

      <div css={styleGhButton}>
        <button
          className="githubButton"
          title="View source code on GitHub"
          aria-label="View source code on GitHub"
          onClick={() =>
            gtagEvent({
              action: 'click',
              category: 'external_link',
              label: `github.com/amirardalan/amirardalan.com`,
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--color-bg)"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <a
            href="https://github.com/amirardalan/amirardalan.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {!isMobile ? (
        <div css={styleMainNav}>
          <NavItems />
        </div>
      ) : (
        <>
          <button
            css={styleMobileNavButton}
            onClick={handleToggleMenu}
            aria-label="Navigation Menu"
            aria-expanded={toggleMenu}
          >
            {toggleMenu ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
          </button>
          <div css={styleMobileNavWrapper}>
            <button className="closeArea" onClick={handleToggleMenu} />
            <div className="mobileNavPanel">
              <NavItems />
              <div css={styleMobileNavSecondary}>
                <Logo animate={false} size={25} color="var(--color-heading)" />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
