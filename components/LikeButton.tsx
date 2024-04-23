import { FC } from 'react';
import LikeIcon from '@/components/LikeIcon';
import { css } from '@emotion/react';

type LikeButtonProps = {
  liked: boolean;
  handleLike: () => Promise<void>;
};

const LikeButton: FC<LikeButtonProps> = ({ liked, handleLike }) => {
  const styleLikeButton = css({
    display: 'flex',
    alignItems: 'center',
    padding: '.1rem 0 0 0',
  });

  return (
    <button
      css={styleLikeButton}
      onClick={handleLike}
      aria-label={!liked ? 'Like this post' : 'Unlike this post'}
      className="buttonHover"
    >
      <LikeIcon active={!liked} />
    </button>
  );
};

export default LikeButton;
