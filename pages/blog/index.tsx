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
    '.categoryWrapper': {
      display: 'flex',
      flexDirection: 'row',
    },
    '.category': {
      marginBottom: '.5rem',
      fontFamily: 'var(--font-secondary)',
      fontSize: 11,
      textTransform: 'uppercase',
      color: 'var(--color-primary)',
      textDecoration: 'none',
      '&.featured': {
        marginRight: '1rem',
      },
      '&.active': {
        borderBottom: '2px solid var(--color-primary)',
      },
      '&:before': {
        content: '"#"',
      },
      '&.all, &.featured': {
        '&:before': { content: '""' },
      },
    },
    '.blogListHeading': {
      fontFamily: 'var(--font-secondary)',
      fontWeight: 400,
      lineHeight: '2.2rem',
      a: {
        color: 'var(--color-heading)',
        textDecoration: 'none',
        display: 'flex',
        width: '100%',
      },
      '@media (max-width: 768px)': {
        lineHeight: '1.6rem',
      },
    },
    p: {
      marginBottom: '2rem',
      fontFamily: 'var(--font-tertiary)',
      fontSize: 22,
      lineHeight: '2rem',
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
    },
    '.postTeaser': {
      position: 'relative',
      '.blogListHeading': {
        margin: '.5rem 0 .8rem',
        color: 'var(--color-heading)',
        fontSize: 32,
        textDecoration: 'none',
        a: {
          color: 'var(--color-heading)',
          textDecoration: 'none',
          border: 'none',
          '@media (min-width: 1025px)': {
            '&:hover': {
              textDecoration: 'underline',
            },
          },
        },
        '@media (max-width: 768px)': {
          fontSize: 28,
        },
        '.postStatsDivider': {
          borderColor: 'var(--color-accent)',
        },
      },
      '.teaser': {
        margin: '.5rem 0 1rem',
        color: 'var(--color-gray)',
        fontSize: 16,
        fontStyle: 'italic',
        lineHeight: '1.25rem',
        '@media(max-width: 1024px)': {
          margin: 0,
          padding: 0,
          fontSize: 14,
        },
      },
      '&:hover': {
        '.postStatsDivider': {
          '@media (min-width: 1025px)': {
            borderColor: 'var(--color-accent-gray)',
            transition: 'border-color 0.5s ease-in-out',
          },
        },
      },
    },
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
