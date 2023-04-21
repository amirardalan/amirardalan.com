import { FC } from 'react';
import LikeIcon from '@/components/LikeIcon';

type LikeButtonProps = {
  liked: boolean;
  handleLike: () => Promise<void>;
};

const LikeButton: FC<LikeButtonProps> = ({ liked, handleLike }) => {
  return (
    <button
      onClick={handleLike}
      aria-label="Like this post"
      title="Like this post"
      className="buttonHover"
    >
      <LikeIcon active={!liked} />
    </button>
  );
};

export default LikeButton;
