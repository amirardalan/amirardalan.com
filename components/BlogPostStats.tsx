import { FC } from 'react';
import PostViewCount from '@/components/PostViewCount';
import LikeCount from '@/components/LikeCount';
import calculateReadTime from '@/utils/calculateReadTime';
import { PostProps } from '@/types/post';
import { css } from '@emotion/react';
import Link from 'next/link';

type BlogPostStatsProps = {
  post: PostProps;
  isFeatured?: boolean;
};

const styleBlogPostStats = css({
  fontFamily: 'var(--font-secondary)',
  color: 'var(--color-gray)',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100%',
  textTransform: 'uppercase',
  fontSize: 11,
  paddingBottom: '.5rem',
  '.postStatsDivider': {
    transition: 'border-color 0.25s ease-in-out',
    borderBottom: '1px solid var(--color-accent)',
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: '.1rem 1rem 0 1rem',
  },
  '.featured': {
    marginRight: '.5rem',
    display: 'flex',
    '@media (max-width: 360px)': {
      display: 'none',
    },
  },
  postCategory: {
    color: 'var(--color-primary)',
    '&:hover': {
      textDecoration: 'none',
    },
    '&::before': {
      content: '"#"',
    },
  },
  '.likesAndViews': {
    width: 'fit-content',
    display: 'flex',
    justifyContent: 'end',
  },
});

const BlogPostStats: FC<BlogPostStatsProps> = ({ post, isFeatured }) => {
  const postReadTime = calculateReadTime(post.content);

  return (
    <div css={styleBlogPostStats} className="blogPostStats">
      {isFeatured && (
        <div className="featured" aria-label="Featured Post">
          Featured
        </div>
      )}
      <Link className="postCategory" href={`/blog?category=${post.category}`}>
        {post.category}
      </Link>
      <span className="readTime">{postReadTime}</span>
      <div className="postStatsDivider"></div>
      <div className="likesAndViews">
        <PostViewCount slug={post.slug} />
        <LikeCount id={post.id} likes={post.likes} />
      </div>
    </div>
  );
};

export default BlogPostStats;
