import { FC } from 'react';
import usePostviewsCount from '@/hooks/usePostviews';
import formatNumberCount from '@/utils/formatNumberCount';

type PostViewsProps = {
  slug: string;
};

const PostViews: FC<PostViewsProps> = ({ slug }) => {
  const { postviewsCount } = usePostviewsCount(slug);

  const views = postviewsCount ? postviewsCount : 0;

  return (
    <span>
      • {formatNumberCount(Number(views))}{' '}
      {postviewsCount === 1 ? 'view' : 'views'}
    </span>
  );
};

export default PostViews;
