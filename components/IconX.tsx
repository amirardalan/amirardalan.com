import { type FC } from 'react';

type IconXProps = {
  size: number;
};

const IconX: FC<IconXProps> = ({ size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 135 135"
      className="socialIcon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M67 128C100.137 128 127 101.137 127 68C127 34.8629 100.137 8 67 8C33.8629 8 7 34.8629 7 68C7 101.137 33.8629 128 67 128ZM59.5096 70.5419L35.1535 38H53.9253L69.8928 59.3339L89.6544 38H95.171L72.3573 62.628L98.0843 97H79.3125L61.9752 73.835L40.5166 97H35L59.5096 70.5419ZM51.8895 42.0601H43.2659L81.3472 92.9399H89.9709L51.8895 42.0601Z"
      />
    </svg>
  );
};

export default IconX;
