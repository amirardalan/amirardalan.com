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
  const [likeCount, setLikeCount] = useState<number>(likes);

  const handleLike = async () => {
    const newLikeCount = liked ? Math.max(0, likeCount - 1) : likeCount + 1;
    setLikeCount(newLikeCount);
    setLiked(!liked);
    await likePost(id, liked);
    localStorage.setItem(`liked_${id}`, (!liked).toString());
  };

  const { data: updatedLikes } = useSWR(() => `/api/like/${id}`, fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnMount: true,
    dedupingInterval: 10000,
    revalidateOnReconnect: true,
    method: 'GET',
  });

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus === 'true') {
      setLiked(true);
    }

    if (updatedLikes && updatedLikes !== undefined) {
      setLikeCount(updatedLikes);
    }
  }, [id, updatedLikes]);

  return (
    <button onClick={handleLike}>
      {liked ? 'Unlike' : 'Like'} ({likeCount})
    </button>
  );
};

export default Like;
