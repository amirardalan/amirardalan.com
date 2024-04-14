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
      aria-label={!liked ? 'Like this post' : 'Unlike this post'}
      title={!liked ? 'Like this post' : 'Unlike this post'}
      className="buttonHover"
    >
      <LikeIcon active={!liked} />
    </button>
  );
};

export default LikeButton;
