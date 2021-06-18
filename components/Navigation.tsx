import { css, useTheme } from '@emotion/react'
import { useState } from 'react'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import { nav } from '@/data/navigation'
import Image from 'next/image'

export default function Navigation() {
  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'
  
  const styleMainNav = css({
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.5rem',
    a: {
      margin: '0 1.5rem',
      color: 'var(--color-text)',
    },
    '@media(max-width: 768px)': {
      display: 'none',
    }
  })
  const styleMobileNavWrapper = css ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '105vh',
    width: '100vw',
    background: 'var(--color-bg)',
    top: 0,
    left: 0,
    '@media(min-width: 769px)': {
      display: 'none',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      paddingLeft: '2rem',
    }
  })
  const styleMobileNavButton = css({
    alignItems: 'center',
    marginLeft: 30,
    zIndex: 6,
    width: 36,
    height: 22,
    background: 'transparent',
    border: 'none',
    transform: 'rotate(0deg)',
    cursor: 'pointer',
    span: {
      display: 'block',
      position: 'absolute',
      height: 2,
      width: '100%',
      background: 'var(--color-text)',
      opacity: 1,
      left: 0,
      transform: 'rotate(0deg)',
      transition: '.25s ease-in-out',
      '&:nth-of-type(1)': { top: 0, },
      '&:nth-of-type(2)': { top: 10, },
      '&:nth-of-type(3)': { top: 10, },
      '&:nth-of-type(4)': { top: 20, }
    },
    '&.open': {
      'span:nth-of-type(1)': {
        top: 10,
        width: 0,
        left: '50%',
      },
      'span:nth-of-type(2)': {
        transform: 'rotate(45deg)',
      },
      'span:nth-of-type(3)': {
        transform: 'rotate(-45deg)',
      },
      'span:nth-of-type(4)': {
        top: 14,
        width: '0%',
        left: '50%',
      },
    },
    '@media(min-width: 769px)': {
      display: 'none',
    },
  })
  const styleNavItems = css({
    position: 'relative',
    display: 'flex',
    a: {
      position: 'relative',
      color: 'var(--color-text)',
      '&.active': {
        '&::before': {
          color: 'var(--color-accent-color)',
          position: 'absolute',
          content: '">"',
          left: -10,
        }
      },
      '.navIcon': {
        height: 20,
        width: 20,
        lineHeight: 0,
        '@media(max-width: 768px)': {
          marginTop: '.6rem',
          height: 45,
          width: 45,
        }
      },
      '@media (max-width: 768px)': {
        '&.active': {
          '&::before': {
            position: 'absolute',
            content: '">"',
            left: -30,
          },
        },
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 'calc(3vw + 3vh)',
      WebkitMarqueeIncrement: '0vw',
      lineHeight: '4rem',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      paddingRight: '2.5rem',
      alignItems: 'flex-end',
      lineHeight: '3rem',
      'a.spotifyNav': {
        marginTop: '.5rem',
      }
    },
  })
  const styleMobileNavSecondary = css({
    margin: '3rem 0',
    fontSize: 12,
    height: 80,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-secondary)',
    position: 'relative',
    textAlign: 'center',
    paddingTop: '1rem',
    animation: 'slideUp .5s',
    a: {
      display: 'block',
      marginBottom: '.5rem',
      color: 'var(--color-gray)',
      textAlign: 'center',
      animation: 'slideUp .8s ease',
    },
  })

  // Mobile Menu
  const [toggleDisableScrolling, setToggleDisableScrolling] = useState(false)
  const disableScroll = () => {
    setToggleDisableScrolling(!toggleDisableScrolling)
    toggleDisableScrolling ? document.body.style.overflow = 'scroll' : document.body.style.overflow = 'hidden'
  }
  const [toggleMobileNav, setToggleMobileNav] = useState(false)
  const toggleMenu = () => {
    setToggleMobileNav(!toggleMobileNav),
    disableScroll()
  }
  const MobileMenu = () => (
    <div css={styleMobileNavWrapper}>
      <NavItems />
      <div css={styleMobileNavSecondary}>
        <Logo />
      </div>
    </div>
  )

  // Generate Nav Items
  const NavItems = () => (
    <nav css={styleNavItems}>
      {nav.map((items: any, index: number) => {
        return (
          <Link href={items.path} activeClassName="active" exact={items.exact} as="" key={index}>
            <a onClick={toggleMobileNav ? toggleMenu : null} className={items.cName} aria-label={items.aria}>
              {items.icon
                ?
                  <div className="navIcon">
                    <Image
                      src={isDarkTheme
                        ? items.icon.dark
                        : items.icon.light}
                      height="100%"
                      width="100%"
                      alt={items.title}
                    />
                  </div>
                : items.title}
            </a>
          </Link>
        )}
      )}
    </nav>
  )

  // Render the Nav
  return (
    <>
      <div css={styleMainNav}>
        <NavItems />
      </div>
      <button
        css={styleMobileNavButton}
        onClick={toggleMenu}
        className={toggleMobileNav ? 'open' : 'closed'}
        aria-label="Navigation Menu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
      { toggleMobileNav ? <MobileMenu /> : null }
    </>
  )
}