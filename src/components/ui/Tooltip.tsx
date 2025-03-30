import { useState, useRef, ReactNode } from 'react';

type TooltipProps = {
  pos?: 't' | 'r' | 'b' | 'l';
  text: string;
  children: ReactNode;
};

export default function Tooltip({ pos, text, children }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

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
        } transition-opacity duration-300`}
      >
        {text}
      </div>
    </div>
  );
}
