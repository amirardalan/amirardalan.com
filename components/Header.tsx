import Link from 'next/link'
import { themeDark } from '../styles/theme'
import Logo from './Logo'

export default function Header() {

  return (
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
          animation: 'slide-up 1s forwards',
          fontFamily: themeDark.fonts.secondary,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}>
          <Logo/> 
        </button>
      </Link>
  )
}