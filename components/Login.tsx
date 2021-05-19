import React from 'react'
import Link from 'next/link'
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'

const Login: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const [session, loading] = useSession()

  const theme : any = useTheme()

  let left = null
  let right = null

  if (loading) {
    left = (
      <div className="left">
        <p>Validating session ...</p>
      </div>
    )
  }

  if (session) {
    left = (
      <div className="left">
        <span css={{
          display: 'block',
          fontSize: '12px',
          color: theme.colors.textLight,
          margin: '1rem 0'
        }}>
          {session.user.name} ({session.user.email})
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
        <button className="buttonCompact" onClick={() => signOut()}>
          Log out
        </button>
       
      </div>
    )
  }

  return (
    <nav css={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '@media (max-width: 500px)': {
        flexDirection: 'column',
        marginBottom: '1rem'
      }
    }}>
      {left}
      {right}
    </nav>
  )
}

export default Login