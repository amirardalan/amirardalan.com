import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Login from '../../components/Login'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import Post, { PostProps } from '../../components/Post'


export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return { props: { feed } }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  
  return (
    <>
      <Head>
        <title>Amir Ardalan | Blog</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <span>Blog</span>
        </nav>

        <Login />

        <main>
          {props.feed.reverse().map((post) => (
            <div
              key={post.id}
              className="post"
            >
                <Post post={post} />
            </div>
          ))}
        </main>

      </div>
    </>
  )
}

export default Blog