import React from 'react'
import Link from 'next/link'
import prisma from '../../lib/prisma'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import { PostProps } from '../../components/Post'
import { useTheme } from '@emotion/react'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {

  const theme : any = useTheme()
  
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <>
      <nav css={{
        display: 'flex',
        flexDirection: 'row',
        color: theme.colors.footer,
        fontSize: '12px'
      }}>
        <Link href="/">Home</Link>
        <span css={{ margin: '0 10px 0 10px' }}>/</span>
        <Link href="/blog">Blog</Link>
        <span css={{ margin: '0 10px 0 10px' }}>/</span>
        <p>{title}</p>
      </nav>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
      </div>
    </>
  )
}

export default Post