import { likePost } from '@/lib/blog';
import { gtagEvent } from '@/lib/gtag';
import { useEffect, useState } from 'react';

type LikeButton = [boolean, () => Promise<void>];

export const useLikeButton = (id: number, title: string): LikeButton => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    setLiked(!liked);
    await likePost(id, !liked);
    localStorage.setItem(`liked_${id}`, (!liked).toString());
    gtagEvent({
      action: 'like',
      category: 'post',
      label: `Post: ${title} (ID: ${id})`,
    });
  };

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked_${id}`);
    if (likedStatus === 'true') {
      setLiked(true);
    }
  }, [id]);

  return [liked, handleLike];
};
