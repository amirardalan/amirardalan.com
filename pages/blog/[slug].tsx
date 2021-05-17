import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
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
    <>
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
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        { userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </>
  )
}

export default Post