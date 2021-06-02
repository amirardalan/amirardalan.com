import Logo from './Logo'
import Link from 'next/link'
import Navigation  from '../components/Navigation'
import ToggleTheme from '../components/ToggleTheme'
import { useTheme } from '@emotion/react'


const Header = ({toggleTheme}) => {

  const theme: any = useTheme()

  return (

    <div className="header">
      <Link
        href="/"
        aria-label="Amir Ardalan Logo"
      >
        <button css={{
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
        }}>
          <Logo/> 
        </button>
      </Link>
      <div className="headerRight">
        <Navigation />
        <ToggleTheme toggleTheme={toggleTheme} />
      </div>
    </div>
  )
}

export default Header