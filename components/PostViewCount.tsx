import { FC, useRef, useEffect } from 'react';
import usePostViewCount from '@/hooks/usePostViewCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';

type PostViewCountProps = {
  slug: string;
};

const PostViewCount: FC<PostViewCountProps> = ({ slug }) => {
  const { viewCount, isValidating } = usePostViewCount(slug);
  const views = viewCount ? viewCount : 0;
  const childRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (childRef.current) {
      const childWidth = childRef.current.offsetWidth;
      const parentElement = childRef.current.parentElement;
      if (parentElement) {
        parentElement.style.width = `${childWidth}px`;
      }
    }
  }, [viewCount, isValidating]);

  const styleViews = css({
    position: 'relative',
    height: 14,
    width: 93.63,
    overflow: 'hidden',
    marginLeft: '.5rem',
    '.views': {
      whiteSpace: 'nowrap',
      transition: 'transform .2s ease-in-out, opacity .5s ease-in-out',
      position: 'absolute',
      transform: `translateY(${isValidating ? 10 : 0}px)`,
      opacity: `${isValidating ? '0' : '1'}`,
    },
  });

  return (
    <>
      <span>•</span>
      <div css={styleViews}>
        <span className="views">
          {formatNumber(Number(views))} {viewCount === 1 ? 'view' : 'views'}
        </span>
      </div>
    </>
  );
};

export default PostViewCount;
