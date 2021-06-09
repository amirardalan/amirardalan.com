import { css } from '@emotion/react'
import Link from 'next/link'
import Navigation  from '@/components/Navigation'
import Logo from '@/components/Logo'
import dynamic from 'next/dynamic'
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), {
  ssr: false
})
const BlogAdmin = dynamic(() => import('@/components/BlogAdmin'), {
  ssr: false
})


const Header = () => {
  
  const styleHeaderWrapper = css({
    padding: '2rem 4rem',
    position: 'sticky',
    top: '-2rem',
    backgroundColor: 'var(--color-bg)',
    zIndex: 5,
    '@media(max-width: 1024px)': {
      padding: '0 2.5rem',
      top: 0,
    },
    '@media(min-width: 600px and max-width: 890px)': {
      padding: '0 2rem',
    },
    '@media(max-width: 480px)': {
      padding: '0 1.5rem',
    }
  })
  const styleHeader = css({
    overflow: 'hidden',
    paddingBottom: '1rem',
    paddingTop: '1rem',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    a:  { textDecoration: 'none' },
    '.headerRight': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '@media (max-width: 768px)': {
        flexDirection: 'row-reverse'
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
          <ThemeToggle />
        </div>
      </div>
      <BlogAdmin />
    </div>
  )

}

export default Header