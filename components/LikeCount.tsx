import { FC, useRef, useEffect } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import useLikeCount from '@/hooks/useLikeCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount: rawLikeCount, isValidating, isLoading } = useLikeCount(id);
  const likeCount =
    rawLikeCount && typeof rawLikeCount === 'number' ? rawLikeCount : 0;
  const likesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (likesRef.current) {
      const likesWidth = likesRef.current.offsetWidth;
      const parentElement = likesRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${likesWidth}px`;
      }
    }
  }, [likeCount, isValidating, isLoading]);

  const styleLikes = css({
    position: 'relative',
    height: 14,
    overflow: 'hidden',
    '.likes': {
      whiteSpace: 'nowrap',
      transition: 'transform .2s ease-in-out, opacity .2s ease-in-out',
      position: 'absolute',
      transform: `translateY(${isValidating || isLoading ? 10 : 0}px)`,
      opacity: isValidating || isLoading ? 0 : 1,
    },
    '@media (max-width: 480px)': {
      marginRight: '.5rem',
    },
  });

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton width={50} height={14} />
      ) : (
        <>
          <div css={styleLikes}>
            <span className="likes" ref={likesRef}>
              {formatNumber(likeCount || likes)}
              {likeCount === 1 || likes === 1 ? ' like' : ' likes'}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default Like;
