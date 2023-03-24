import { FC, useState, useEffect } from 'react';
import useSWR from 'swr';
import { likePost } from '@/lib/blog';
import fetcher from '@/lib/fetcher';

type LikeProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeProps> = ({ id, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    const newLikeCount = liked ? Math.max(0, likeCount - 1) : likeCount + 1;
    setLikeCount(newLikeCount);
    setLiked(!liked);
    await likePost(id, liked);
    localStorage.setItem(`liked_${id}`, (!liked).toString());
  };

  const { data: updatedLikes } = useSWR(`/api/posts/${id}/likes`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
  });

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus === 'true') {
      setLiked(true);
    }
  }, [id]);

  useEffect(() => {
    if (updatedLikes !== undefined) {
      setLikeCount(updatedLikes.likes);
    }
  }, [updatedLikes]);

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default Like;
