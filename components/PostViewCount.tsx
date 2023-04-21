import { FC } from 'react';
import usePostViewCount from '@/hooks/usePostViewCount';
import formatNumber from '@/utils/formatNumber';
import { css } from '@emotion/react';

type PostViewCountProps = {
  slug: string;
};

const PostViewCount: FC<PostViewCountProps> = ({ slug }) => {
  const { postviews, isValidating } = usePostViewCount(slug);
  const views = postviews ? postviews : 0;

  const styleViews = css({
    position: 'relative',
    height: 14,
    width: 100,
    overflow: 'hidden',
    marginLeft: '.5rem',
    '.views': {
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
          {formatNumber(Number(views))} {postviews === 1 ? 'view' : 'views'}
        </span>
      </div>
    </>
  );
};

export default PostViewCount;
