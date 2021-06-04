import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Link from './Link'
import SocialLinks from './SocialLinks'
import Logo from './Logo'


export default function Navigation() {

  const theme : any = useTheme()
  const styleMainNav = css({
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.5rem',
    a: {
      margin: '0 1.5rem',
      color: theme.colors.text,
      '&:hover': {
        color: theme.colors.grayscale,
      }
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
    height: '102vh',
    width: '100vw',
    background: theme.colors.background,
    top: '-2rem',
    left: '-6%',
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
    width: 41,
    height: 22,
    background: 'transparent',
    border: 'none',
    transform: 'rotate(0deg)',
    transition: '.5s ease-in-out',
    cursor: 'pointer',
    span: {
      display: 'block',
      position: 'absolute',
      height: 2,
      width: '100%',
      background: theme.colors.text,
      opacity: 1,
      left: 0,
      transform: 'rotate(0deg)',
      transition: '.25s ease-in-out',
      '&:nth-of-type(1)': {
        top: 0,
      },
      '&:nth-of-type(2)': {
        top: 10,
      },
      '&:nth-of-type(3)': {
        top: 10,
      },
      '&:nth-of-type(4)': {
        top: 20,
      }
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
      color: theme.colors.text,
      '&.active': {
        '&::before': {
          position: 'absolute',
          content: '">"',
          left: -10,
        }
      },
      '@media (max-width: 768px)': {
        '&.active': {
          '&::before': {
            position: 'absolute',
            content: '">"',
            left: -30,
          },
          '&:hover': {
            '&::before': {
              position: 'absolute',
              content: '">"',
              left: -30,
            }
          }
        },
        '&:hover': {
          '&::before': {
            position: 'absolute',
            content: '" "',
            left: -30,
          }
        },
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 'calc(3vw + 3vh)',
      lineHeight: '4rem',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      paddingRight: '2.5rem',
      alignItems: 'flex-end',
    },
  })
  const styleMobileNavSecondary = css({
    margin: '3rem 0',
    fontSize: 12,
    a: {
      display: 'block',
      marginBottom: '.5rem',
      textAlign: 'center',
      animation: 'slideUp .8s ease',
    },
    ul: {
      position: 'relative',
      textAlign: 'center',
      paddingTop: '1rem',
      animation: 'slideUp .5s',
      li: {
        height: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        animation: 'slideUp 1s forwards',
        fontFamily: theme.fonts.secondary,
      }
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
      <ShowNavItems />
      <div css={styleMobileNavSecondary}>
        <SocialLinks />
          <ul>
            <li>
              <Logo />
            </li>
          </ul>
      </div>
    </div>
  )

  // Desktop + Mobile Nav Items
  const ShowNavItems = () => (
    <nav css={styleNavItems}>
      <Link href="/" activeClassName="active" exact="false" as="">
        <a onClick={toggleMobileNav ? toggleMenu : null} aria-label="Home">
          Home
        </a>
      </Link>
      <Link href="/blog" activeClassName="active" exact="" as="">
        <a onClick={toggleMobileNav ? toggleMenu : null} aria-label="Blog">
          Blog
        </a>
      </Link>
      <Link href="/about" activeClassName="active" exact="" as="">
        <a onClick={toggleMobileNav ? toggleMenu : null} aria-label="About">
          About
        </a>
      </Link>
    </nav>
  )

  // Render the Nav
  return (
    <>
      <div css={styleMainNav}>
        <ShowNavItems />
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