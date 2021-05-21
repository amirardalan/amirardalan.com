import React, { useContext } from 'react'
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
    <div className="postTeaser">
      <h2 aria-label={post.title} onClick={() => Router.push("/blog/[slug]", `/blog/${post.slug}`)}>{post.title}</h2>
      <small>
        <span className="postDetails">By {post?.author?.name || 'Unknown author'} • {postDate} • {readTime}</span>
      </small>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post