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
    marginRight: '1.5rem',
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
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    position: 'absolute',
    height: '105vh',
    width: '75vw',
    background: 'var(--color-bg)',
    top: 0,
    right: 0,
    '.closeArea': {
      animation: 'fadeIn80 .6s ease',
      opacity: '.80',
      height: '100%',
      width: 200,
      background: 'var(--color-gradient)',
      position: 'absolute',
      left: -200,
      top: 0,
      '@media (max-width: 768px) and (max-height: 600px)': {
        width: 400,
        left: -400
      }
    },
    '@media(min-width: 769px)': {
      display: 'none',
    },
    '@media(max-width: 768px)': {
      padding: '2.5rem',
    },
    '@media(max-width: 480px)': {
      padding: '1.5rem',
    },
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(180deg)' }
    }
  })
  const styleMobileNavButton = css({
    display: 'none',
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
      alignItems: 'right',
      justifyContent: 'flex-end',
      animation: 'spin 1s forwards'
    },
    '@media(max-width: 768px)': {
      display: 'flex',
      justifyContent: 'right',
    }
  })

  const styleNavIcon = css({
    height: 16,
    width: 16,
    lineHeight: 0,
    '@media(max-width: 768px)': {
      height: 30,
      width: 30,
    }
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
        lineHeight: '1.8rem',
        marginTop: '.8rem'
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'flex-end',
      fontSize: 30,
      lineHeight: '3.4rem',
    },
    '@media (max-width: 768px) and (max-height: 600px)': {
      paddingRight: '1rem',
      alignItems: 'flex-end',
      lineHeight: '3rem',
    },
  })
  const styleMobileNavSecondary = css({
    margin: '3rem 0',
    height: 80,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-secondary)',
    position: 'relative',
    a: {
      display: 'block',
      marginBottom: '.5rem',
      color: 'var(--color-neutral)',
      textAlign: 'right',
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