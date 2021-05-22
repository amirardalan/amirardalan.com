import React, { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head'
import Login from '../../components/Login'
import prisma from '../../lib/prisma'
import ReactMarkdown from 'react-markdown'
import LoadingTriangle from '../../components/LoadingTriangle'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
    })
  ])
  return { props: { post, feed } }
}


async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/blog')
}
async function unPublishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/unpublish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/blog/drafts')
}
async function editPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/blog/create/${id}`, {
    method: 'GET',
  })
  await Router.push(`/blog/edit?pid=${id}`)
}
async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/blog/drafts')
}


const Post = (props: any) => {

  // Post Controls Deletion Confirmation
  const [showConfirmation, setShowConfirmation] = useState(false)
  const confirmOnClick = () => setShowConfirmation(true)
  const cancelOnClick = () => setShowConfirmation(false)
  const RenderDeleteConfirmation = () => (
    <div className="controlsConfirm">
      Are you sure?
      <div>
        <span
          className="confirmLink"
          onClick={() => deletePost(props.post.id)}
        >
          Yes
        </span>
        <span
          className="confirmLink"
          onClick={cancelOnClick}
        >
          Cancel
        </span>
      </div>
    </div>
  )

  const [session, loading] = useSession()
  if (loading) {
    return <div className="center"><LoadingTriangle /></div>
  }
  const userHasValidSession = Boolean(session)
  let title = props.post.title
  if (!props.post.published) {
    title = `${title} (Draft)`
  }

  // Publish Date Formatter
  const formatDate = [
    props.post.publishedAt.toLocaleDateString("en-US", { month: 'long' }) ,
    props.post.publishedAt.toLocaleDateString("en-US", { day: 'numeric' })+',',
    props.post.publishedAt.toLocaleDateString("en-US", { year: 'numeric' })
  ]
  const postDate = formatDate.join(' ')

  // Read Time Calculator
  const text = props.post.content
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  const readTime = time + ' ' + 'min read'

  // Next, Prev Post Navigation
  const published : Boolean = props.post.published
  const total : number = props.feed.length
  const current : any = props.post.id
  const arr : Array<any> = props.feed
  const first = (arr[0].id == current && published) ? true : false
  const last = (arr[total - 1].id == current && published) ? true : false
  const index = arr.findIndex(x => x.id === current)
  const prevTitle = (!first && published) ? arr[index - 1].title : null
  const nextTitle = (!last && published) ? arr[index + 1].title : null
  const prevLink = (!first && published) ? `/blog/${encodeURIComponent(arr[index - 1].slug)}` : '#'
  const nextLink = (!last && published) ? `/blog/${encodeURIComponent(arr[index + 1].slug)}` : '#'

  const RenderPrevLink = () => (
    <Link href={prevLink}><a>← {prevTitle}</a></Link>
  )
  const RenderNextLink = () => (
    <Link href={nextLink}><a>{nextTitle} →</a></Link>
  )
  const RenderDraftBreadcrumb = () => (
    <Link href="/blog/drafts"><a>Drafts</a></Link>
  )

  return (
    <>
      <Head>
        <title>Amir Ardalan | {title}</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          { !published ? <RenderDraftBreadcrumb /> : null}
          <span>{title}</span>
        </nav>

        <Login />
        
        <div className="postFull">

          <h2>{title}</h2>
          <small className="postDetails">
            <span>By {props?.post?.author?.name || 'Unknown author'} • {postDate} • {readTime}</span>
          </small>

          <ReactMarkdown children={props.post.content} />

          <div className="controlsPost">
            { !props.post.published && userHasValidSession && (
              <button className="buttonCompact" onClick={() => publishPost(props.post.id)}>Publish</button>
            )}
            { props.post.published && userHasValidSession && (
              <button className="buttonCompact" onClick={() => unPublishPost(props.post.id)}>Un-Publish</button>
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
          <div className="prevLink" aria-label={prevTitle}>
            { !first && published ? <RenderPrevLink /> : null }
          </div>
          <div className="nextLink" aria-label={nextTitle}>
            { !last && published ? <RenderNextLink /> : null }
          </div>
        </div>
      </div>
    </>
  )
}

export default Post