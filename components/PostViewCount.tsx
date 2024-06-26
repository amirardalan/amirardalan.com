import { FC, useRef, useEffect } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import usePostViewCount from '@/hooks/usePostViewCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';

type PostViewCountProps = {
  slug: string;
};

const PostViewCount: FC<PostViewCountProps> = ({ slug }) => {
  const { viewCount, isLoading } = usePostViewCount(slug);
  const views = viewCount ? viewCount : 0;
  const viewsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (viewsRef.current) {
      const viewsWidth = viewsRef.current.offsetWidth;
      const parentElement = viewsRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${viewsWidth}px`;
      }
    }
  }, [viewCount, isLoading]);

  const styleViews = css({
    position: 'relative',
    height: 14,
    overflow: 'hidden',
    '.views': {
      whiteSpace: 'nowrap',
      transition: 'transform .2s ease-in-out, opacity .2s ease-in-out',
      position: 'absolute',
      transform: `translateY(${isLoading ? 10 : 0}px)`,
      opacity: isLoading ? 0 : 1,
      '&:after': {
        content: '"/"',
        margin: '0 0.5rem',
      },
      '@media (max-width: 480px)': {
        '&:after': {
          content: '""',
          margin: 0,
        },
        '&:before': {
          content: '"/"',
          marginRight: '.5rem',
        },
      },
    },
  });

  return (
    <>
      {isLoading ? (
        <LoadingSkeleton width={70} height={14} />
      ) : (
        <div css={styleViews}>
          <span className="views" ref={viewsRef}>
            {formatNumber(Number(views))} {viewCount === 1 ? 'view' : 'views'}
          </span>
        </div>
      )}
    </>
  );
};

export default PostViewCount;
