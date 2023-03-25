import { FC } from 'react';
import { css } from '@emotion/react';
import useTotalLikes from '@/utils/useTotalLikes';
import formatLikeCount from '@/utils/formatLikeCount';
import LoadingSpinner from '@/components/LoadingSpinner';

type BlogPost = {
  id?: number;
  publishedAt?: string;
  editedAt?: string;
  slug?: string;
  title?: string;
  teaser?: string;
  content?: string;
  featured?: boolean;
  published?: boolean;
  showEdited?: boolean;
  authorId?: number;
  likes?: number;
};

type BlogStatsProps = {
  feed: BlogPost[];
  filteredPosts: BlogPost[];
};

const BlogStats: FC<BlogStatsProps> = ({
  feed,
  filteredPosts,
}: BlogStatsProps) => {
  const filterActive = filteredPosts.length < feed.length;
  const postCount = filterActive ? filteredPosts.length : feed.length;
  const postsText = postCount === 1 ? 'post' : 'posts';
  const filteredLikesCount = filteredPosts.reduce(
    (acc, post) => acc + (post.likes || 0),
    0
  );
  const { totalLikesCount, error } = useTotalLikes();
  const likesText =
    (filteredLikesCount | totalLikesCount) === 1 ? 'like' : 'likes';

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

  return (
    <div css={styleBlogStatsWrapper}>
      <h1 className="blogHeading">Blog</h1>
      <ul>
        <li className="postsCount">
          {postCount}
          <span className="text">{postsText}</span>
        </li>
        <li className="divider">/</li>
        {error || totalLikesCount === undefined || totalLikesCount === 0 ? (
          <li className="likesCount">
            <LoadingSpinner size={15} />
          </li>
        ) : (
          <li className="likesCount">
            <LoadingSpinner size={15} />
            {/* <span className="text">{likesText}</span> */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default BlogStats;
