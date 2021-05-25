import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Link from './Link'
import SocialLinks from './SocialLinks'


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
    justifyContent: 'flex-start',
    paddingTop: '33%',
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
    width: '30px',
    height: '22px',
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
        top: 10,
      },
      '&:nth-of-type(3)': {
        top: 10,
      },
      '&:nth-of-type(4)': {
        top: 20,
      },
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
    '@media(min-width: 600px)': {
      display: 'none',
    },
  })

  const navItems = css({
    display: 'flex',
    '@media(max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'self-start',
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
        <a className="nav" onClick={toggleMenu} aria-label="Home">
          Home
        </a>
      </Link>
      <Link href="/bio" activeClassName="active" exact="" as="">
        <a className="nav" onClick={toggleMenu} aria-label="Bio">
          Bio
        </a>
      </Link>
      <Link href="/blog" activeClassName="active" exact="" as="">
        <a className="nav" onClick={toggleMenu} aria-label="Blog">
          Blog
        </a>
      </Link>
    </div>
  )

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
          <div css={{
            margin: '5rem 0',
            fontSize: '12px',
            a: {
              display: 'block',
              marginBottom: '.5rem',
              textAlign: 'center',
            }
          }}>
            <SocialLinks />
            <div css={{
              position: 'relative',
              textAlign: 'center',
              paddingTop: '1rem',
            }}>
              <ul>
                <li css={{ marginBottom: '1rem' }}>•</li>
                <li>Copyright</li>
                <li>&copy;{(new Date().getFullYear())}</li>
                <li>@amirardalan</li>
              </ul>
            </div>
          </div>
        </div>
      : null }

    </>
  )
}