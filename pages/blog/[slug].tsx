import React, { useState } from 'react'

import BlogLayout from '@/components/BlogLayout'
import BlogMarkdown from '@/components/BlogMarkdown'
import { renderToString } from 'react-dom/server'
import BlogNavigation from '@/components/BlogNavigation'
import ReadTime from '@/components/ReadTime'
import FormatDate from '@/components/FormatDate'

import { useSession } from 'next-auth/client'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import { blogPost, breadcrumb, admin } from '@/data/content'
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
  return { props: { post, feed, data: blogPost } }
}

const Post = ({ post, feed, data }) => {

  const [session] = useSession()
  const userHasValidSession = Boolean(session)

  const isPublished : Boolean = post.published
  const publishLabel = isPublished ? `${admin.controls.unpublish}` : `${admin.controls.publish}`
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

  let title = post.title
  if (!isPublished) {
    title = `${title} ${data.title.draft}`
  }

  // Handle state and rendering for post deletion confirmation
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

  const postDate = renderToString(<FormatDate date={post.publishedAt} />)
  const postReadTime = renderToString(<ReadTime content={post.content} />)

  // Exclude unpublished drafts from search engine crawlers
  const disallowRobots = ( <meta name="robots" content="noindex"></meta> )

  return (
    <BlogLayout>
      <Head>
        <title>{title}{data.meta.title}</title>
        {isPublished ? null : disallowRobots }
      </Head>
      <div className={isPublished ? 'blog' : 'blog admin'}>

        <nav className="breadcrumbs">
          <Link href="/blog">{breadcrumb.blog}</Link>
          { !isPublished
          ? <Link href="/blog/drafts">
              <a>{breadcrumb.drafts}</a>
            </Link>
          : null }
          <span>{title}</span>
        </nav>
        
        <div className="post postFull">

          <h2 aria-label={`${title}`}>
            {title}
          </h2>
          <div className="postDetails" aria-label={`${postDate} • ${postReadTime}`}>
            By {post?.author?.name || 'Unknown author'} • {postDate} • {postReadTime}
          </div>

          <BlogMarkdown post={post} />

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
      </BlogLayout>
  )
}

export default Post