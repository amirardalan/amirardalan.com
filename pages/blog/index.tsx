import BlogStyles from '@/components/BlogStyles'
import Container from '@/components/Container'
import BlogPostFilter from '@/components/BlogPostFilter'

import { blog } from '@/data/content'
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

const Blog = ({ data, feed }) => {
  
  return (
    <Container title={data.meta.title} description={data.meta.description}>
      <BlogStyles>
        <div className="blog">

          <BlogPostFilter feed={feed} />

        </div>
      </BlogStyles>
    </Container>
  )
}

export default Blog