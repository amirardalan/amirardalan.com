import { useSession } from 'next-auth/react'
import { css } from '@emotion/react'
import { blogPost, admin } from '@/data/content'
import { deletePost } from '@/lib/blog'

import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import LoadingTriangle from '@/components/LoadingTriangle'
import BlogNavigation from '@/components/BlogNavigation'
import calculateReadTime from '@/utils/calculateReadTime'
import formatDate from '@/utils/formatDate'
import Markdown from '@/components/Markdown'

import dynamic from 'next/dynamic'
const BlogPostControls = dynamic(() => import('@/components/BlogPostControls'), { ssr: false })

import { GetStaticProps, GetStaticPaths } from 'next'
import prisma from '@/lib/prisma'

export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.post.findMany({ where: { published: true } })
  const paths = feed.map((post) => ({ params: { slug: post.slug } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [post, feed] = await prisma.$transaction([
    prisma.post.findFirst({
      where: { slug: String(params?.slug) },
      include: { author: { select: { name: true } } },
    }),
    prisma.post.findMany({
      where: { published: true },
    })
  ])
  if (post) { 
    return { props: { 
      post: JSON.parse(JSON.stringify(post)),
      feed: JSON.parse(JSON.stringify(feed)),
    } 
  } 
  } else { 
    return { notFound: true }
  }
}


const Post = ({ post, feed }) => {

  const styleBlogPost = css({
    '.postDetails': {
      marginBottom: '2rem',
      '.author': {
        span: {
          fontFamily: 'var(--font-secondary)',
          fontSize: 15,
          fontWeight: 700,
        }
      },
      '.dateAndReadTime': {
        time: {
          '&:before, &:after': {
            margin: '0 .5rem',
            content: '"•"'
          },
        },
        '@media(max-width: 480px)': {
          '.author:after, time:before': {
            content: '""',
            margin: 0
          },
        },
        '@media(max-width: 350px)': {
          'time:after': {
            content: '""'
          },
          span: {
            display: 'block'
          },
        }
      },
      '@media(max-width: 480px)': {
        flexDirection: 'column',
      }
    },
    '.postFull': {
      h1: {
        margin: '0 0 .8rem',
        textDecoration: 'none',
        lineHeight: '2.8rem',
        fontWeight: 800,
        '@media(max-width: 768px)': {
          fontSize: 32,
          margin: '0 0 .5rem',
          lineHeight: '2.2rem'
        },
        '@media(max-width: 480px)': {
          fontSize: 28,
          lineHeight: '2rem'
        }
      },
      '.teaser': {
        marginBottom: '2.5rem',
        fontFamily: 'var(--font-tertiary)',
        fontSize: 22,
        lineHeight: '1.5rem',
        color: 'var(--color-neutral)',
        '@media(max-width: 768px)': {
          marginBottom: '2rem',
          fontSize: 19,
        },
      },
      'h3, h3 code': {
        fontSize: 26,
        lineHeight: '1.8rem',
        '@media(max-width: 768px)': {
          fontSize: 24,
        },
        '@media(max-width: 480px)': {
          fontSize: 22,
        },
      },
      h3: {
        scrollMarginTop: '4rem',
        margin: '1rem 0 1.5rem',
        padding: 0,
        display: 'inline-block',
        fontWeight: 700,
        '& code': {
          fontFamily: 'var(--font-secondary)',
          background: 'transparent'
        },
        a: {
          position: 'absolute',
          display: 'block',
          height: '100%',
          width: '100%',
          '&:hover': {
            '&::before': {
              content: '"#"',
              color: 'var(--color-accent-neutral)',
              position: 'absolute',
              textAlign: 'center',
              top: 0,
              left: -22,
              fontSize: 28
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
        marginBottom: '2rem',
      },
      a: {
        color: 'inherit',
        textDecoration: 'underline',
        textDecorationColor: 'var(--color-primary)',
        '&:hover': {
          color: 'var(--color-primary)',
        },
      },
      '.note': {
        position: 'relative',
        marginBottom: '2.5rem',
        padding: '2.8rem 1.5rem 1.2rem 1.5rem',
        border: '1px solid var(--color-accent-neutral)',
        borderRadius: 5,
        fontFamily: 'var(--font-tertiary)',
        fontSize: 18,
        lineHeight: '1.8rem',
        color: 'var(--color-neutral)',
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
            color: 'var(--color-warning)'
          },
        },
      },
      blockquote: {
        margin: '2.5rem -1.5rem',
        padding: '0 2rem',
        borderLeft: '8px solid var(--color-primary)',
        color: 'var(--color-neutral)',
        'p, a': {
          marginBottom: 0,
          fontSize: 20,
          fontStyle: 'italic'
        },
        '& blockquote': {
          marginLeft: '1rem',
          borderLeft: '8px solid var(--color-neutral)',
        },
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
            border: '1px solid var(--color-primary)',
            borderRadius: '50%',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-primary)',
            fontSize: '.8rem',
            fontWeight: 'normal',
            lineHeight: '1.4rem',
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
    '.postImgWrapper': {
      paddingBottom: '2rem !important',
    },
    '.controlsPost': {
      display: 'flex',
      flexDirection: 'row',
      margin: '2rem 0',
      'button, a': {
        marginRight: '.25rem',
      },
    },
  })

  const { data: session } = useSession()
  const userHasValidSession = Boolean(session)

  const isPublished: Boolean = post.published
  const published = isPublished
  const publishLabel = isPublished ? admin.controls.unpublish : admin.controls.publish
  const displayPost = isPublished || session && session.user.email === process.env.NEXT_PUBLIC_USER_EMAIL
  const redirect = isPublished ? '/blog' : '/blog/drafts'

  const isFeatured = post.featured
  const latestPostID = feed[feed?.length - 1].id
  const latestPost = latestPostID === post.id

  const isEdited = post.editedAt.slice(0, 10) > post.publishedAt.slice(0, 10)
  const showEdited = post.showEdited
  const publishDate = formatDate(post.publishedAt)
  const editDate = formatDate(post.editedAt)
  const postReadTime = calculateReadTime(post.content)
  const title = post.title

  const handleDeletion = () => {
    return deletePost(post.id, post.slug, post.published, redirect, latestPost, post.featured)
  }

  // Set OG Image for blog posts. Use first image from post, otherwise dynamically generate one.
  const hasImage = post.content.replace(/`([^`]*)/g,'').match(/!\[.*?\]\((.*?)\)/)
    ? `${process.env.NEXT_PUBLIC_SITE_URL}` + post.content.match(/!\[.*?\]\((.*?)\)/)[1]
    : `${process.env.NEXT_PUBLIC_OG_IMAGE_URL}/${encodeURIComponent(post.title).replace(/\./g, '%2E')}?fontSize=150px`

  const RenderBlogPost = () => {
    return (
      <div className={isPublished ? 'blog' : 'blog admin'} css={styleBlogPost}>

      {!isPublished ?
        <div className="draftNotification">
          {admin.drafts.notice}
        </div>
        : null
      }

      <article className="post postFull">
        <div className="categoryWrapper">
          {isFeatured ? <div className="category featured full" aria-label="Featured Post">Featured</div> : null}
          <div className="category full" aria-label={post.category}>{post.category}</div>
        </div>
        <h1 aria-label={`${title}`}>{title}</h1>
        <p className="teaser">{post.teaser}</p>

        <div 
          className="postDetails" 
          aria-label={isEdited ? `${editDate} • ${postReadTime}` : `${publishDate} • ${postReadTime}`}
        >
          <span className="author">
            By <span>{post?.author?.name || 'Unknown author'}</span>
          </span>
          <span className="dateAndReadTime">
            {isEdited && showEdited
            ? <time dateTime={post.editedAt}>Updated: {editDate}</time> 
            : <time dateTime={post.publishedAt}>{publishDate}</time>} 
              <span className="readTime">{postReadTime}</span>
          </span>
        </div>

        <Markdown markdown={post} />

        { userHasValidSession && (
          <div className="controlsPost">
            <BlogPostControls
              post={post}
              latestPost={latestPost}
              publishLabel={publishLabel}
              requiredFields={null}
              submitClass="buttonCompact publishBtn"
              handleCancel={null}
              handleDeletion={handleDeletion}
            />
          </div>
        )}
      </article>

      <BlogNavigation
        feed={feed}
        post={post}
        isPublished={isPublished}
      />

    </div>
    )
  }

  return (
    <Container
      title={title + blogPost?.meta?.title}
      description={post?.teaser}
      image={hasImage}
      date={publishDate}
      robots={isPublished ? "follow, index" : "noindex"
    }>
      <BlogStyles>
        {displayPost ? <RenderBlogPost/> : <LoadingTriangle />}
      </BlogStyles>
    </Container>
  )
}

export default Post