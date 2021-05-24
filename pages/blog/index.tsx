import React, { useState } from 'react'
import Head from 'next/head'
import SignedIn from '../../components/SignedIn'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import Post, { PostProps } from '../../components/Post'


export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const feed = await prisma.post.findMany({
      where: { published: true },
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

        <SignedIn />

        <div>
          { showFeedError ? <FeedNotFound /> : null }
          {feed.reverse().map((post) => (
            <div
              key={post.id}
              className="post"
            >
              <Post post={post} />
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default Blog