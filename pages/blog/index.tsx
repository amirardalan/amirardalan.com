import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import BlogPostFilter from '@/components/BlogPostFilter'
import { blogContent } from '@/data/content'

import { GetStaticProps } from 'next'
import prisma from '@/lib/prisma'
export const getStaticProps: GetStaticProps = async () => {
  try {
    const feed = await prisma.post.findMany({ where: { published: true } })
    return { props: { feed: JSON.parse(JSON.stringify(feed)), blog: blogContent } }
  } catch { return { props: { feed: [] } } }
}



const Blog = ({ blog, feed }) => {
  
  return (
    <Container title={blog.meta.title} description={blog.meta.description}>
      <BlogStyles>
        <main className="blog">
          <BlogPostFilter blog={blog} feed={feed} />
        </main>
      </BlogStyles>
    </Container>
  )
}

export default Blog
