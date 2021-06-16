import React from 'react'
import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import calculateReadTime from '@/utils/calculateReadTime'


export type PostProps = {
  post: object
  nav: object
  id: number
  slug: string
  publishedAt: Date
  title: string
  teaser: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {

  const publishDate = formatDate(post.publishedAt)
  const postReadTime = calculateReadTime(post.content)

  return (
    <div className="blog postTeaser">
      <h2>
        <Link
          href={`/blog/${post.slug}`}
          aria-label={post.title}
        >
          {post.title}
        </Link>
      </h2>
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}>
          <div className="postDetails">
            {publishDate} • {postReadTime}
          </div>
        </div>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post