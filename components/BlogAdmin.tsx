import React from 'react'
import Link from 'next/link'
import { useTheme } from '@emotion/react'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'


const BlogAdmin: React.FC = () => {
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
          fontSize: '11px',
          alignSelf: 'center',
          color: theme.colors.textLight,
          fontFamily: theme.fonts.primary,
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
          {session.user.name} ({session.user.email}) •
          <a
            onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_CALLBACK_URL}` })}
            aria-label="Sign Out"
            tabIndex={0}
            css={{
              textDecoration: 'none',
              '&:hover': {
                color: theme.colors.grayscale
              }
            }}>
            Sign Out
          </a>
        </span>
      </div>
    )
    right = (
      <div className="right" css={{
        justifyContent: 'right'
      }}>
        <Link href="/blog/create">
          <button className="buttonCompact createBtn" aria-label="New Post">
            Create
          </button>
        </Link>
        <Link href="/blog/drafts" aria-label="Drafts">
          <button className="buttonCompact draftsBtn" data-active={isActive('/drafts')}>
            Drafts
          </button>
        </Link>
      </div>
    )
  }

  return (
    <nav css={{
      margin: '1.5rem 0',
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

export default BlogAdmin