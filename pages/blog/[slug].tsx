import React, { useState } from 'react'
import { renderToString } from 'react-dom/server'
import { useSession } from 'next-auth/client'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import BlogLayout from '@/components/BlogLayout'
import sortBlogPosts from '@/utils/sortBlogPosts'
import ReadTime from '@/components/ReadTime'
import FormatDate from '@/components/FormatDate'

import ReactMarkdown from 'react-markdown'
import BlogSyntaxHighlight from '@/components/BlogSyntaxHighlight'
import gfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import link from 'rehype-autolink-headings'

import { GetStaticProps, GetStaticPaths } from 'next'
import prisma from '@/lib/prisma'

// Generate static paths based on published post slugs
export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  })
  const paths = feed.map((post) => ({
    params: { slug: post.slug }
  }))

  return { paths, fallback: 'blocking' }
}

// Request post data from database
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
        slug: true,
      },
    })
  ])
  return { props: { post, feed } }
}

const Post = (props: any) => {

  const [session] = useSession()
  const userHasValidSession = Boolean(session)

  const isPublished : Boolean = props.post.published ? true : false
  const publishLabel = isPublished ? 'Unpublish' : 'Publish'
  const redirect = isPublished ? '/blog/drafts' : '/blog'

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

  const ShowBreadcrumb = () => (
    <Link href="/blog/drafts">
      <a>Drafts</a>
    </Link>
  )
  let title = props.post.title
  if (!isPublished) {
    title = `${title} (Draft)`
  }

  // Get current post data
  const total : number = props.feed.length
  const current : number = props.post.id

  // Sort Posts based on @/utils/sortBlogPosts
  const arr : Array<any> = props.feed ? props.feed : null
  const arrSorted = arr.sort(sortBlogPosts)

  // Error Handling
  const first = (arr[0].id == current && isPublished) ? true : false
  const last = (arr[total - 1].id == current && isPublished) ? true : false
  const only = (first && last)
  const errHandlePrev = (isPublished && !first && !only)
  const errHandleNext= (isPublished && !last && !only)

  // Generate next/prev post navigation and conditionally render the links
  const index = arrSorted.findIndex(x => x.id === current)
  const prevTitle = errHandlePrev ? arr[index - 1].title : null
  const nextTitle = errHandleNext ? arr[index + 1].title : null
  const prevLink = errHandlePrev ? `/blog/${encodeURIComponent(arr[index - 1].slug)}` : '#'
  const nextLink = errHandleNext ? `/blog/${encodeURIComponent(arr[index + 1].slug)}` : '#'
  const ShowPrevLink = () => 
    <Link href={prevLink} aria-label={prevTitle}><a>← {prevTitle}</a></Link>
  const ShowNextLink = () => 
    <Link href={nextLink} aria-label={nextTitle}><a>{nextTitle} →</a></Link>

  // Handle state and rendering for post deletion confirmation
  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  const confirmOnClick = () => setShowDeletionConfirmation(true)
  const cancelOnClick = () => setShowDeletionConfirmation(false)
  const DeletionConfirmation = () => (
    <div className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink delete" onClick={() => deletePost(current)}>
          Confirm
        </span>
        <span>•</span>
        <span className="confirmLink close" onClick={cancelOnClick}>
          Cancel
        </span>
      </div>
    </div>
  )

  const postDate = renderToString(<FormatDate date={props.post.publishedAt} />)
  const postReadTime = renderToString(<ReadTime content={props.post.content} />)

  // Exclude unpublished drafts from search engine crawlers
  const disallowRobots = ( <meta name="robots" content="noindex"></meta> )

  return (
    <BlogLayout>
      <Head>
        <title>{title} – Amir Ardalan</title>
        {isPublished ? null : disallowRobots }
      </Head>
      <div className={isPublished ? 'blog' : 'blog admin'}>

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          { !isPublished ? <ShowBreadcrumb /> : null}
          <span>{title}</span>
        </nav>
        
        <div className="post postFull">

          <h2 aria-label={`${title}`}>
            {title}
          </h2>
          <div
            className="postDetails"
            aria-label={`${postDate} • ${postReadTime}`}
          >
            By {props?.post?.author?.name || 'Unknown author'} • {postDate} • {postReadTime}
          </div>

          <ReactMarkdown
            rehypePlugins={[ [gfm], [rehypeSlug], [link] ]}
            components={BlogSyntaxHighlight}
            children={props.post.content}
          />

          <div className="controlsPost">
            { userHasValidSession && (
              <button
                className="buttonCompact"
                onClick={() => publishPost(props.post.id, props.post.published)}>
                {publishLabel}
              </button>
            )}
            { userHasValidSession && (
              <button
                className="buttonCompact"
                onClick={() => editPost(props.post.id)}>
                Edit
              </button>
            )}
            { userHasValidSession && (
              <button
                className="buttonCompact delete"
                onClick={confirmOnClick}>
                Delete
              </button>
            )}

            { showDeletionConfirmation ? <DeletionConfirmation /> : null }

          </div>
        </div>

        <div className="nextPrevControls">
          <div className="prevLink">
            { errHandlePrev ? <ShowPrevLink /> : null }
          </div>
          <div className="nextLink">
            { errHandleNext ? <ShowNextLink /> : null }
          </div>
        </div>
        
      </div>
      </BlogLayout>
  )
}

export default Post