import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Link from './Link'


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
        color: theme.colors.footer,
      }
    },
    '@media(max-width: 600px)': {
      display: 'none',
    }
  })

  const mobileNavWrapper = css ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    background: theme.colors.divider,
    top: '-2rem',
    left: '-6%',
    animation: 'fade-in .2s forwards',
    '@media(min-width: 601px)': {
      display: 'none',
    }
  })

  const mobileNavMenu = css({
    alignItems: 'center',
    marginRight: '5%',
    marginLeft: 30,
    zIndex: 6,
    width: '45px',
    height: '30px',
    transform: 'rotate(0deg)',
    transition: '.5s ease-in-out',
    cursor: 'pointer',
    'span': {
      display: 'block',
      position: 'absolute',
      height: '2px',
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
        top: 13,
      },
      '&:nth-of-type(3)': {
        top: 13,
      },
      '&:nth-of-type(4)': {
        top: 26,
      },
    },
    '&.open': {
      'span:nth-of-type(1)': {
        top: 13,
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
    '@media(min-width: 600px)': {
      display: 'none',
    },
  })

  const navItems = css({
    display: 'flex',
    '@media(max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 'calc(3vw + 3vh)',
      lineHeight: '4rem',
      fontWeight: 900,
    }
  })

  // Set state for mobile nav
  const [toggleMobileNav, setToggleMobileNav] = useState(false)
  const toggleMenu = () => setToggleMobileNav(!toggleMobileNav)
  const ShowNavItems = () => (
    <div css={navItems}>
      <Link href="/" activeClassName="active" exact="false" as="">
        <a className="nav" onClick={toggleMenu}>Home</a>
      </Link>
      <Link href="/bio" activeClassName="active" exact="" as="">
        <a className="nav" onClick={toggleMenu}>Bio</a>
      </Link>
      <Link href="/blog" activeClassName="active" exact="" as="">
        <a className="nav" onClick={toggleMenu}>Blog</a>
      </Link>
    </div>
  )

  // // Mobile Menu Animation
  // const [toggleMenuAnimation, setToggleMenuAnimation] = useState(false)
  // const toggleAnimation = () => setToggleMenuAnimation(!toggleMenuAnimation)

  return (
    <>
      <div css={mainNav}>
        <ShowNavItems />
      </div>

      <div
        css={mobileNavMenu}
        onClick={toggleMenu}
        className={toggleMobileNav ? 'open' : 'closed'}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>

      { toggleMobileNav ?
        <div css={mobileNavWrapper}>
          <ShowNavItems />
        </div>
      : null }

    </>
  )
}