import React, { useState } from 'react'
import Link from 'next/link'
import { Global, css, useTheme } from '@emotion/react'
import axios from "axios"
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/client'
import LoadingSpinner from './LoadingSpinner'

const BlogAdmin: React.FC =  React.memo(()=> {

    const router = useRouter()
    const isActive: (pathname: string) => boolean = (pathname) =>
      router.pathname === pathname
  
    const [session] = useSession()
    const theme : any = useTheme()
  
    let left = null
    let right = null


    // Deploy New Build
    const [isDeploying, setIsDeploying] = useState(false)
    const showDeployLoader: Function = () => {
      setIsDeploying(true)
      setTimeout(() => {
        setIsDeploying(false)
      }, 84000)
    }


    async function deployNewBuild(): Promise<any> {
      axios.get(`/api/deploy?secret=${process.env.NEXT_PUBLIC_DEPLOY_TOKEN}`).then(response => {
        console.log(response.data.data.job)
        showDeployLoader()
        axios.get(`/api/preview/exit-preview?secret=${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}`)
        router.push('/blog')
      })
      .catch(err => {
        console.log(err)
      })
    }
  
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
              onClick={() => signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/blog` })}
              aria-label="Sign Out"
              tabIndex={0}
              css={{ textDecoration: 'none' }}>
              Sign Out
            </a>
          </span>
        </div>
      )
      right = (
        <div className="right" css={{
          display: 'flex',
          justifyContent: 'right',
          flexDirection: 'row',
  
        }}>
          <div css={{
            display: 'flex',
            flexAlign: 'row',
          }}>
  
            { isDeploying ? <LoadingSpinner /> : null }
  
            <button
              onClick={ !isDeploying ? deployNewBuild : null }
              className={ isDeploying ? 'buttonCompact deploy disabled' : 'buttonCompact deploy' }
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
        <Global styles={css`
          // Buttons
          a.buttonCompact,
          input.buttonCompact,
          .buttonCompact {
            min-width: 80px;
            margin-right: .25rem;
            padding: .45rem 1rem;
            display: inline-block;
            background-color: ${theme.colors.text};
            border: 1px solid ${theme.colors.accent};
            border-radius: 5px;
            color: ${theme.colors.background};
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            &:disabled {
              background-color: ${theme.colors.disabledBtn};
              cursor: default;
            }
            .create & {
              &.createBtn {
                background-color: ${theme.colors.disabledBtn};
              }
            }
            .drafts & {
              &.draftsBtn {
                background-color: ${theme.colors.disabledBtn};
              }
            }
            &.delete {
              background-color: ${theme.colors.warning};
              text-decoration: none;
              color: #e2e2e2;
            }
            &.deploy {
              background-color: ${theme.colors.accentColor};
              &.disabled { cursor: wait; }
            }
            &.disabled {
              background-color: ${theme.colors.disabledBtn};
            }
          }
        `}/>
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
      </>
    )
  })

export default BlogAdmin