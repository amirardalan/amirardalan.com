import { type FC } from 'react';

type IconGithubProps = {
  size: number;
};

const IconGithub: FC<IconGithubProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 135 134"
      className="socialIcon"
    >
      <defs>
        <clipPath id="b">
          <rect width="135" height="134" />
        </clipPath>
      </defs>
      <g id="a" clip-path="url(#b)">
        <path
          d="M60,0a60,60,0,1,0,60,60A60,60,0,0,0,60,0ZM71.09,93.08c-1.77.345-2.34-.745-2.34-1.68V81.8c0-3.265-1.145-5.4-2.405-6.48,7.8-.865,15.99-3.825,15.99-17.27a13.532,13.532,0,0,0-3.6-9.4,12.593,12.593,0,0,0-.345-9.265s-2.935-.94-9.615,3.585a33.366,33.366,0,0,0-17.535,0C44.55,38.45,41.61,39.39,41.61,39.39a12.581,12.581,0,0,0-.335,9.26,13.536,13.536,0,0,0-3.61,9.4c0,13.41,8.17,16.41,15.945,17.295a7.457,7.457,0,0,0-2.22,4.68c-2,.9-7.065,2.44-10.185-2.91,0,0-1.85-3.36-5.365-3.61,0,0-3.415-.045-.24,2.13,0,0,2.3,1.075,3.885,5.12,0,0,2.025,6.25,11.765,4.13v6.515c0,.925-.565,2.01-2.31,1.685a34.985,34.985,0,1,1,22.15,0Z"
          transform="translate(8 7)"
        />
      </g>
    </svg>
  );
};

export default IconGithub;