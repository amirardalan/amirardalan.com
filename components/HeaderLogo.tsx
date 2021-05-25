import Link from 'next/link'
import Logo from './Logo'

export default function Header() {

  return (
      <Link
        href="/"
        aria-label="Amir Ardalan Logo"
      >
        <button css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          animation: 'slide-up 1s forwards',
          fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}>
          <Logo/> 
        </button>
      </Link>
  )
}