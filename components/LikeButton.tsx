import { FC } from 'react';
import LikeIcon from '@/components/LikeIcon';

type LikeProps = {
  liked: boolean;
  handleLike: () => Promise<void>;
};

const LikeButton: FC<LikeProps> = ({ liked, handleLike }) => {
  return (
    <button onClick={handleLike}>
      <LikeIcon active={!liked} />
    </button>
  );
};

export default LikeButton;
