import type { FC } from 'react';
import Image from 'next/image';
import { css } from '@emotion/react';

type PhotoProps = {
  avatar: {
    img: string;
    title: string;
  };
  height: number;
  width: number;
};

const Photo: FC<PhotoProps> = ({ avatar, height, width }) => {
  const clip = width / 2;

  const styleAvatarTint = css({
    zIndex: 2,
    position: 'absolute',
    width: width,
    height: height,
    background: 'var(--color-avatar)',
    borderRadius: clip,
    opacity: 0.15,
  });

  return (
    <>
      <div css={styleAvatarTint} />
      <Image
        src={avatar.img}
        alt={avatar.title}
        aria-label={avatar.title}
        width={width}
        height={height}
        draggable={false}
        css={{ clipPath: `circle(${clip}px at center)` }}
        priority
      />
    </>
  );
};

export default Photo;
