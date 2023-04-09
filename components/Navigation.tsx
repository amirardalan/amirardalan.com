import { FC, useState, Key, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css, useTheme, Theme } from '@emotion/react';
import { gtagEvent } from '@/lib/gtag';
import GitHubButton from 'react-github-btn';
import CloseIcon from '@/components/CloseIcon';
import MenuIcon from '@/components/MenuIcon';
import Logo from '@/components/Logo';
import { nav } from '@/data/navigation';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Navigation: FC = () => {
  const theme: Theme = useTheme();
  const router = useRouter();

  const isMobile = useMediaQuery(768);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    !isMobile ? setToggleMenu(false) : null;

    isMobile && toggleMenu
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'scroll');
  }, [isMobile, toggleMenu]);

  const handleCloseMenu = () => {};

  const styleMainNav = css({
    display: 'flex',
    alignItems: 'center',
    marginRight: '2rem',
    fontSize: 14,
    a: {
      margin: '0 1.5rem',
      color: 'var(--color-heading)',
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
      height: '100vh',
      padding: '3.5rem',
      background: 'var(--color-bg)',
      a: {
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
      height: '100vh',
      width: '100vw',
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

  const styleNavIcon = css({
    height: 16,
    width: 16,
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
    fontFamily: 'var(--font-secondary)',
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
    margin: '.25rem 2rem 0 1.8rem',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignSelf: 'left',
    '@media (max-width: 768px)': {
      marginTop: '.65rem',
      marginLeft: '2rem',
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
        const isActiveNav = router.asPath === item.path;
        const isBlog =
          router.asPath.includes('/blog/') && item.path === '/blog';

        return (
          <Link
            href={item.path}
            key={index}
            onClick={handleCloseMenu}
            className={
              isActiveNav || isBlog ? item.cName + ' active' : item.cName
            }
            aria-label={item.aria}
          >
            {item.icon ? <div css={styleNavIcon}></div> : item.title}
          </Link>
        );
      })}
      <div
        css={styleGhButton}
        onClick={() =>
          gtagEvent({
            action: 'click',
            category: 'external_link',
            label: `github.com/amirardalan/amirardalan.com`,
          })
        }
      >
        <GitHubButton
          href="https://github.com/amirardalan/amirardalan.com"
          data-color-scheme={theme.gh}
          aria-label="View amirardalan.com on GitHub"
        >
          GitHub
        </GitHubButton>
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
                <Logo animate={false} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;
