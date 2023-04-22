import { FC, useRef, useEffect, useState } from 'react';
import useLikeCount from '@/hooks/useLikeCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount, isLoading } = useLikeCount(id);
  const likesRef = useRef<HTMLSpanElement>(null);
  const [hasFreshData, setHasFreshData] = useState(false);

  useEffect(() => {
    if (likeCount && !isLoading) {
      setHasFreshData(true);
    }
    if (likesRef.current) {
      const likesWidth = likesRef.current.offsetWidth;
      const parentElement = likesRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${likesWidth + 8}px`;
      }
    }
  }, [likeCount, isLoading]);

  const styleLikes = css({
    position: 'relative',
    height: 14,
    overflow: 'hidden',
    '.likes': {
      whiteSpace: 'nowrap',
      transition: 'transform .2s ease-in-out, opacity .2s ease-in-out',
      position: 'absolute',
      transform: `translateY(${hasFreshData ? 0 : 10}px)`,
      opacity: hasFreshData ? 1 : 0,
    },
  });

  const styleDivider = css({
    transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
    opacity: isLoading ? 0 : 1,
  });

  return (
    <>
      <div css={styleLikes}>
        <span className="likes" ref={likesRef}>
          {formatNumber(likeCount || likes)}
          {likeCount === 1 ? ' like' : ' likes'}
        </span>
      </div>
      <span className="divider2" css={styleDivider}>
        •
      </span>
    </>
  );
};

export default Like;
