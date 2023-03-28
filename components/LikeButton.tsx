import { FC, useState, useEffect } from 'react';
import { likePost } from '@/lib/blog';
import LikeIcon from '@/components/LikeIcon';
import { gtagEvent } from '@/lib/gtag';

type LikeProps = {
  id: number;
  title: string;
};

const LikeButton: FC<LikeProps> = ({ id, title }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    await likePost(id, liked);
    localStorage.setItem(`liked_${id}`, (!liked).toString());
    gtagEvent({
      action: 'like',
      category: 'post',
      label: `Post ${title} (ID: ${id})`,
    });
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
