import { FC } from 'react';
import PostViewCount from '@/components/PostViewCount';
import LikeCount from '@/components/LikeCount';
import calculateReadTime from '@/utils/calculateReadTime';
import { PostProps } from '@/types/post';
import { css } from '@emotion/react';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';

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
  '@media (max-width: 480px)': {
    flexDirection: 'column',
    '.statsLeft': {
      borderBottom: '1px solid var(--color-accent)',
    },
  },
  '.postStatsDivider': {
    transition: 'border-color 0.25s ease-in-out',
    borderBottom: '1px solid var(--color-accent)',
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: '.2rem 1rem 0 1rem',
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
  '.featured': {
    marginRight: '.5rem',
    display: 'flex',
    '@media (max-width: 480px)': {
      display: 'none',
    },
  },
  '.postDate': {
    '&::before': {
      content: '"•"',
      margin: '0 .5rem',
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
  const postDate = formatDate(post.publishedAt, 'numeric');

  return (
    <div css={styleBlogPostStats} className="blogPostStats">
      {isFeatured && (
        <div className="featured" aria-label="Featured Post">
          Featured
        </div>
      )}
      <div className="statsLeft">
        <Link className="postCategory" href={`/blog?category=${post.category}`}>
          {post.category}
        </Link>
        <span className="readTime">{postReadTime}</span>
        <span className="postDate">{postDate}</span>
      </div>
      <div className="postStatsDivider"></div>
      <div className="statsRight">
        <div className="likesAndViews">
          <PostViewCount slug={post.slug} />
          <LikeCount id={post.id} likes={post.likes} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostStats;
