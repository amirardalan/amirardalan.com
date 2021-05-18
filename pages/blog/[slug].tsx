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


  return (
    <div className="blog">
      <nav css={{
        display: 'flex',
        flexDirection: 'row',
        color: theme.colors.footer,
        fontSize: '12px'
      }}>
        <Link href="/">Home</Link>
        <span css={{ margin: '0 10px 0 10px' }}>/</span>
        <Link href="/blog">Blog</Link>
        <span css={{ margin: '0 10px 0 10px' }}>/</span>
        <p>{title}</p>
      </nav>
      <Login />
      <div className="postFull">
        <h2 css={{ margin: '1.5rem 0 0 0'}}>{title}</h2>
        <small css={{
          margin: '.5rem 0 1.5rem',
          display: 'block',
          color: theme.colors.footer
        }}>
          <span>{ props.publishedAt.toLocaleDateString("en-US", { month: 'long' }) }, </span>
          <span>{ props.publishedAt.toLocaleDateString("en-US", { day: 'numeric' }) } </span>
          <span>{ props.publishedAt.toLocaleDateString("en-US", { year: 'numeric' }) }</span>
        </small>
        <ReactMarkdown children={props.content} />

        <div css={{marginTop: '2rem' }}>
          {!props.published && userHasValidSession && postBelongsToUser && (
            <button className="buttonCompact" onClick={() => publishPost(props.id)}>Publish</button>
          )}
          { userHasValidSession && postBelongsToUser && (
            <button className="buttonCompact" onClick={() => editPost(props.id)}>Edit</button>
          )}
          { userHasValidSession && postBelongsToUser && (
            <button className="buttonCompact delete" onClick={() => deletePost(props.id)}>Delete</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Post