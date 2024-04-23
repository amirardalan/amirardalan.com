import { FC, useState, useEffect, useRef, ReactNode } from 'react';
import { css } from '@emotion/react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l' | 'cursor';
  text: string;
  children: ReactNode;
};

const Tooltip: FC<TooltipProps> = ({ pos, text, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isTablet = useMediaQuery(1024);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pos === 'cursor') {
      const currentRef = ref.current;
      if (currentRef) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = currentRef.getBoundingClientRect();
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        };

        currentRef.addEventListener('mousemove', handleMouseMove);

        return () => {
          currentRef.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }
  }, [pos, ref]);

  const styleContainer = css({
    position: 'relative',
    display: 'flex',
    height: '100%',
  });

  const styleTooltip = css({
    position: 'absolute',
    left: pos === 'cursor' ? mousePosition.x - 55 : undefined,
    top: pos === 'cursor' ? mousePosition.y + 25 : undefined,
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
      bottom: 45,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(pos === 'r' && {
      top: '50%',
      left: 45,
      transform: 'translateY(-50%)',
    }),
    ...(pos === 'b' && {
      top: 35,
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(pos === 'l' && {
      top: '50%',
      right: 45,
      transform: 'translateY(-50%)',
    }),
  });

  return (
    <div
      ref={ref}
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
