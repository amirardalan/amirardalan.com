import { FC } from 'react';
import useLikeCount from '@/hooks/useLikeCount';
import formatNumberCount from '@/utils/formatNumberCount';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount } = useLikeCount(id);

  return (
    <span>
      • {formatNumberCount(likeCount || likes)}{' '}
      {likeCount === 1 ? 'like' : 'likes'}
    </span>
  );
};

export default Like;
