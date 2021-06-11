import React, { useState } from 'react'
import { Global, css } from '@emotion/react'
import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from "axios"
import LoadingSpinner from './LoadingSpinner'

const BlogAdmin: React.FC =  React.memo(()=> {

  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const [session] = useSession()
  const isLoggedIn = session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL

  let adminPanelLeft = null
  let adminPanelRight = null

  // Deploy New Build
  const [isDeploying, setIsDeploying] = useState(false)
  const showDeployLoader: Function = () => {
    setIsDeploying(true)
    setTimeout(() => {
      setIsDeploying(false)
    }, 85000)
  }
  async function deployNewBuild(): Promise<any> {
    axios.get(`/api/deploy?secret=${process.env.NEXT_PUBLIC_DEPLOY_TOKEN}`).then(response => {
      console.log(response.data.data.job)
      showDeployLoader()
      axios.get(`/api/preview/exit-preview?secret=${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}`)
      router.push('/blog')
    })
    .catch(err => {
      console.error(err)
    })
  }

  // Styles
  const styleAnimationWrapper = css ({
    display: session ? 'block' : 'none',
    overflow: 'hidden',
  })
  const styleAdminPanel = css({
    width: 'auto',
    display: 'flex',
    padding: '.5rem 4rem',
    backgroundColor: 'var(--color-accent)',
    borderBottom: '1px dotted var(--color-gray)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    animation: 'adminPanelSlideDown 1s',
    '@media (max-width: 1024px)': {
      padding: '.5rem 2.5rem'
    },
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      padding: '.5rem 2.5rem'
    },
    '@keyframes adminPanelSlideDown': {
      from: {
        opacity: 0,
        transform: 'translate3d(0, -100%, 0)',
        height: 0,
      },
      to: {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        height: 50
      }
    },
  })
  const styleAdminPanelLeft = css({
    display: 'flex',
    '@media(max-width: 600px)': {
      justifyContent: 'flex-end',
      margin: '0 .5rem .5rem 0',
    },
    span: {
      display: 'flex',
      fontSize: 11,
      alignSelf: 'center',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-primary)',
      'a': {
        marginLeft: '.5rem',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  })
  const styleAdminPanelRight = css({
    display: 'flex',
    justifyContent: 'right',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    '.deploymentStatus': {
      display: 'flex',
      flexAlign: 'row',
    }
  })

  // Render Admin panel for authenticated users
  if (isLoggedIn) {
    adminPanelLeft = (
      <div css={styleAdminPanelLeft}>
        <span>
          Welcome, {session.user.name.split(" ")[0]}! •
          <a
            onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/blog` })}
            aria-label="Sign Out"
            tabIndex={0}
          >
            Sign Out
          </a>
        </span>
      </div>
    )
    adminPanelRight = (
      <div css={styleAdminPanelRight}>
        <div className="deploymentStatus">
          { isDeploying ? <LoadingSpinner /> : null }
          <button
            onClick={ !isDeploying ? deployNewBuild : null }
            className={ (isDeploying) ? 'buttonCompact deploy disabled' : 'buttonCompact deploy' }
            aria-label="Deploy"
          >
            Deploy
          </button>
        </div>
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
    <>
      <div css={styleAnimationWrapper}>
        <nav css={styleAdminPanel}>
          {adminPanelLeft}
          {adminPanelRight}
        </nav>
      </div>

      <Global styles={{
        // Buttons
        '.buttonCompact': {
          minWidth: 80,
          marginRight: '.25rem',
          padding: '.45rem 1rem',
          display: 'inline-block',
          backgroundColor: 'var(--color-text)',
          border: '1px solid var(--color-accent)',
          borderRadius: 8,
          color: 'var(--color-bg)',
          fontSize: 12,
          fontFamily: 'var(--font-primary)',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:disabled': {
            backgroundColor: 'var(--color-button-disabled)',
            cursor: 'default',
          },
          '.create &': {
            '&.createBtn': {
              backgroundColor: 'var(--color-button-disabled)',
            }
          },
          '.drafts &': {
            '&.draftsBtn': {
              backgroundColor: 'var(--color-button-disabled)',
            }
          },
          '&.delete': {
            backgroundColor: 'var(--color-warning)',
            color: '#fff',
            textDecoration: 'none',
          },
          '&.deploy': {
            backgroundColor: 'var(--color-accent-color)',
            '&.disabled': { cursor: 'wait' }
          },
          '&.disabled': {
            backgroundColor: 'var(--color-button-disabled)',
          }
        }
      }}/>
    </>
  )
})

export default BlogAdmin