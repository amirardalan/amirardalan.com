import type { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l';
  text: string;
  children: ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ pos, text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isTablet = useMediaQuery(1024);

  const styleContainer = css({
    position: 'relative',
    display: 'inline-block',
  });

  const styleTooltip = css({
    position: 'absolute',
    padding: '0.5rem',
    backgroundColor: 'var(--color-accent)',
    fontFamily: 'var(--font-primary)',
    fontSize: 10,
    textTransform: 'uppercase',
    color: 'var(--color-text)',
    borderRadius: 4,
    whiteSpace: 'nowrap',
    zIndex: 1,
    opacity: isHovered ? 1 : 0,
    transition: `opacity ${isHovered ? '0.3s' : '0.1s'} ease-in-out`,
    ...(pos === 't' && {
      bottom: '200%',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(pos === 'r' && {
      top: '40%',
      left: '150%',
      transform: 'translateY(-50%)',
    }),
    ...(pos === 'b' && {
      top: '250%',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(pos === 'l' && {
      top: '50%',
      right: '250%',
      transform: 'translateY(-50%)',
    }),
  });

  return (
    <div
      css={styleContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {!isTablet && <div css={styleTooltip}>{text}</div>}
    </div>
  );
};

export default Tooltip;
