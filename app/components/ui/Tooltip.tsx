import { useState, useEffect, useRef, ReactNode } from 'react';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l' | 'cursor';
  text: string;
  children: ReactNode;
};

export default function Tooltip({ pos, text, children }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
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

  const getTooltipPosition = () => {
    if (pos !== 'cursor' || !tooltipRef.current) return {};

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get absolute position of cursor in viewport
    const containerRect = ref.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    const cursorX = containerRect.left + mousePosition.x;
    const cursorY = containerRect.top + mousePosition.y;

    // Default position (below cursor)
    let top = mousePosition.y + 20;
    let left = mousePosition.x - tooltipWidth / 2;

    // Check right edge
    if (cursorX + tooltipWidth / 2 > viewportWidth - 20) {
      // Move tooltip to the left of cursor
      left = mousePosition.x - tooltipWidth - 10;
    }

    // Check left edge
    if (cursorX - tooltipWidth / 2 < 20) {
      // Move tooltip to the right of cursor
      left = mousePosition.x + 10;
    }

    // Check bottom edge
    if (cursorY + tooltipHeight + 20 > viewportHeight - 20) {
      // Move tooltip to above cursor
      top = mousePosition.y - tooltipHeight - 10;
    }

    return { top, left };
  };

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <div
        ref={tooltipRef}
        className={`absolute z-30 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xxs uppercase text-white shadow-md transition-opacity duration-300 ${
          isHovered
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        } ${
          pos === 't'
            ? '-top-8 left-1/2 -translate-x-1/2'
            : pos === 'r'
              ? 'left-full top-1/2 ml-2 -translate-y-1/2'
              : pos === 'b'
                ? 'left-1/2 top-full mt-1 -translate-x-1/2'
                : pos === 'l'
                  ? 'right-full top-1/2 mr-2 -translate-y-1/2'
                  : ''
        }`}
        style={pos === 'cursor' ? getTooltipPosition() : {}}
      >
        {text}
      </div>
    </div>
  );
}
