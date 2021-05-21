import React, { useState } from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head'
import Login from '../../components/Login'
import prisma from '../../lib/prisma'
import { PostProps } from '../../components/Post'
import ReactMarkdown from 'react-markdown'
import LoadingTriangle from '../../components/LoadingTriangle'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const [post, nav] = await prisma.$transaction([
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
      include: {
        author: {
          select: { name: true },
        },
      },
    })
  ])
  return { props: { post, nav }}
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
  await Router.push('/blog/create')
}
async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push('/blog/drafts')
}


const Post = (props: any) => {

  console.log(typeof props.post)

  // Post Controls Deletion Confirmation
  const [showConfirmation, setShowConfirmation] = useState(false)
  const confirmOnClick = () => setShowConfirmation(true)
  const cancelOnClick = () => setShowConfirmation(false)
  const Confirmation = () => (
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
    return <div><LoadingTriangle /></div>
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

  return (
    <>
      <Head>
        <title>Amir Ardalan | {title}</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
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

            { showConfirmation ? <Confirmation /> : null }

          </div>
          
          <div>
              <div>next/prev</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post