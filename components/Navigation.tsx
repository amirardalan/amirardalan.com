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

  const mobileNav = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '1.5rem',
    cursor: 'pointer',
    '.mobileNavWrapper': {
      backgroundColor: theme.colors.divider,
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '@media(min-width: 600px)': {
      display: 'none',
    }
  })

  // Set state for mobile nav
  const [toggleMobileNav, setToggleMobileNav] = useState(false)
  const ShowNavItems = () => (
    <div className="mobileNavWrapper">
      <Link href="/" activeClassName="active" exact="false" as="">
        <a className="nav">Home</a>
      </Link>
      <Link href="/bio" activeClassName="active" exact="" as="">
        <a className="nav">Bio</a>
      </Link>
      <Link href="/blog" activeClassName="active" exact="" as="">
        <a className="nav">Blog</a>
      </Link>
    </div>
  )

  return (
    <>
      <div css={mainNav}>
        <ShowNavItems />
      </div>
      <div
        css={mobileNav}
        onClick={() => setToggleMobileNav(!toggleMobileNav)}
      >
        <div>[ Menu ]</div>
        { toggleMobileNav ? <ShowNavItems /> : null }
      </div>
    </>
  )
}