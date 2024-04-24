import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';
import { css } from '@emotion/react';

import Container from '@/components/Container';
import BlogStyles from '@/components/BlogStyles';
import BlogPostFilter from '@/components/BlogPostFilter';
import { PostProps } from '@/types/post';

import { blogContent } from '@/data/content';

const prisma = new PrismaClient();

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
  const styleBlogWrapper = css({
    '@media (max-width: 1024px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 768px)': {
      padding: '0 2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '0 2rem',
    },
  });

  return (
    <Container title={blog.meta.title} description={blog.meta.description}>
      <BlogStyles>
        <main className="blog" css={styleBlogWrapper}>
          <BlogPostFilter blog={blog} feed={feed} filteredPosts={[]} />
        </main>
      </BlogStyles>
    </Container>
  );
};

export default Blog;
