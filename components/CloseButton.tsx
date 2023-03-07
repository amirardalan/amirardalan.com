import type { FC } from 'react';

import Image from 'next/image';
import { useTheme } from '@emotion/react';

type CloseIconProps = {
  width: number;
  height: number;
};

const CloseIcon: FC<CloseIconProps> = ({ width, height }) => {
  const theme: any = useTheme();

  return (
    <Image
      src={theme.icons.close}
      width={width}
      height={height}
      priority
      alt="Close menu"
      aria-label="close menu"
      draggable={false}
    />
  );
};

export default CloseIcon;
