import React, { useState } from 'react'
import Router from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head'
import BlogAdmin from '../../components/BlogAdmin'
import prisma from '../../lib/prisma'
import ReactMarkdown from 'react-markdown'
import BlogSyntaxHighlight from '../../components/BlogSyntaxHighlight'

// Generate Static Paths for all posts
export const getStaticPaths: GetStaticPaths = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  })
  const paths = feed.map((post) => ({
    params: { slug: post.slug }
  }))

  return { paths, fallback: 'blocking' }
}

// Request post data from DB
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

  // Check if user has valid session
  const [session] = useSession()
  const userHasValidSession = Boolean(session)

  // Check if post is published
  const isPublished : Boolean = (props.post.published) ? true : false
  // Generate a label for Publish/Unpublish button
  const publishLabel = isPublished ? 'Unpublish' : 'Publish'
  // Set the redirect for after Publish/Unpublish
  const publishRoute = isPublished ? '/blog' : '/blog/drafts'

  // Publish/Unpublish post
  async function publishPost(id: number, published: boolean): Promise<void> {
    await fetch(`/api/publish/${id}?published=${published}`, {
      method: 'PUT',
    })
    await Router.push(publishRoute)
  }
  // Edit post
  async function editPost(id: number): Promise<void> {
    await fetch(`/blog/edit/${id}`, {
      method: 'PUT',
    })
    await Router.push(`/blog/edit/${id}`)
  }
  // Delete post
  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    Router.push(publishRoute)
  }

  // Check if draft and render breadcrumb and append title
  const RenderBreadcrumb = () => (
    <Link href="/blog/drafts">
      <a>Drafts</a>
    </Link>
  )
  let title = props.post.title
  if (!isPublished) {
    title = `${title} (Draft)`
  }

  // Format Publish Date
  const formatDate = [
    props.post.publishedAt.toLocaleDateString("en-US", { month: 'long' }) ,
    props.post.publishedAt.toLocaleDateString("en-US", { day: 'numeric' })+',',
    props.post.publishedAt.toLocaleDateString("en-US", { year: 'numeric' })
  ]
  const postDate = formatDate.join(' ')

  // Get current post data
  const total : number = props.feed.length
  const current : number = props.post.id
  
  // Sort the Posts by ID
  function compare( a:any, b:any) {
    if ( a.id < b.id ) return -1
    if ( a.id > b.id ) return 1
    return 0;
  }
  const arr : Array<any> = props.feed ? props.feed : null
  const arrSorted = arr.sort(compare)

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
  const RenderPrevLink = () => ( <Link href={prevLink} aria-label={prevTitle}><a>← {prevTitle}</a></Link> )
  const RenderNextLink = () => ( <Link href={nextLink} aria-label={nextTitle}><a>{nextTitle} →</a></Link> )

  // Handle state and rendering for post deletion confirmation
  const [showConfirmation, setShowConfirmation] = useState(false)
  const confirmOnClick = () => setShowConfirmation(true)
  const cancelOnClick = () => setShowConfirmation(false)
  const RenderDeleteConfirmation = () => (
    <div className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink delete" onClick={() => deletePost(current)}>
          Confirm Delete
        </span>
        <span>•</span>
        <span className="confirmLink close" onClick={cancelOnClick}>
          Cancel
        </span>
      </div>
    </div>
  )

  // Calculate estimated read time
  const text = props.post.content
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  const readTime = time + ' ' + 'min read'

  return (
    <>
      <Head>
        <title>{title} – Amir Ardalan</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          { !isPublished ? <RenderBreadcrumb /> : null}
          <span>{title}</span>
        </nav>

        <BlogAdmin />
        
        <div className="post postFull">

          <h2>{title}</h2>
          <div className="postDetails">
            By {props?.post?.author?.name || 'Unknown author'} • {postDate} • {readTime}
          </div>

          <ReactMarkdown components={BlogSyntaxHighlight} children={props.post.content} />

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

            { showConfirmation ? <RenderDeleteConfirmation /> : null }

          </div>
        </div>

        <div className="nextPrevControls">
          <div className="prevLink">
            { errHandlePrev ? <RenderPrevLink /> : null }
          </div>
          <div className="nextLink">
            { errHandleNext ? <RenderNextLink /> : null }
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Post