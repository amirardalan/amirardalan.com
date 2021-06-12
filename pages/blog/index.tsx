import React from 'react'
import BlogLayout from '@/components/BlogLayout'
import sortBlogPosts from '@/utils/sortBlogPosts'
import Head from 'next/head'

import BlogPost, { PostProps } from '@/components/BlogPost'
import { blog } from '@/data/content'
import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'


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
    return { props: { feed, data: blog } }
  } catch {
    return { props: { feed: [] } }
  }
}

type Props = {
  data: any
  feed: PostProps[]
  toggleTheme: Function
}

const Blog: React.FC<Props> = ({data, feed, toggleTheme}) => {

  // Post Feed Error Handling
  const showFeedError = (feed.length === 0) ? true : false
  const FeedNotFound = () => (
    <span>{data.error.database}</span>
  )
  
  return (
    <BlogLayout toggleTheme={toggleTheme}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <span>{data.breadcrumb}</span>
        </nav>

        <div>
          { showFeedError ? <FeedNotFound /> : null }
          {feed.sort(sortBlogPosts).reverse().map((post: any) => (
            <div
              key={post.id}
              className="post"
            >
              <BlogPost post={post} />
            </div>
          ))}
        </div>

      </div>
    </BlogLayout>
  )
}

export default Blog