import { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

type TooltipProps = {
  text: string;
  children: ReactNode;
};

// Define position states for the cursor tooltip
type TooltipPosition = 'bottom' | 'top' | 'left' | 'right' | 'default';

export default function TooltipCursor({ text, children }: TooltipProps) {
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
    const currentRef = ref.current;
    if (currentRef) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = currentRef.getBoundingClientRect();
        throttledSetMousePosition(e.clientX - rect.left, e.clientY - rect.top);
      };

      currentRef.addEventListener('mousemove', handleMouseMove);

      return () => {
        currentRef.removeEventListener('mousemove', handleMouseMove);
        if (throttleTimerRef.current !== null) {
          clearTimeout(throttleTimerRef.current);
        }
      };
    }
  }, [throttledSetMousePosition]);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      const handleMouseEnter = (e: MouseEvent) => {
        const rect = currentRef.getBoundingClientRect();
        throttledSetMousePosition(e.clientX - rect.left, e.clientY - rect.top);
        setIsHovered(true);
      };

      const handleInitialMouseMove = (e: MouseEvent) => {
        const rect = currentRef.getBoundingClientRect();
        throttledSetMousePosition(e.clientX - rect.left, e.clientY - rect.top);
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
  }, [throttledSetMousePosition]);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      const handleMouseEnter = (e: MouseEvent) => {
        const rect = currentRef.getBoundingClientRect();
        throttledSetMousePosition(e.clientX - rect.left, e.clientY - rect.top);
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
  }, [throttledSetMousePosition, mousePosition]);

  // Calculate tooltip position when mouse position changes
  useEffect(() => {
    if (!tooltipRef.current || !ref.current || !isHovered) return;

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
  }, [mousePosition, isHovered, tooltipPos]);

  const getTooltipPosition = () => {
    if (!tooltipRef.current) return {};

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
          } ${'transition-all duration-300 ease-out'}`}
          style={getTooltipPosition()}
        >
          {text}
        </div>
      )}
    </div>
  );
}
