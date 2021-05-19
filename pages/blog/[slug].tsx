import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Login from '../../components/Login'
import prisma from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import { PostProps } from '../../components/Post'
import { useSession } from 'next-auth/client'
import ReactMarkdown from 'react-markdown'
import { useTheme } from '@emotion/react'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const post = await prisma.post.findFirst({
    where: {
      slug: String(params?.slug),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: post,
  }
}

async function publishPost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/blog')
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
  Router.push('/blog')
}


const Post: React.FC<PostProps> = (props) => {

  const theme : any = useTheme()

  const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  // Publish Date Formatter
  const formatDate = [
    props.publishedAt.toLocaleDateString("en-US", { month: 'long' }) ,
    props.publishedAt.toLocaleDateString("en-US", { day: 'numeric' })+',',
    props.publishedAt.toLocaleDateString("en-US", { year: 'numeric' })
  ]
  const postDate = formatDate.join(' ')

  // Read Time Calculator
  const text = props.content
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  const readTime = time + ' ' + 'min read'

  // Post Controls Deletion Confirmation
  const [showConfirmation, setShowConfirmation] = React.useState(false)
  const confirmOnClick = () => setShowConfirmation(true)
  const cancelOnClick = () => setShowConfirmation(false)
  const Confirmation = () => (
    <div className="controlsConfirm">
      Are you sure?
      <div>
        <span
          className="confirmLink"
          onClick={() => deletePost(props.id)}
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

  return (
    <div className="blog">

      <nav className="breadcrumbs">
        <Link href="/">Home</Link>
        <span css={{ margin: '0 10px 0 10px' }}>/</span>
        <Link href="/blog">Blog</Link>
        <span css={{ margin: '0 10px 0 10px' }}>/</span>
        <span>{title}</span>
      </nav>

      <Login />
      
      <div className="postFull">

        <h2>{title}</h2>
        <small className="postDetails">
          <span>By {props?.author?.name || 'Unknown author'} • {postDate} • {readTime}</span>
        </small>

        <ReactMarkdown children={props.content} />

        <div className="controlsPost">
          {!props.published && userHasValidSession && postBelongsToUser && (
            <button className="buttonCompact" onClick={() => publishPost(props.id)}>Publish</button>
          )}
          { userHasValidSession && postBelongsToUser && (
            <button className="buttonCompact" onClick={() => editPost(props.id)}>Edit</button>
          )}
          { userHasValidSession && postBelongsToUser && (
            <button className="buttonCompact delete" onClick={confirmOnClick}>Delete</button>
          )}

          { showConfirmation ? <Confirmation /> : null }

        </div>
        
      </div>
    </div>
  )
}

export default Post