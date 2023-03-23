import { FC, useState, useEffect } from 'react';
import { likePost } from '@/lib/blog';

type LikeProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeProps> = ({ id, likes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const cookieValue = document.cookie.match(`liked_${id}=([^;]+)`);
    if (cookieValue) {
      setLiked(cookieValue[1] === 'true');
    }
  }, [id]);

  const handleLike = async () => {
    const newLikeCount = liked ? Math.max(0, likeCount - 1) : likeCount + 1;
    setLiked(!liked);
    setLikeCount(newLikeCount);
    await likePost(id, !liked);
    document.cookie = `liked_${id}=${!liked}; path=/`;
  };

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default Like;
