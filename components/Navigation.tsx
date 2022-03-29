import { css } from '@emotion/react'
import { useState } from 'react'
import CloseButton from '@/components/CloseButton'
import Link from '@/components/Link'
import Logo from '@/components/Logo'
import { nav } from '@/data/navigation'


export default function Navigation() {
  
  const styleMainNav = css({
    display: 'flex',
    alignItems: 'center',
    marginRight: '2rem',
    fontSize: 14,
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
    justifyContent: 'center',
    position: 'absolute',
    height: '105vh',
    width: '75vw',
    padding: '3.5rem',
    background: 'var(--color-bg)',
    top: 0,
    right: 0,
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
        left: -500
      },
      alignItems: 'right'
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(180deg)' }
    }
  })
  const styleMobileNavButton = css({
    display: 'none',
    '@media(max-width: 768px)': {
      display: 'flex',
    },
    zIndex: 2,
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
      }
    },
    '.menuClose': {
      display: 'flex',
      animation: 'spin 1s forwards'
    },
  })

  const styleNavIcon = css({
    height: 16,
    width: 16
  })

  const styleNavitem = css({
    position: 'relative',
    display: 'flex',
    a: {
      position: 'relative',
      color: 'var(--color-text)',
      '&.active': {
        '&::before': {
          color: 'var(--color-primary)',
          position: 'absolute',
          content: '">"',
          left: -10,
          '@media(max-width: 768px)': {
            left: -20,
          }
        }
      }
    },
    '.spotifyNav': {
      marginTop: 2,
      lineHeight: '1rem',
      background: 'var(--icon-spotify) no-repeat',
      backgroundSize: 'contain',
      '@media(max-width: 768px)': {
        marginTop: '1rem'
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
  })
  const styleMobileNavSecondary = css({
    margin: '3rem 0',
    height: 80,
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-secondary)',
    position: 'relative',
    a: {
      display: 'block',
      marginBottom: '.5rem',
      color: 'var(--color-neutral)',
      animation: 'slideUp .4s ease',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      display: 'none',
    }
  })

  // Mobile Menu
  const [toggleDisableScrolling, setToggleDisableScrolling] = useState(false)
  const disableScroll = () => {
    setToggleDisableScrolling(!toggleDisableScrolling)
    toggleDisableScrolling
      ? document.body.style.overflow = 'scroll'
      : document.body.style.overflow = 'hidden'
  }
  const [toggleMobileNav, setToggleMobileNav] = useState(false)
  const toggleMenu = () => {
    setToggleMobileNav(!toggleMobileNav),
    disableScroll()
  }
  const MobileMenu = () => (
    <div css={styleMobileNavWrapper}>
      <Navitem />
      <div css={styleMobileNavSecondary}>
        <Logo />
      </div>
      <button
        className="closeArea"
        onClick={toggleMenu}
      />
    </div>
  )

  const Navitem = () => (
    <nav css={styleNavitem}>
      {nav.map((item: any, index: number) => {
        return (
          <Link href={item.path} activeClassName="active" exact={item.exact} as="" key={index}>
            <a onClick={toggleMobileNav ? toggleMenu : null} className={item.cName} aria-label={item.aria}>
              {item.icon ? <div css={styleNavIcon}></div> : item.title}
            </a>
          </Link>
        )}
      )}
    </nav>
  )

  return (
    <>
      <div css={styleMainNav}>
        <Navitem />
      </div>
      <button
        css={styleMobileNavButton}
        onClick={toggleMenu}
        className={toggleMobileNav ? 'open' : null}
        aria-label="Navigation Menu">
        {toggleMobileNav
          ? <div className="menuClose"><CloseButton width={28} height={28}/></div>
          : <div className="menuOpen">•••</div>}
      </button>
      { toggleMobileNav ? <MobileMenu /> : null }
    </>
  )
}