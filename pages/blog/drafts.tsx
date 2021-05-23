import React from 'react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head'
import Login from '../../components/Login'
import Post, { PostProps } from '../../components/Post'
import prisma from '../../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    }
  })
  return {
    props: { drafts },
  }
}

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  
  let draftsList = null;

  const [session] = useSession()

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    draftsList = (
      <div className="blog">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          <span>Drafts</span>
        </nav>

        <Login />

        <div className="drafts">
          <h1>Drafts</h1>
          <main>
            {props.drafts.reverse().map((post) => (
              <div
                key={post.id}
                className="postDraft"
              >
                <Post post={post} />
              </div>
            ))}
          </main>
        </div>

      </div>
    )
  }
  return (
    <>
      <Head>
        <title>Amir Ardalan | Drafts</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      {draftsList}
    </>
  )
}

export default Drafts