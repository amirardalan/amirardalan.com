import React from 'react'
import { renderToString } from 'react-dom/server'
import Link from 'next/link'
import FormatDate from '@/components/FormatDate'
import ReadTime from '@/components/ReadTime'


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

  const postDate = renderToString(<FormatDate date={post.publishedAt} />)
  const postReadTime = renderToString(<ReadTime content={post.content} />)

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
        aria-label={`${postDate} • ${postReadTime}`}>
          <div className="postDetails">
            By {post?.author?.name || 'Unknown author'} • {postDate} • {postReadTime}
          </div>
        </div>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post