import { type FC } from 'react';

type IconLinkedinProps = {
  size: number;
};

const IconLinkedin: FC<IconLinkedinProps> = ({ size }) => {
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
      <g id="a" clipPath="url(#b)">
        <path
          d="M60,0a60,60,0,1,0,60,60A60,60,0,0,0,60,0ZM50,80H40V50H50ZM45,45.545A5.545,5.545,0,1,1,50.5,40,5.523,5.523,0,0,1,45,45.545ZM85,80H75.01V65.7c0-9.405-10.01-8.61-10.01,0V80H55V50H65v5.465c4.36-8.08,20-8.68,20,7.74Z"
          transform="translate(8 7)"
        />
      </g>
    </svg>
  );
};

export default IconLinkedin;
