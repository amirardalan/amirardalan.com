import type { FC } from 'react';

const LoadingSpinner: FC = () => {
  return (
    <svg
      viewBox="0 0 50 50"
      css={{
        '@keyframes rotate': {
          '100%': { transform: 'rotate(360deg)' },
        },
        animation: 'rotate 2s linear infinite',
        alignSelf: 'center',
        zIndex: 2,
        width: 30,
        height: 30,
        marginRight: 5,
        '& .path': {
          stroke: 'var(--color-disabled)',
          strokeLinecap: 'round',
          animation: 'dash 1.5s ease-in-out infinite',
        },
      }}
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      ></circle>
    </svg>
  );
};

export default LoadingSpinner;
