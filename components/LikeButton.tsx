import { FC, useState, useEffect } from 'react';
import { likePost } from '@/lib/blog';
import LikeIcon from '@/components/LikeIcon';

type LikeProps = {
  id: number;
};

const LikeButton: FC<LikeProps> = ({ id }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    await likePost(id, liked);
    localStorage.setItem(`liked_${id}`, (!liked).toString());
  };

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus === 'true') {
      setLiked(true);
    }
  }, [id]);

  return (
    <button onClick={handleLike}>
      <LikeIcon active={!liked} />
    </button>
  );
};

export default LikeButton;
