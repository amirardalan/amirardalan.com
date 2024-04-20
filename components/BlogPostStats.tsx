import { FC } from 'react';
import PostViewCount from '@/components/PostViewCount';
import LikeCount from '@/components/LikeCount';
import calculateReadTime from '@/utils/calculateReadTime';
import { PostProps } from '@/types/post';
import { css } from '@emotion/react';

type BlogPostStatsProps = {
  post: PostProps;
  isFeatured?: boolean;
};

const styleBlogPostStats = css({
  fontFamily: 'var(--font-secondary)',
  color: 'var(--color-gray)',
  letterSpacing: 1,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100%',
  textTransform: 'uppercase',
  fontSize: 12,
  paddingBottom: '.5rem',
  '.postStatsDivider': {
    transition: 'border-color 0.25s ease-in-out',
    borderBottom: '1px solid var(--color-accent)',
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: '.4rem 1rem 0 1rem',
  },
  '.featured': {
    marginRight: '.5rem',
    display: 'flex',
    '@media (max-width: 360px)': {
      display: 'none',
    },
  },
  '.postCategory': {
    color: 'var(--color-primary)',
    '&::before': {
      content: '"#"',
    },
    '&::after': {
      color: 'var(--color-gray)',
      content: '"•"',
      margin: '0 0.5rem',
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
      <span className="postCategory">{post.category}</span>
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
