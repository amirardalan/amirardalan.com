import { FC } from 'react';
import usePostviews from '@/hooks/usePostviews';
import formatNumber from '@/utils/formatNumber';

type PostViewCountProps = {
  slug: string;
};

const PostViewCount: FC<PostViewCountProps> = ({ slug }) => {
  const { postviews } = usePostviews(slug);

  const views = postviews ? postviews : 0;

  return (
    <span>
      • {formatNumber(Number(views))} {postviews === 1 ? 'view' : 'views'}
    </span>
  );
};

export default PostViewCount;
