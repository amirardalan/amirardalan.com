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
      <path d="M127 68C127 101.137 100.137 128 67 128C33.8629 128 7 101.137 7 68C7 34.8629 33.8629 8 67 8C100.137 8 127 34.8629 127 68Z" />
      <path
        d="M38.1431 42L60.848 72.3356L38 97H43.1426L63.1464 75.4055L79.3083 97H96.8074L72.8246 64.9583L94.0916 42H88.949L70.5271 61.8875L55.6422 42H38.1431ZM45.7055 45.7848H53.7445L89.2441 93.2152H81.2051L45.7055 45.7848Z"
        fill="var(--color-bg)"
      />
    </svg>
  );
};

export default IconX;
