import { FC } from 'react';
import PostViewCount from '@/components/PostViewCount';
import LikeCount from '@/components/LikeCount';
import calculateReadTime from '@/utils/calculateReadTime';
import { PostProps } from '@/types/post';
import { css } from '@emotion/react';

type BlogPostStatsProps = {
  post: PostProps;
};

const styleBlogPostStats = css({
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100%',
  textTransform: 'uppercase',
  fontSize: 11,
  '.likesAndViews': {
    width: '100%',
    display: 'flex',
    alignSelf: 'center',
  },
});

const BlogPostStats: FC<BlogPostStatsProps> = ({ post }) => {
  const postReadTime = calculateReadTime(post.content);

  return (
    <div css={styleBlogPostStats}>
      <div className="likesAndViews">
        <LikeCount id={post.id} likes={post.likes} />
        <PostViewCount slug={post.slug} />
      </div>
      <span className="readTime">{postReadTime}</span>
    </div>
  );
};

export default BlogPostStats;
