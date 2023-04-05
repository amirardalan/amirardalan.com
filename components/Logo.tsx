import React, { FC } from 'react';
import { css, keyframes } from '@emotion/react';
import { useRouteStatus } from '@/hooks/useLoadingIndicator';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const rotateToStart = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Logo: FC = () => {
  const isLoading = useRouteStatus();

  return (
    <svg
      width={25}
      height={25}
      viewBox="0 0 135 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      css={
        isLoading
          ? css`
              animation: ${rotate360} 1s linear infinite;
            `
          : css`
              animation: ${rotateToStart} 1s ease-in;
              animation-fill-mode: reverse;
            `
      }
    >
      <path
        d="M118.424 135L0 16.5759L14.5759 2L133 120.424L118.424 135Z"
        fill="var(--color-heading)"
      />
      <path
        d="M1.04472e-06 120.424L118.424 2L133 16.5759L14.5759 135L1.04472e-06 120.424Z"
        fill="var(--color-heading)"
      />
      <rect
        x="66.6821"
        y="2"
        width="19.2449"
        height="19.2449"
        transform="rotate(45 66.6821 2)"
        fill="var(--color-heading)"
      />
      <rect
        x="66.6821"
        y="107.678"
        width="19.2449"
        height="19.2449"
        transform="rotate(45 66.6821 107.678)"
        fill="var(--color-heading)"
      />
    </svg>
  );
};

export default React.memo(Logo);
