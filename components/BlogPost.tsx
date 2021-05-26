import React from 'react'
import Router from 'next/router'


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

  // Publish Date Formatter
  const formatDate = [
    post.publishedAt.toLocaleDateString("en-US", { month: 'long' }) ,
    post.publishedAt.toLocaleDateString("en-US", { day: 'numeric' })+',',
    post.publishedAt.toLocaleDateString("en-US", { year: 'numeric' })
  ]
  const postDate = formatDate.join(' ')

  // Read Time Calculator
  const text = post.content
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  const readTime = time + ' ' + 'min read'

  return (
    <div className="blog postTeaser">
      <h2
        onClick={() => Router.push("/blog/[slug]", `/blog/${post.slug}`)}
        aria-label={post.title}>
        {post.title}
      </h2>
      <div
        className="postDetails"
        aria-label={`${postDate} • ${readTime}`}>
          <div className="postDetails">
            By {post?.author?.name || 'Unknown author'} • {postDate} • {readTime}
          </div>
        </div>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post