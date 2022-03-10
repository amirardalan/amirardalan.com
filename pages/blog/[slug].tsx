import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Router from 'next/router'
import { css } from '@emotion/react'

import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import BlogNavigation from '@/components/BlogNavigation'
import calculateReadTime from '@/utils/calculateReadTime'
import formatDate from '@/utils/formatDate'
import Link from 'next/link'
import Markdown from '@/components/Markdown'
import BlogError from '@/components/BlogError'

import { blogPost, breadcrumb, admin } from '@/data/content'
import { GetStaticProps, GetStaticPaths } from 'next'
import prisma from '@/lib/prisma'


export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  })
  const paths = feed.map((post) => ({
    params: { slug: post.slug }
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [post, feed] = await prisma.$transaction([
    prisma.post.findFirst({
      where: {
        slug: String(params?.slug),
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    }),
    prisma.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        teaser: true,
        slug: true,
        category: true
      },
    })
  ])
  if (post) {
    return { props: { post: JSON.parse(JSON.stringify(post)), feed, data: blogPost } } 
  } else {
    return {
      notFound: true
    }
  }
}


const Post = ({ post, feed, data }) => {

  const styleBlogPost = css({
    '.postFull': {
      '.postDetails': {
        marginBottom: '2.5rem',
      },
      '.note': {
        position: 'relative',
        marginBottom: '2.5rem',
        padding: '2.8rem 1.5rem 1.2rem 1.5rem',
        border: '1px solid var(--color-accent-gray)',
        borderRadius: 5,
        fontFamily: 'var(--font-tertiary)',
        fontSize: 18,
        lineHeight: '1.8rem',
        color: 'var(--color-gray)',
        '&:before, &:after': {
          position: 'absolute',
        },
        '&:before': {
          content: '""',
          top: 20,
          left: 22,
          width: 15,
          height: 15,
          background: 'var(--icon-info) no-repeat',
          backgroundSize: 'contain',
        },
        '&:after': {
          content: '"Note:"',
          top: 13,
          left: 42,
          textTransform: 'uppercase',
          fontFamily: 'var(--font-primary)',
          fontSize: 13,
        },
        '&.tip': {
          '&:after': {
            content: '"Tip:"',
          },
        },
        '&.example': {
          '&:after': {
            content: '"Example:"',
          },
        },
        '&.warn': {
          '&:after': {
            content: '"Warning:"',
          },
        },
      },
      h1: {
        margin: '0 0 .8rem',
        textDecoration: 'none',
        '@media(max-width: 1024px)': {
          margin: '0 0 .5rem',
          fontSize: 35,
        }
      },
      '.teaser': {
        marginBottom: '2.5rem',
        fontFamily: 'var(--font-tertiary)',
        fontSize: 16,
        lineHeight: '1.5rem',
        color: 'var(--color-gray)',
      },
      'h3, h3 code': {
        fontSize: 28,
        '@media(max-width: 480px)': {
          fontSize: 'calc(2.2vw + 2.2vh)',
          WebkitMarqueeIncrement: '0vw',
        }
      },
      h3: {
        scrollMarginTop: '4rem',
        margin: '2rem 0',
        padding: 0,
        display: 'inline-block',
        fontWeight: 'bold',
        lineHeight: '2.4rem',
        '& code': {
          fontFamily: 'var(--font-secondary)',
        },
        a: {
          position: 'absolute',
          display: 'block',
          height: '100%',
          width: '100%',
          '&:hover': {
            '&::before': {
              content: '"#"',
              color: 'var(--color-accent-gray)',
              position: 'absolute',
              textAlign: 'center',
              top: 4,
              left: -22,
              fontSize: 25
            }
          },
        },
        '@media(hover: none)': {
          a: { display: 'none' }
        },
      },
      'h1, h2, h3, h3, h4, h5, h6': {
        position: 'relative',
      },
      'p, ul, li, a': {
        fontFamily: 'var(--font-tertiary)',
        fontSize: 18,
        lineHeight: '1.8rem',
      },
      'ul, li, a': { 
        marginBottom: '1rem'
      },
      p: {
        marginBottom: '2.5rem',
      },
      a: {
        textDecoration: 'underline',
        '&:hover': {
          textDecoration: 'none'
        },
      },
      blockquote: {
        margin: '2rem -2.5rem',
        padding: '0 2rem',
        borderLeft: '8px solid var(--color-accent-gray)',
        color: 'var(--color-gray)',
        'p, a': {
          marginBottom: 0,
          fontSize: 22,
          fontStyle: 'italic'
        },
        '& blockquote': {
          marginLeft: '1rem',
          borderLeft: '8px solid var(--color-gray)',
        },
        '@media(max-width: 480px)': {
          margin: '2rem -1.5rem',
          padding: '0 1rem',
        }
      },
      'ul li': {
        listStyle: 'outside',
        marginLeft: '2rem',
        paddingLeft: '.5rem',
        '&.task-list-item': {
          fontFamily: 'var(--font-primary)',
          fontSize: 15,
          fontWeight: 'bold',
        },
        'input[type="checkbox"]': {
          marginTop: '-.1rem',
        },
        '@media (max-width: 480px)': {
          marginLeft: '1.5rem',
        }
      },
      'ul.contains-task-list': {
        li: {
          '&:first-of-type':{
            fontFamily: 'var(font-secondary)',
          },
          listStyle: 'none',
          margin: 0,
          padding: 0,
        },
      },
      ol: {
        counterReset: 'counter',
        margin: '2rem 0',
        li: {
          counterIncrement: 'counter',
          marginLeft: '2rem',
          paddingLeft: '.5rem',
          position: 'relative',
          '&::before': {
            content: "counter(counter)",
            width: '1.5rem',
            height: '1.5rem',
            position: 'absolute',
            top: '.2rem',
            left: '-2rem',
            background: 'var(--color-accent-color)',
            borderRadius: '50%',
            color: 'var(--color-bg)',
            fontFamily: 'var(--font-primary)',
            fontSize: '1rem',
            fontWeight: 'bold',
            lineHeight: '1.5rem',
            textAlign: 'center',
            '@media not all and (min-resolution:.001dpcm)': { 
              '@supports (-webkit-appearance:none)': {
                paddingLeft: '.1rem',
              }
            }
          }
        }
      }
    },
    '.postImg': {
      paddingBottom: '2rem !important',
    },
    '.controlsPost': {
      margin: '2rem 0',
      'button, a': {
        marginRight: '.25rem',
      },
    },
  })

  let loadBlogPost = null
  const { data: session } = useSession()
  const userHasValidSession = Boolean(session)

  const isPublished : Boolean = post.published
  const publishLabel = isPublished ? `${admin.controls.unpublish}` : `${admin.controls.publish}`
  const redirect = isPublished ? '/blog' : '/blog/drafts'

  const isEdited = post.editedAt.slice(0, 10) > post.publishedAt.slice(0, 10)
  const publishDate = formatDate(post.publishedAt)
  const editDate = formatDate(post.editedAt)
  const postReadTime = calculateReadTime(post.content)

  async function publishPost(slug: String, published: boolean): Promise<void> {
    await fetch(`/api/publish/${slug}?published=${published}`, {
      method: 'PUT',
    })
    await Router.push(redirect)
  }
  async function editPost(id: number): Promise<void> {
    await fetch(`/blog/edit/${id}`, {
      method: 'PUT',
    })
    await Router.push(`/blog/edit/${id}`)
  }
  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    Router.push(redirect)
  }

  const title = post.title

  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  const confirmOnClick = () => setShowDeletionConfirmation(true)
  const cancelOnClick = () => setShowDeletionConfirmation(false)
  const DeletionConfirmation = () => (
    <div className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink delete" onClick={() => deletePost(post.id)}>
          {admin.controls.confirm}
        </span>
        <span>•</span>
        <span className="confirmLink close" onClick={cancelOnClick}>
          {admin.controls.cancel}
        </span>
      </div>
    </div>
  )

  const Breadcrumbs = () => {
    if (!isPublished) {
      return (
        <nav className="breadcrumbs">
          <Link href="/blog">{breadcrumb.blog}</Link>
            <Link href="/blog/drafts">
              <a>{breadcrumb.drafts}</a>
            </Link>
          <span>{title}</span>
        </nav>
      )
    } else {
      return null
    }
  }

  // If the post contains an image, set the first image as the og:image banner
  const hasImage = post.content.replace(/`([^`]*)/g,'').match(/!\[.*?\]\((.*?)\)/)
    ? `${process.env.NEXT_PUBLIC_SITE_URL}` + post.content.match(/!\[.*?\]\((.*?)\)/)[1]
    : `${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.jpg`

  if (isPublished || session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    loadBlogPost = (
      <div className={isPublished ? 'blog' : 'blog admin'} css={styleBlogPost}>

        <Breadcrumbs/>

        <div className="post postFull">

          <p
            className="category"
            aria-label={post.category}
          >
            {post.category}
          </p>
          <h1 aria-label={`${title}`}>
            {title}
          </h1>
          <p className="teaser">{post.teaser}</p>
          <div className="postDetails" aria-label={`${editDate} • ${postReadTime}`}>
            <div className="author">
              By <span>{post?.author?.name || 'Unknown author'}</span>
            </div>
            <div className="postDate">
              {isEdited ? `Updated: ${editDate}`: publishDate } • {postReadTime}
            </div>
          </div>

          <Markdown markdown={post} />

          { userHasValidSession && (
            <div className="controlsPost">

              <button
                className="buttonCompact"
                onClick={() => publishPost(post.id, post.published)}>
                {publishLabel}
              </button>
              <button
                className="buttonCompact"
                onClick={() => editPost(post.id)}>
                {admin.controls.edit}
              </button>
              <button
                className="buttonCompact delete"
                onClick={confirmOnClick}>
                {admin.controls.delete}
              </button>

              { showDeletionConfirmation
              ? <DeletionConfirmation />
              : null }

            </div>
          )}

        </div>

        <BlogNavigation
          feed={feed}
          post={post}
          isPublished={isPublished}
        />

      </div>
    )
  } else {
    loadBlogPost = (
      <BlogError />
    )
  }

  return (
    <Container
      title={title}{...data.meta.title}
      description={post.teaser}
      image={hasImage}
      date={publishDate}
      robots={isPublished ? "follow, index" : "noindex"
    }>
      <BlogStyles>
        {loadBlogPost}
      </BlogStyles>
    </Container>
  )
}

export default Post