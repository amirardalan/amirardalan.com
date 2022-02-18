import { useSession } from 'next-auth/client'
import { useState } from 'react'
import Router from 'next/router'

import Container from '@/components/Container'
import BlogLayout from '@/components/BlogLayout'
import Avatar from '@/components/Avatar'
import BlogNavigation from '@/components/BlogNavigation'
import calculateReadTime from '@/utils/calculateReadTime'
import formatDate from '@/utils/formatDate'
import Link from 'next/link'
import Markdown from '@/components/Markdown'

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

  const [session] = useSession()
  const userHasValidSession = Boolean(session)

  const isPublished : Boolean = post.published
  const publishLabel = isPublished ? `${admin.controls.unpublish}` : `${admin.controls.publish}`
  const redirect = isPublished ? '/blog/drafts' : '/blog'

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

  let title = post.title
  if (!isPublished) {
    title = `${data.title.draft} ${title}`
  }

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

  return (
    <Container
      title={title}{...data.meta.title}
      description={post.teaser}
      date={publishDate}
      robots={isPublished ? "follow, index" : "noindex"
    }>
      <BlogLayout>
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
            <p className="teaser">{post.teaser}</p>
            <div className="postDetails" aria-label={`${editDate} • ${postReadTime}`}>
              <div className="author">
                <span className="avatar">
                  <Avatar height="18" width="18" />
                </span>
                {post?.author?.name || 'Unknown author'}
              </div>
              {isEdited ? `Updated: ${editDate}`: publishDate } • {postReadTime}
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
      </BlogLayout>
    </Container>
  )
}

export default Post