import { FC } from 'react';

type LoadingSpinnerProps = {
  size: number;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ size }) => {
  return (
    <svg
      viewBox="0 0 50 50"
      css={{
        '@keyframes rotate': {
          '100%': { transform: 'rotate(360deg)' },
        },
        display: 'flex',
        animation: 'rotate 2s linear infinite',
        alignSelf: 'center',
        zIndex: 2,
        width: size,
        height: size,
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
