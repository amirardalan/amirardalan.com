import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Link from './Link'
import SocialLinks from './SocialLinks'
import Logo from './Logo'


export default function Navigation() {

  const theme : any = useTheme()

  const mainNav = css({
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

  const mobileNavWrapper = css ({
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

  const mobileNavMenu = css({
    alignItems: 'center',
    marginRight: '5%',
    marginLeft: 30,
    zIndex: 6,
    width: 41,
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
      background: theme.colors.text,
      opacity: 1,
      left: 0,
      transform: 'rotate(0deg)',
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

  const navItems = css({
    display: 'flex',
    a: { color: theme.colors.text, },
    
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 'calc(3vw + 3vh)',
      lineHeight: '4rem',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      paddingRight: '2.5rem',
      alignItems: 'flex-end',
    }
  })

  // Set state for mobile nav
  const [toggleDisableScrolling, setToggleDisableScrolling] = useState(false)
  const disableScroll = () => {
    setToggleDisableScrolling(!toggleDisableScrolling)
    toggleDisableScrolling ? document.body.style.overflow = 'scroll' : document.body.style.overflow = 'hidden'
  }
  // Disable Scrolling when mobile menu is active
  const [toggleMobileNav, setToggleMobileNav] = useState(false)
  const toggleMenu = () => {
    setToggleMobileNav(!toggleMobileNav),
    disableScroll()
  }

  const MobileMenu = () => (
    <div css={mobileNavWrapper}>
      <ShowNavItems />
      <div css={{
        margin: '3rem 0',
        fontSize: 12,
        a: {
          display: 'block',
          marginBottom: '.5rem',
          textAlign: 'center',
          animation: 'slideUp .8s ease',
        }
      }}>
        <SocialLinks />
        <div css={{
          position: 'relative',
          textAlign: 'center',
          paddingTop: '1rem',
          animation: 'slideUp .5s',
        }}>
          <ul>
            <li css={{
              height: 80,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'slideUp 1s forwards',
              fontFamily: theme.fonts.secondary,
            }}>
              <Logo />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

  const ShowNavItems = () => (
    <nav css={navItems}>
      <Link href="/" activeClassName="active" exact="false" as="">
        <a className="nav" onClick={toggleMobileNav ? toggleMenu : null} aria-label="Home">
          Home
        </a>
      </Link>
      <Link href="/blog" activeClassName="active" exact="" as="">
        <a className="nav" onClick={toggleMobileNav ? toggleMenu : null} aria-label="Blog">
          Blog
        </a>
      </Link>
      <Link href="/about" activeClassName="active" exact="" as="">
        <a className="nav" onClick={toggleMobileNav ? toggleMenu : null} aria-label="About">
          About
        </a>
      </Link>
    </nav>
  )

  return (
    <>
      <div css={mainNav}>
        <ShowNavItems />
      </div>

      <button
        css={mobileNavMenu}
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