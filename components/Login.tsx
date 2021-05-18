import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import { themeLight } from '../styles/theme'

const Login: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  const [session, loading] = useSession()

  let left = null
  let right = null

  if (!session) {
    left = (
      <div className="left">
        <Link href="/api/auth/signin">
          <button css={{
            padding: '.5rem 2rem',
            cursor: 'pointer',
            'a': { textDecoration: 'none' }
          }}>
            <a data-active={isActive('/signup')}>Log in</a>
          </button>
        </Link>
      </div>
    )
  }

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
        <p css={{
          fontSize: '12px',
          color: themeLight.colors.footer
        }}>
          {session.user.name} ({session.user.email})
        </p>
      </div>
    )
    right = (
      <div className="right">
        <Link href="/blog/create">
          <button>
            <a>New post</a>
          </button>
        </Link>
        <Link href="/blog/drafts">
          <button data-active={isActive('/drafts')}>
            <a>View drafts</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          button {
            cursor: pointer;
          }
          a {
            text-decoration: none;
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    )
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem 0;
          align-items: center;
        }
      `}</style>
    </nav>
  )
}

export default Login