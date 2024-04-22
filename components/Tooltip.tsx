import type { FC, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type TooltipProps = {
  text: string;
  children: ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isTablet = useMediaQuery(1024);

  const styleContainer = css({
    position: 'relative',
    display: 'inline-block',
  });

  const styleTooltip = css({
    position: 'absolute',
    top: 32,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.5rem',
    backgroundColor: 'var(--color-accent)',
    color: 'var(--color-text)',
    borderRadius: 4,
    fontFamily: 'var(--font-primary)',
    fontSize: 10,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    zIndex: 1,
    opacity: isHovered ? 1 : 0,
    transition: `opacity ${isHovered ? '0.3s' : '0.1s'} ease-in-out`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -8,
      left: '50%',
    },
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
