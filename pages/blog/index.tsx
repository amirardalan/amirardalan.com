import React from 'react'
import Head from 'next/head'
import BlogAdmin from '../../components/BlogAdmin'
import { GetStaticProps } from 'next'
import prisma from '../../lib/prisma'
import BlogPost, { PostProps } from '../../components/BlogPost'


export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    })
    return { props: { feed } }
  } catch {
    return { props: { feed: [] } }
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props: any) => {

  // Post Feed Error Handling
  const feed = props.feed
  const showFeedError = (feed.length === 0) ? true : false
  const FeedNotFound = () => (
    <span>Database Error: Posts Could not be loaded. :(</span>
  )
  
  return (
    <>
      <Head>
        <title>Amir Ardalan | Blog</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <span>Blog</span>
        </nav>

        <BlogAdmin />

        <div>
          { showFeedError ? <FeedNotFound /> : null }
          {feed.reverse().map((post) => (
            <div
              key={post.id}
              className="post"
            >
              <BlogPost post={post} />
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default Blog