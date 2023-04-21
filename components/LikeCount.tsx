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
  const childRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (childRef.current) {
      const childWidth = childRef.current.offsetWidth;
      const parentElement = childRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${childWidth}px`;
      }
    }
  }, [likeCount, isValidating]);

  const styleLikes = css({
    position: 'relative',
    height: 14,
    overflow: 'hidden',
    marginRight: '.5rem',
    '.likes': {
      width: 'max-content',
      transition: 'transform .2s ease-in-out, opacity .5s ease-in-out',
      position: 'absolute',
      top: 0,
      transform: `translateY(${isValidating ? 10 : 0}px)`,
      opacity: `${isValidating ? '0' : '1'}`,
    },
  });

  return (
    <>
      <div css={styleLikes}>
        <span className="likes" ref={childRef}>
          {formatNumber(likeCount || likes)}
          {likeCount === 1 ? ' like' : ' likes'}
        </span>
      </div>
    </>
  );
};

export default Like;
