import { css } from '@emotion/react'
import Navigation  from '@/components/Navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'

import dynamic from 'next/dynamic'
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false
})


const Header = ({ toggleTheme }) => {
  
  const styleHeaderWrapper = css({
    padding: '2rem 4rem 0',
    position: 'sticky',
    top: '-2rem',
    backgroundColor: 'var(--color-bg)',
    zIndex: 5,
    '.exludeInHeader': {
      display: 'none',
    },
    '@media(max-width: 1024px)': {
      padding: '0 2.5rem',
      top: 0,
    },
    '@media(max-width: 600px)': {
      padding: '0 1.5rem',
    }
  })
  const styleHeader = css({
    paddingBottom: '1rem',
    paddingTop: '1rem',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    a:  { textDecoration: 'none' },
    '.headerRight': {
      minWidth: '410.8px', // Prevent layout shift
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '@media (max-width: 768px)': {
        flexDirection: 'row-reverse',
        minWidth: 'unset',
      }
    }
  })
  const styleLogoButton = css({
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    fontFamily: 'var(--font-secondary)',
    cursor: 'pointer',
  })

  return (
    <div css={styleHeaderWrapper}>
      <div css={styleHeader}>
        <Link
          href="/"
          aria-label="Amir Ardalan Logo"
        >
          <button css={styleLogoButton}>
            <Logo /> 
          </button>
        </Link>
        <div className="headerRight">
          <Navigation />
          <ThemeToggle toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )

}

export default Header