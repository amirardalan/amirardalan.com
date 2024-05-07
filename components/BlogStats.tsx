import { FC } from 'react';
import { css } from '@emotion/react';
import useTotalLikes from '@/hooks/useTotalLikes';
import formatNumber from '@/utils/formatNumber';
import { BlogStatsTypes } from '@/types/blog';
import { blogContent } from '@/data/content';

type BlogStatsProps = {
  feed: BlogStatsTypes[];
  filteredPosts: BlogStatsTypes[];
};

const BlogStats: FC<BlogStatsProps> = ({ feed, filteredPosts }) => {
  const filterActive = filteredPosts.length < feed.length;
  const postCount = filterActive ? filteredPosts.length : feed.length;
  const postsText = postCount === 1 ? 'post' : 'posts';
  const filteredLikes = filteredPosts.reduce((acc, post) => {
    if (post.published) {
      return acc + (post.likes || 0);
    }
    return acc;
  }, 0);
  const { totalLikesCount, error } = useTotalLikes();
  const totalLikes = totalLikesCount.likes;
  const likesText =
    (filteredLikes | totalLikesCount.likes) === 1 ? 'like' : 'likes';

  const styleBlogStatsWrapper = css({
    fontFamily: 'var(--font-secondary)',
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
    ul: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: '.2rem',
    },
    '.blogStats': {
      marginBottom: '1.25rem',
      '@media (max-width: 1024px)': {
        marginBottom: '1rem',
      },
    },
    '.postsCount, .likesCount': {
      color: 'var(--color-gray)',
      '.text': {
        color: 'var(--color-accent-gray)',
      },
      '@media (max-width: 480px)': {
        fontSize: 12,
      },
    },
    '.likesCount': {
      marginLeft: '.75rem',
    },
    '.divider': {
      color: 'var(--color-accent-lighter)',
      marginLeft: '.75rem',
    },
    li: {
      lineHeight: '1rem',
      display: 'inline',
      marginLeft: '1rem',
      span: {
        marginLeft: '.25rem',
      },
      '@media(max-width: 1024px)': {
        marginBottom: '.3rem',
      },
      '&:first-of-type': {
        marginLeft: 0,
      },
      '.number': {
        marginRight: '.3rem',
        fontSize: 18,
      },
      '.text': {
        fontSize: 12,
        color: 'var(--color-gray)',
      },
    },
  });

  return (
    <div css={styleBlogStatsWrapper}>
      <h1 className="pageHeading">{blogContent.heading}</h1>
      <ul className="blogStats">
        <li className="postsCount">
          {postCount}
          <span className="text">{postsText}</span>
        </li>
        <li className="divider">/</li>
        {error || !totalLikes || totalLikes === 0 ? (
          <li className="likesCount">
            {!filteredLikes ? formatNumber(filteredLikes) : '0'}
            <span className="text">{likesText}</span>
          </li>
        ) : (
          <li className="likesCount">
            {formatNumber(filterActive ? filteredLikes : totalLikes)}
            <span className="text">{likesText}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default BlogStats;
