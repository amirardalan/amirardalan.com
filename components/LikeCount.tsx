import { FC, useRef, useEffect } from 'react';
import useLikeCount from '@/hooks/useLikeCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';
import LoadingSkeleton from '@/components/LoadingSkeleton';

type LikeCountProps = {
  id: number;
  likes: number;
};

const Like: FC<LikeCountProps> = ({ id, likes }) => {
  const { likeCount, isValidating, isLoading } = useLikeCount(id);
  const likesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (likesRef.current) {
      const likesWidth = likesRef.current.offsetWidth;
      const parentElement = likesRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${likesWidth + 8}px`;
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
      transform: `translateY(${isValidating ? 10 : 0}px)`,
      opacity: isValidating ? 0 : 1,
    },
  });

  const styleDivider = css({
    transition: 'transform 1s ease-in-out, opacity 1s ease-in-out',
    opacity: isLoading ? 0 : 1,
  });

  console.log(isLoading);

  return (
    <>
      <div css={styleLikes}>
        {isLoading ? (
          <LoadingSkeleton width={50} height={15} />
        ) : (
          <LoadingSkeleton width={50} height={15} />
        )}
      </div>
      <span className="divider2" css={styleDivider}>
        •
      </span>
    </>
  );
};

export default Like;
