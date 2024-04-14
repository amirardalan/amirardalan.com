import { type FC } from 'react';
import { css } from '@emotion/react';

type LoadingSkeletonProps = {
  width: number;
  height: number;
};

const styleLoadingSkeleton = css({
  background:
    'linear-gradient(-90deg, var(--color-bg) 0%, var(--color-accent) 25%, var(--color-bg) 50%, var(--color-accent) 75%, var(--color-bg) 100%)',
  backgroundSize: '400% 100%',
  animation: `skeleton 4s linear infinite`,
  borderRadius: 4,
  '@keyframes skeleton': {
    '0%': {
      backgroundPosition: '0 0',
    },
    '100%': {
      backgroundPosition: '400% 0',
    },
  },
});

const LoadingSkeleton: FC<LoadingSkeletonProps> = ({ width, height }) => {
  return <div css={styleLoadingSkeleton} style={{ width, height }}></div>;
};

export default LoadingSkeleton;
