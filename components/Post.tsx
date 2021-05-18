import React from 'react'
import Router from 'next/router'
import { useTheme } from '@emotion/react'


export type PostProps = {
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
  
  const theme : any = useTheme()
  // const authorName = post.author ? post.author.name : "Unknown author"

  return (
    <div onClick={() => Router.push("/blog/[slug]", `/blog/${post.slug}`)}>
      <h2 css={{
        '&:hover': { textDecoration: 'underline' },
        margin: '2rem 0 0 0' }}>
        {post.title}
      </h2>
      <small css={{
        color: theme.colors.footer,
        margin: '.5rem 0 1.5rem',
        display: 'block' }}>
        <span>{ post.publishedAt.toLocaleDateString("en-US", { month: 'long' }) }, </span>
        <span>{ post.publishedAt.toLocaleDateString("en-US", { day: 'numeric' }) } </span>
        <span>{ post.publishedAt.toLocaleDateString("en-US", { year: 'numeric' }) }</span>
      </small>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post