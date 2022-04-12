import React, { useState } from 'react'
import { Global, css } from '@emotion/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import LoadingSpinner from './LoadingSpinner'


const BlogAdmin = React.memo(function BlogAdmin() {

  const { data: session } = useSession()
  const router = useRouter()
  const URL = process.env.NEXT_PUBLIC_SITE_URL
  const revalidatePath = router.asPath

  // Session & Route Conditionals
  const isLoggedIn = session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL
  const isAdminPage = ['/blog/create','/blog/edit/[id]','/blog/drafts'].includes(router.pathname)
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname

  // On-Demand ISR Webhook
  const [isRevalidating, setIsRevalidating] = useState(false)

  async function handleRevalidatePage(): Promise<void> {
    if(isRevalidating) { return }
    setIsRevalidating(true)
    fetch(`/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}&path=${process.env.NEXT_PUBLIC_SITE_URL}${revalidatePath}`).then((data) => {
      if (data.status === 200) {
        setIsRevalidating(false),
        fetch(`/api/preview/exit-preview?secret=${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}`)
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  const styleAnimationWrapper = css ({
    display: session ? 'block' : 'none',
    overflow: 'hidden',
  })
  const styleAdminPanel = css({
    width: 'auto',
    display: 'flex',
    padding: '.5rem 4rem',
    backgroundColor: 'var(--color-accent)',
    borderBottom: '1px solid var(--color-accent-neutral)',
    justifyContent: 'space-between',
    animation: 'adminPanelSlideDown .2s',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      padding: '.5rem 1rem'
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
      fontSize: 11,
      alignSelf: 'center',
      color: 'var(--color-neutral)',
      a: {
        marginLeft: '.5rem',
        textTransform: 'uppercase',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    }
  })
  const styleAdminPanelRight = css({
    display: 'flex',
    justifyContent: 'right',
    '.deploymentStatus': {
      display: 'flex',
    },
    'button, a': {
      marginRight: '.25rem',
    },
  })

  const AdminPanel = () => {
    return (
      <>
        <div css={styleAdminPanelLeft}>
          <span>
            Welcome, {session.user.name.split(" ")[0]}! •
            <a
              onClick={() => signOut({ callbackUrl: isAdminPage ? `${URL}/blog` : `${URL+router.asPath}`})}
              aria-label="Sign Out"
              tabIndex={0}
            >
              Sign Out
            </a>
          </span>
        </div>

        <div css={styleAdminPanelRight}>
          <div className="deploymentStatus">
            { isRevalidating ? <LoadingSpinner /> : null }
            <button
              onClick={handleRevalidatePage}
              className={ isRevalidating ? 'buttonCompact deploy disabled' : 'buttonCompact deploy' }
              aria-label="Revalidate Page"
              aria-disabled={ isRevalidating ? true : false}
            >
              Revalidate
            </button>
          </div>
          <Link href="/blog/create" passHref>
            <button className="buttonCompact createBtn" aria-label="New Post">
              Create
            </button>
          </Link>
          <Link href="/blog/drafts" passHref aria-label="Drafts">
            <button className="buttonCompact draftsBtn" data-active={isActive('/drafts')}>
              Drafts
            </button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      {isLoggedIn ?
      <Global styles={{
        '.breadcrumbs': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: 'var(--color-neutral)',
          fontSize: 13,
          a: {
            textDecoration: 'none',
            '&::after': {
              content: '"/"',
              margin: '0 .5rem',
              color: 'var(--color-neutral)',
            }
          },
          '@media (max-width: 480px)': {
            span: {
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }
          }
        },
        '.blog.admin': {
          width: '100%',
          '.drafts': {
            marginTop: '1rem',
          },
          form: {
            marginTop: '1rem'
          },
          '.postOptions': {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '1rem',
            fontSize: 13,
            '.uploadImage': {
              span: { margin: '0 .5rem 0 2rem' }
            },
            '@media(max-width: 768px)': {
              flexDirection: 'column'
            }
          },
          '.checkbox': {
            marginRight: '.5rem'
          },
          '.dropdownLabel': {
            marginRight: '2rem',
            span: {
              marginRight: '.5rem'
            },
            select: {
              textTransform: 'capitalize',
            }
          },
        },
        '.buttonCompact': {
          minWidth: 80,
          padding: '.45rem 1rem',
          display: 'inline-block',
          backgroundColor: 'var(--color-text)',
          border: '1px solid var(--color-accent)',
          borderRadius: 8,
          color: 'var(--color-bg)',
          fontSize: 12,
          fontFamily: 'var(--font-primary)',
          fontWeight: 'normal',
          textTransform: 'uppercase',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          '&:disabled': {
            backgroundColor: 'var(--color-disabled)',
            cursor: 'default',
          },
          '.create &': {
            '&.createBtn': {
              backgroundColor: 'var(--color-disabled)',
            }
          },
          '.drafts &': {
            '&.draftsBtn': {
              backgroundColor: 'var(--color-disabled)',
            }
          },
          '&.delete': {
            backgroundColor: 'var(--color-warning)',
            color: '#fff',
            textDecoration: 'none',
          },
          '&.deploy': {
            backgroundColor: 'var(--color-primary)',
            '&.disabled': { cursor: 'wait' }
          },
          '&.disabled': {
            backgroundColor: 'var(--color-disabled)',
          },
          '&.deploy, &.save, &.update, &.cancel': {
            marginRight: '.25rem',
          }
        },
        '.postDraft': {
          margin: '1rem 0 .5rem',
          padding: '1.8rem',
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid var(--color-accent)',
          '.draftInfo': {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            '.label': {
              marginBottom: '.2rem',
              alignSelf: 'right',
              color: 'var(--color-neutral)',
              fontSize: 12,
              fontStyle: 'italic',
            },
          },
          '@media (max-width: 480px)': {
            padding: '1rem',
            'h2 a': {
              fontSize: 22,
            }
          },
          '.blog.postTeaser': {
            margin: '0 .5rem 0 0',
            'p.teaser': {
              marginBottom: 0,
            }
          }
        },
        '.formSubmit': {
          marginTop: '2rem',
        },
        '.controlsConfirm': {
          margin: '1rem 0 0 0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontSize: 12,
          fontWeight: 'lighter',
          textTransform: 'uppercase',
          '.confirmLink': {
            marginRight: '.5rem',
            color: 'var(--color-text)',
            fontSize: 12,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            cursor: 'pointer',
            '&.delete': {
              color: 'var(--color-warning)',
            },
            '&.close': {
              marginLeft: '.5rem',
            },
            '&.delete:hover, &.close:hover': {
              textDecoration: 'underline',
            }
          }
        },
        '.noDrafts': {
          marginTop: '6rem',
        },
      }}/> : null}

      <div css={styleAnimationWrapper}>
        <nav css={styleAdminPanel}>
          {isLoggedIn ? <AdminPanel/> : null}
        </nav>
      </div>
    </>
  )
})

export default BlogAdmin