import { FC } from 'react';
import usePostViewCount from '@/hooks/usePostViewCount';
import formatNumber from '@/utils/formatNumber';

type PostViewCountProps = {
  slug: string;
};

const PostViewCount: FC<PostViewCountProps> = ({ slug }) => {
  const { postviews } = usePostViewCount(slug);

  const views = postviews ? postviews : 0;

  return (
    <span>
      • {formatNumber(Number(views))} {postviews === 1 ? 'view' : 'views'}
    </span>
  );
};

export default PostViewCount;
