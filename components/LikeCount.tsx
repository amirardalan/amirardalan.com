import { FC } from 'react';
import useLikeCount from '@/hooks/useLikeCount';
import formatNumber from '@/utils/formatNumber';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount } = useLikeCount(id);

  return (
    <span>
      {formatNumber(likeCount || likes)} {likeCount === 1 ? 'like' : 'likes'}{' '}
    </span>
  );
};

export default Like;
