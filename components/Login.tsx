import React from 'react'
import Link from 'next/link'
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'


const Login: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const [session] = useSession()

  const theme : any = useTheme()

  let left = null
  let right = null

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    left = (
      <div
        className="left loginUser"
        css={{
          display: 'flex'
        }}>
        <span css={{
          display: 'flex',
          fontSize: '12px',
          alignSelf: 'center',
          color: theme.colors.textLight,
          fontFamily: "Menlo, Monaco, 'Courier New', monospace",
          'a': {
            marginLeft: '.5rem',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          },
          '@media(max-width: 890px)': {
            marginBottom: '.5rem'
          }
        }}>
          {session.user.name} ({session.user.email}) • <a onClick={() => signOut()}> Sign Out</a>
        </span>
      </div>
    )
    right = (
      <div className="right" css={{
        justifyContent: 'right'
      }}>
        <Link href="/blog/create">
          <button className="buttonCompact">
            New post
          </button>
        </Link>
        <Link href="/blog/drafts">
          <button className="buttonCompact" data-active={isActive('/drafts')}>
            Drafts
          </button>
        </Link>
      </div>
    )
  }

  return (
    <nav css={{
      margin: '.5rem 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '@media (max-width: 500px)': {
        flexDirection: 'column'
      }
    }}>
      {left}
      {right}
    </nav>
  )
}

export default Login