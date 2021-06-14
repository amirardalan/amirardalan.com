import React from 'react'
import BlogLayout from '@/components/BlogLayout'
import sortBlogPosts from '@/utils/sortBlogPosts'
import Head from 'next/head'

import BlogPost, { PostProps } from '@/components/BlogPost'
import { breadcrumb, blog } from '@/data/content'
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

const Blog: React.FC<Props> = ({ data, feed }) => {

  // Post Feed Error Handling
  const showFeedError = feed.length <= 0
  const FeedNotFound = () => (
    <span>{data.error.database}</span>
  )
  
  return (
    <BlogLayout>
      <Head>
        <title>{data.meta.title}</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <span>{breadcrumb.blog}</span>
        </nav>

        <div>
          { showFeedError ? <FeedNotFound /> : null }
          {feed.sort(sortBlogPosts).reverse().map((post) => (
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