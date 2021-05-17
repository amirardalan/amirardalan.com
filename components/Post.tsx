import React from "react"
import Router from "next/router"
import ReactMarkdown from "react-markdown"
import { useTheme } from '@emotion/react'


export type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
  } | null
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const theme : any = useTheme()
  const authorName = post.author ? post.author.name : "Unknown author"
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2 css={{
        '&:hover': { textDecoration: 'underline' },
        margin: '2rem 0 .5rem 0' }}>
        {post.title}
      </h2>
      <small css={{
        color: theme.colors.footer }}>
        By {authorName}
      </small>
      <ReactMarkdown children={post.content} />
    </div>
  )
}

export default Post