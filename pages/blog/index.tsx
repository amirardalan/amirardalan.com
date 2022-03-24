import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'

import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import BlogPostFilter from '@/components/BlogPostFilter'
import { blog } from '@/data/content'


const Blog = ({ data, feed }) => {
  
  return (
    <Container title={data.meta.title} description={data.meta.description}>
      <BlogStyles>
        <main className="blog">
          <BlogPostFilter feed={feed} />
        </main>
      </BlogStyles>
    </Container>
  )
}

export default Blog


export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await prisma.post.findMany({ where: { published: true } })
    return { props: { feed: JSON.parse(JSON.stringify(feed)), data: blog } }
  } catch { return { props: { feed: [] } } }
}
