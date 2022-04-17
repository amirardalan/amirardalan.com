import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import BlogPostFilter from '@/components/BlogPostFilter'
import { blog } from '@/data/content'

import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'
export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await prisma.post.findMany({ where: { published: true } })
    return { props: { feed: JSON.parse(JSON.stringify(feed)), content: blog } }
  } catch { return { props: { feed: [] } } }
}



const Blog = ({ content, feed }) => {
  
  return (
    <Container title={content.meta.title} description={content.meta.description}>
      <BlogStyles>
        <main className="blog">
          <BlogPostFilter feed={feed} />
        </main>
      </BlogStyles>
    </Container>
  )
}

export default Blog
