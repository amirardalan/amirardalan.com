import { FC, useState, useEffect } from 'react';
import { likePost } from '@/lib/blog';

type LikeProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeProps> = ({ id, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(liked ? likes + 1 : likes);

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus === 'true') {
      setLiked(true);
    }
  }, [id]);

  const handleLike = async () => {
    const newLikeCount = liked ? Math.max(0, likeCount - 1) : likeCount + 1;
    setLikeCount(newLikeCount);
    setLiked(!liked);
    await likePost(id, liked);
    localStorage.setItem(`liked_${id}`, (!liked).toString());
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default Like;
