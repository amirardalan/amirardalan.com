import React, { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head'
import SignedIn from '../../components/SignedIn'
import prisma from '../../lib/prisma'
import ReactMarkdown from 'react-markdown'

// Request post data from DB
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [post, feed] = await prisma.$transaction([
    prisma.post.findFirst({
      where: {
        slug: String(params?.slug),
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

  // Publish post via API route
  async function publishPost(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',
    })
    await Router.push('/blog')
  }
  // Unpublish post via API route
  async function unPublishPost(id: number): Promise<void> {
    await fetch(`/api/unpublish/${id}`, {
      method: 'PUT',
    })
    await Router.push('/blog/drafts')
  }
  // Edit post via API route
  async function editPost(id: number): Promise<void> {
    await fetch(`/blog/edit/${id}`, {
      method: 'PUT',
    })
    await Router.push(`/blog/edit/${id}`)
  }
  // Delete post via API route
  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    // If deleted post was a draft, return to drafts,
    // otherwise, redirect to blog landing
    if (isPublished) {
      Router.push('/blog')
    } else {
      Router.push('/blog/drafts')
    }
  }

  // Check if draft and render breadcrumb
  const RenderBreadcrumb = () => (
    <Link href="/blog/drafts"><a>Drafts</a></Link>
  )

  // Check if draft and set title
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

  // Calculate estimated read time
  const text = props.post.content
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  const readTime = time + ' ' + 'min read'

  // Get current post data
  const total : number = props.feed.length
  const current : any = props.post.id
  const arr : Array<any> = (props.feed) ? props.feed : null

  // Error Handling
  const first = (arr[0].id == current && isPublished) ? true : false
  const last = (arr[total - 1].id == current && isPublished) ? true : false
  const only = (first && last)
  const errHandlePrev = (isPublished && !first && !only)
  const errHandleNext= (isPublished && !last && !only)

  // Generate next/prev post navigation and conditionally render the links
  const index = arr.findIndex(x => x.id === current)
  const prevTitle = (errHandlePrev) ? arr[index - 1].title : null
  const nextTitle = (errHandleNext) ? arr[index + 1].title : null
  const prevLink = (errHandlePrev) ? `/blog/${encodeURIComponent(arr[index - 1].slug)}` : '#'
  const nextLink = (errHandleNext) ? `/blog/${encodeURIComponent(arr[index + 1].slug)}` : '#'
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

  return (
    <>
      <Head>
        <title>Amir Ardalan | {title}</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          { !isPublished ? <RenderBreadcrumb /> : null}
          <span>{title}</span>
        </nav>

        <SignedIn />
        
        <div className="post postFull">

          <h2>{title}</h2>
          <small className="postDetails">
            <span>{postDate} • {readTime}</span>
          </small>

          <ReactMarkdown children={props.post.content} />

          <div className="controlsPost">
            { !isPublished && userHasValidSession && (
              <button className="buttonCompact" onClick={() => publishPost(props.post.id)}>Publish</button>
            )}
            { isPublished && userHasValidSession && (
              <button className="buttonCompact" onClick={() => unPublishPost(props.post.id)}>Unpublish</button>
            )}
            { userHasValidSession && (
              <button className="buttonCompact" onClick={() => editPost(props.post.id)}>Edit</button>
            )}
            { userHasValidSession && (
              <button className="buttonCompact delete" onClick={confirmOnClick}>Delete</button>
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