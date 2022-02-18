import Head from 'next/head'
import { breadcrumb, blog } from '@/data/content'
import BlogLayout from '@/components/BlogLayout'
import Container from '@/components/Container'
import BlogPostFilter from '@/components/BlogPostFilter'

import { PostProps } from '@/components/BlogPost'
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
  
  return (
    <Container>
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

          <BlogPostFilter feed={feed} />

        </div>
      </BlogLayout>
    </Container>
  )
}

export default Blog