import { FC, useState, useEffect, Key } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css, useTheme, Theme } from '@emotion/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import GitHubButton from 'react-github-btn';
import CloseButton from '@/components/CloseButton';
import Logo from '@/components/Logo';
import { nav } from '@/data/navigation';

const Navigation: FC = () => {
  const theme: Theme = useTheme();
  const router = useRouter();

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    position: 'absolute',
    height: '105vh',
    width: '75vw',
    padding: '3.5rem',
    background: 'var(--color-bg)',
    top: 0,
    right: 0,
    a: {
      content: '""',
      display: 'inline',
      borderBottom: '1px solid var(--color-accent-gray)',
      width: '100%',
      height: '100%',
    },
    '.closeArea': {
      opacity: '.80',
      height: '100%',
      width: 200,
      background: 'var(--color-gradient)',
      position: 'absolute',
      left: -200,
      top: 0,
    },
    '@media(min-width: 769px)': {
      display: 'none',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      width: '33vw',
      '.closeArea': {
        width: 500,
        left: -500,
      },
      alignItems: 'right',
    },
  });
  const styleMobileNavButton = css({
    display: 'none',
    '@media(max-width: 768px)': {
      display: 'flex',
    },
    zIndex: 1,
    marginLeft: '2rem',
    '.menuOpen': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 28,
      width: 28,
      textTransform: 'uppercase',
      textAlign: 'center',
      fontSize: 9,
      boxShadow: 'inset 0 0 0 1px var(--color-primary)',
      borderRadius: 20,
      '&:active': {
        background: 'var(--color-primary)',
        color: 'var(--color-bg)',
      },
    },
    '.menuClose': {
      display: 'flex',
      animation: 'spin 1s forwards',
    },
  });

  const styleNavIcon = css({
    height: 16,
    width: 16,
  });

  const styleNavitem = css({
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
          left: -10,
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

  const isMobile = useMediaQuery(768);
  const [scrollDisabled, setScrollDisabled] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
    handleDisableScroll();
  };

  const handleDisableScroll = () => {
    toggleMenu ? setScrollDisabled(true) : setScrollDisabled(false);
  };

  useEffect(() => {
    !isMobile ? setToggleMenu(false) : null;

    isMobile && toggleMenu
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'scroll');
  }, [isMobile, toggleMenu]);

  interface NavItem {
    path: string;
    cName: string;
    aria: string;
    icon: boolean;
    title: string;
  }

  const Navitem = () => (
    <nav css={styleNavitem}>
      {nav.map((item: NavItem, index: Key) => {
        const isActiveNav = router.asPath === item.path;
        const isBlog =
          router.asPath.includes('/blog/') && item.path === '/blog';

        return (
          <Link
            href={item.path}
            key={index}
            onClick={handleToggleMenu}
            className={
              isActiveNav || isBlog ? item.cName + ' active' : item.cName
            }
            aria-label={item.aria}
          >
            {item.icon ? <div css={styleNavIcon}></div> : item.title}
          </Link>
        );
      })}
      <div css={styleGhButton}>
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

  const NavMobileMenu = () => {
    if (toggleMenu) {
      return (
        <div css={styleMobileNavWrapper}>
          <Navitem />
          <div css={styleMobileNavSecondary}>
            <Logo />
          </div>
          <button className="closeArea" onClick={handleToggleMenu} />
        </div>
      );
    } else return null;
  };

  const NavMenuControl = () => {
    if (toggleMenu) {
      return (
        <div className="menuClose">
          <CloseButton width={28} height={28} />
        </div>
      );
    } else return <div className="menuOpen">•••</div>;
  };

  return (
    <>
      <div css={styleMainNav}>
        <Navitem />
      </div>
      <button
        css={styleMobileNavButton}
        onClick={handleToggleMenu}
        className={toggleMenu ? 'open' : ''}
        aria-label="Navigation Menu"
        aria-expanded={toggleMenu}
      >
        <NavMenuControl />
      </button>
      <NavMobileMenu />
    </>
  );
};

export default Navigation;
