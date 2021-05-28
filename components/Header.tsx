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
        background: 'transparent',
        border: 'none',
        fontFamily: themeDark.fonts.secondary,
        cursor: 'pointer',
        animation: 'slideUp 1s forwards',
      }}>
        <Logo/> 
      </button>
    </Link>
  )
}