import { FC } from 'react';
import useLikeCount from '@/utils/useLikeCount';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount } = useLikeCount(id);

  return <span>{likeCount || likes}</span>;
};

export default Like;
