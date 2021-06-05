import Logo from './Logo'
import Link from 'next/link'
import Navigation  from '../components/Navigation'
import ToggleTheme from '../components/ToggleTheme'
import { useTheme, css } from '@emotion/react'
import dynamic from 'next/dynamic'
const BlogAdmin = dynamic(() => import('../components/BlogAdmin'))


const Header = ({toggleTheme}) => {
  
  const theme: any = useTheme()
  const styleHeaderWrapper = css({
    zIndex: 5,
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colors.background,
  })
  const styleHeader = css({
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
    fontFamily: theme.fonts.secondary,
    cursor: 'pointer',
    animation: 'slideUp 1s forwards',
  })

  return (
    <div css={styleHeaderWrapper}>
      <div css={styleHeader}>
        <Link
          href="/"
          aria-label="Amir Ardalan Logo"
        >
          <button css={styleLogoButton}>
            <Logo/> 
          </button>
        </Link>
        <div className="headerRight">
          <Navigation />
          <ToggleTheme toggleTheme={toggleTheme} />
        </div>
      </div>
      <BlogAdmin />
    </div>
  )

}

export default Header