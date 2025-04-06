import { useState, useRef, ReactNode, useId, KeyboardEvent } from 'react';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l';
  text: string;
  children: ReactNode;
};

export default function Tooltip({ pos, text, children }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const tooltipId = `tooltip-${id}`;

  const isVisible = isHovered || isFocused;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsFocused(false);
    }
  };

  const handleClick = () => {
    setIsHovered(false);
    setIsFocused(false);
  };

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-describedby={tooltipId}
    >
      <div onClick={handleClick}>{children}</div>
      <div
        id={tooltipId}
        ref={tooltipRef}
        role="tooltip"
        aria-hidden={!isVisible}
        className={`absolute z-30 whitespace-nowrap rounded bg-zinc-800 px-2 py-1 text-xxs uppercase text-light shadow-md ${
          isVisible
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
        } transition-opacity duration-300`}
      >
        {text}
      </div>
    </div>
  );
}
