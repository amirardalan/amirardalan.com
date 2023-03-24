import { FC } from 'react';
import { css } from '@emotion/react';
import useTotalLikes from '@/utils/useTotalLikes';
import formatLikeCount from '@/utils/formatLikeCount';

type BlogPost = {
  id: number;
  publishedAt: string;
  editedAt: string;
  slug: string;
  title: string;
  teaser: string;
  content: string;
  category: string;
  featured: boolean;
  published: boolean;
  showEdited: boolean;
  authorId: number;
  likes: number;
};

type BlogStatsProps = {
  feed: BlogPost[];
  activeCategories: string[];
  filteredPosts: BlogPost[];
};

const BlogStats: FC<BlogStatsProps> = ({ feed, filteredPosts }) => {
  const filterActive = filteredPosts.length < feed.length;
  const postCount = filterActive ? filteredPosts.length : feed.length;
  const postsText = postCount === 1 ? 'post' : 'posts';
  const likesText = postCount === 1 ? 'like' : 'likes';
  const initialTotalLikesCount = feed.reduce(
    (acc, post) => acc + post.likes,
    0
  );

  const styleBlogStatsWrapper = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    ul: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    '.divider': {
      color: 'var(--color-accent-gray)',
    },
    li: {
      lineHeight: '1rem',
      display: 'inline',
      marginLeft: '1rem',
      span: {
        marginLeft: '.25rem',
      },
      '&.catsCount': {
        display: filterActive ? 'none' : 'inline-block',
      },
      '@media(max-width: 1024px)': {
        marginBottom: '.25rem',
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

  const { totalLikesCount } = useTotalLikes();

  return (
    <div css={styleBlogStatsWrapper}>
      <h1 className="blogHeading">Blog</h1>
      <ul>
        <li className="postsCount">
          {postCount}
          <span className="text">{postsText}</span>
        </li>
        <li className="divider">/</li>
        <li className="likesCount">
          {formatLikeCount(totalLikesCount || initialTotalLikesCount)}
          <span className="text">{likesText}</span>
        </li>
      </ul>
    </div>
  );
};

export default BlogStats;
