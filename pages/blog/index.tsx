import { GetStaticProps } from 'next';
import prisma from '@/lib/prisma';

import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import BlogPostFilter from '@/components/BlogPostFilter';
import { PostProps } from '@/types/post';

import { blogContent } from '@/data/content';

type BlogProps = {
  blog: {
    meta: {
      title: string;
      description: string;
    };
    search: {
      noresult: string;
      placeholder: string;
      clearFilter: string;
      clear: string;
    };
  };
  feed: PostProps[];
};

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  try {
    const feed = await prisma.post.findMany({ where: { published: true } });
    return {
      props: { feed: JSON.parse(JSON.stringify(feed)), blog: blogContent },
    };
  } catch {
    return {
      props: {
        feed: [],
        blog: {
          meta: { title: '', description: '' },
          search: { noresult: '', placeholder: '', clearFilter: '', clear: '' },
        },
      },
    };
  }
};

const Blog = ({ blog, feed }: BlogProps) => {
  return (
    <Container title={blog.meta.title} description={blog.meta.description}>
      <BlogStyles>
        <main className="blog">
          <BlogPostFilter blog={blog} feed={feed} />
        </main>
      </BlogStyles>
    </Container>
  );
};

export default Blog;
