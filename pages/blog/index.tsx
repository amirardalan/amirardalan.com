import React, { useState } from 'react'
import { useTheme } from '@emotion/react'
import BlogLayout from '@/components/BlogLayout'
import sortBlogPosts from '@/utils/sortBlogPosts'
import Head from 'next/head'
import Image from 'next/image'

import BlogPost, { PostProps } from '@/components/BlogPost'
import { breadcrumb, blog } from '@/data/content'
import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'


export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await prisma.post.findMany({
      where: { published: true },
    })
    return { props: { feed: JSON.parse(JSON.stringify(feed)), data: blog } }
  } catch {
    return { props: { feed: [] } }
  }
}

type Props = {
  data: any
  feed: PostProps[]
}

const Blog: React.FC<Props> = ({ data, feed }) => {

  const theme: any = useTheme()

  const showFeedError = feed.length <= 0
  const FeedNotFound = () => (
    <span>{data.error.database}</span>
  )
  
  const [search, setSearch] = useState('')
  const filteredPosts = search.length === 0
    ? feed
    : feed.filter(data => 
      data?.title?.toLowerCase()
      .includes(search.toLowerCase()))

  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return (
        filteredPosts.sort(sortBlogPosts).reverse().map((post) => (
          <BlogPost key={post.id} post={post} />
        ))
      )
    } else {
        return <span>{data.search.noresult}</span>
    }
  }
  
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

        <div className="searchPosts">
          <input
            type="text"
            placeholder={data.search.placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="icon">
            <Image
              src={theme.icons.search}
              height="23"
              width="23"
              priority
              alt={data.search.placeholder}
              draggable={false}
            />
          </div>
        </div>

        <div>
          {showFeedError
            ? <FeedNotFound />
            : null}
          <div className="post">
            <RenderPosts />
          </div>
        </div>

      </div>
    </BlogLayout>
  )
}

export default Blog