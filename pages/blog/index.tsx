import React from 'react'
import Link from 'next/link'
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
    <div className="blog">

      <nav className="breadcrumbs">
        <Link href="/">Home</Link>
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
  )
}

export default Blog