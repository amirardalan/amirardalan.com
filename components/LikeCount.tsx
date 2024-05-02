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
  const likeCount = typeof rawLikeCount === 'number' ? rawLikeCount : 0;
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
  });

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton width={50} height={16} />
      ) : (
        <>
          <div css={styleLikes}>
            <span className="likes" ref={likesRef}>
              {formatNumber(likeCount || likes)}
              {likeCount || likes === 1 ? ' like' : ' likes'}
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default Like;
