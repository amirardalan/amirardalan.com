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
  const styleButton = css({
    margin: '0 1.5rem',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignSelf: 'left',
    '.xLogo': {
      fontSize: 13,
      color: 'var(--color-bg)',
      marginRight: 5,
    },
    '.button': {
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

      <div css={styleButton}>
        <button
          className="button"
          title="follow on x (twitter)"
          aria-label="follow on x (twitter)"
          onClick={() =>
            gtagEvent({
              action: 'click',
              category: 'external_link',
              label: `x.com/amirardalan`,
            })
          }
        >
          <span className="xLogo">𝕏</span>
          <a
            href="https://twitter.com/intent/follow?screen_name=amirardalan"
            target="_blank"
            rel="noopener noreferrer"
          >
            @amirardalan
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
