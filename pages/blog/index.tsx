import React, { useState } from 'react'
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
    })
    return { props: { feed, data: blog } }
  } catch {
    return { props: { feed: [] } }
  }
}

type Props = {
  data: any
  feed: PostProps[]
}

const Blog: React.FC<Props> = ({ data, feed }) => {

  // Post Feed Error Handling
  const showFeedError = feed.length <= 0
  const FeedNotFound = () => (
    <span>{data.error.database}</span>
  )
  
  // Search Posts
  const [search, setSearch] = useState('')
  const filteredPosts = search.length === 0
    ? feed
    : feed.filter(data => 
      data?.title?.toLowerCase()
      .includes(search.toLowerCase()))
  
  return (
    <BlogLayout>
      <Head>
        <title>{data.meta.title}</title>
      </Head>
      <div className="blog">

        <nav className="breadcrumbs">
          <span aria-label={breadcrumb.blog}>
            {breadcrumb.blog}
          </span>
        </nav>

        <input
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          { showFeedError ? <FeedNotFound /> : null }
          {filteredPosts.sort(sortBlogPosts).reverse().map((post) => (
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