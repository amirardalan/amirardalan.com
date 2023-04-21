import { FC, useRef, useEffect } from 'react';
import useLikeCount from '@/hooks/useLikeCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount, isValidating } = useLikeCount(id);
  const likesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (likesRef.current) {
      const likesWidth = likesRef.current.offsetWidth;
      const parentElement = likesRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${likesWidth + 8}px`;
      }
    }
  }, [likeCount, isValidating]);

  const styleLikes = css({
    position: 'relative',
    height: 14,
    overflow: 'hidden',
    '.likes': {
      whiteSpace: 'nowrap',
      transition: 'transform .2s ease-in-out, opacity .2s ease-in-out',
      position: 'absolute',
      transform: `translateY(${isValidating ? 10 : 0}px)`,
      opacity: `${isValidating ? '0' : '1'}`,
    },
  });

  return (
    <>
      <div css={styleLikes}>
        <span className="likes" ref={likesRef}>
          {formatNumber(likeCount || likes)}
          {likeCount === 1 ? ' like' : ' likes'}
        </span>
      </div>
      <span>•</span>
    </>
  );
};

export default Like;
