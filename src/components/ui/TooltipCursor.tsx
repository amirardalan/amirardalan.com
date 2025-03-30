import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l' | 'cursor';
  text: string;
  children: ReactNode;
};

// Define position states for the cursor tooltip
type TooltipPosition = 'bottom' | 'top' | 'left' | 'right' | 'default';

export default function Tooltip({ pos, text, children }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipPos, setTooltipPos] = useState<TooltipPosition>('default');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const throttleTimerRef = useRef<number | null>(null);

  // Throttle mouse move updates
  const throttledSetMousePosition = useCallback((x: number, y: number) => {
    if (throttleTimerRef.current !== null) return;

    const ANIMATION_THROTTLE = 20;

    throttleTimerRef.current = window.setTimeout(() => {
      setMousePosition({ x, y });
      throttleTimerRef.current = null;
    }, ANIMATION_THROTTLE);
  }, []);

  useEffect(() => {
    if (pos === 'cursor') {
      const currentRef = ref.current;
      if (currentRef) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = currentRef.getBoundingClientRect();
          throttledSetMousePosition(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
        };

        currentRef.addEventListener('mousemove', handleMouseMove);

        return () => {
          currentRef.removeEventListener('mousemove', handleMouseMove);
          if (throttleTimerRef.current !== null) {
            clearTimeout(throttleTimerRef.current);
          }
        };
      }
    }
  }, [pos, throttledSetMousePosition]);

  useEffect(() => {
    if (pos === 'cursor') {
      const currentRef = ref.current;
      if (currentRef) {
        const handleMouseEnter = (e: MouseEvent) => {
          const rect = currentRef.getBoundingClientRect();
          throttledSetMousePosition(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
          setIsHovered(true);
        };

        const handleInitialMouseMove = (e: MouseEvent) => {
          const rect = currentRef.getBoundingClientRect();
          throttledSetMousePosition(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
          setIsHovered(true);
          window.removeEventListener('mousemove', handleInitialMouseMove);
        };

        // Attach a one-time listener to detect the cursor's position on load
        window.addEventListener('mousemove', handleInitialMouseMove);

        currentRef.addEventListener('mouseenter', handleMouseEnter);

        return () => {
          currentRef.removeEventListener('mouseenter', handleMouseEnter);
          window.removeEventListener('mousemove', handleInitialMouseMove);
        };
      }
    }
  }, [pos, throttledSetMousePosition]);

  useEffect(() => {
    if (pos === 'cursor') {
      const currentRef = ref.current;
      if (currentRef) {
        const handleMouseEnter = (e: MouseEvent) => {
          const rect = currentRef.getBoundingClientRect();
          throttledSetMousePosition(
            e.clientX - rect.left,
            e.clientY - rect.top
          );
          setIsHovered(true);
        };

        // Check if the mouse is already over the element on mount
        const rect = currentRef.getBoundingClientRect();
        const isMouseOver =
          rect.left <= mousePosition.x &&
          mousePosition.x <= rect.right &&
          rect.top <= mousePosition.y &&
          mousePosition.y <= rect.bottom;

        if (isMouseOver) {
          handleMouseEnter(
            new MouseEvent('mousemove', {
              clientX: mousePosition.x,
              clientY: mousePosition.y,
            })
          );
        }

        currentRef.addEventListener('mouseenter', handleMouseEnter);

        return () => {
          currentRef.removeEventListener('mouseenter', handleMouseEnter);
        };
      }
    }
  }, [pos, throttledSetMousePosition, mousePosition]);

  // Calculate tooltip position when mouse position changes
  useEffect(() => {
    if (pos !== 'cursor' || !tooltipRef.current || !ref.current || !isHovered)
      return;

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const containerRect = ref.current.getBoundingClientRect();
    const cursorX = containerRect.left + mousePosition.x;
    const cursorY = containerRect.top + mousePosition.y;

    let newPos: TooltipPosition = 'default';

    // Check right edge
    if (cursorX + tooltipWidth / 2 > viewportWidth - 20) {
      newPos = 'left';
    }
    // Check left edge
    else if (cursorX - tooltipWidth / 2 < 20) {
      newPos = 'right';
    }
    // Check bottom edge
    else if (cursorY + tooltipHeight + 20 > viewportHeight - 20) {
      newPos = 'top';
    }
    // Default position (below cursor)
    else {
      newPos = 'bottom';
    }

    // Only update position state if it changed
    if (newPos !== tooltipPos) {
      setTooltipPos(newPos);
    }
  }, [mousePosition, pos, isHovered, tooltipPos]);

  const getTooltipPosition = () => {
    if (pos !== 'cursor' || !tooltipRef.current) return {};

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    // Position based on the calculated tooltipPos state
    switch (tooltipPos) {
      case 'left':
        return {
          top: mousePosition.y,
          left: mousePosition.x - tooltipWidth - 10,
          transform: 'translateY(-50%)',
        };
      case 'right':
        return {
          top: mousePosition.y,
          left: mousePosition.x + 10,
          transform: 'translateY(-50%)',
        };
      case 'top':
        return {
          top: mousePosition.y - tooltipHeight - 10,
          left: mousePosition.x,
          transform: 'translateX(-50%)',
        };
      case 'bottom':
      case 'default':
      default:
        return {
          top: mousePosition.y + 20,
          left: mousePosition.x,
          transform: 'translateX(-50%)',
        };
    }
  };

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {!(mousePosition.x === 0 && mousePosition.y === 0) && ( // Prevent rendering at (0, 0)
        <div
          ref={tooltipRef}
          className={`absolute z-30 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xxs uppercase text-white shadow-md ${
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
          } ${pos === 'cursor' ? 'transition-all duration-300 ease-out' : 'transition-opacity duration-300'}`}
          style={pos === 'cursor' ? getTooltipPosition() : {}}
        >
          {text}
        </div>
      )}
    </div>
  );
}
