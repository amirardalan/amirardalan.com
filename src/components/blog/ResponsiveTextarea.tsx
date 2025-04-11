'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ResponsiveTextareaProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
}

export default function ResponsiveTextarea({
  id,
  value,
  placeholder,
  onChange,
  required,
  className,
}: ResponsiveTextareaProps) {
  // Using height-based media queries with the enhanced hook
  const isBelow768Height = useMediaQuery(768, 'height');
  const isBelow1080Height = useMediaQuery(1080, 'height');
  const isBelow1440Height = useMediaQuery(1440, 'height');
  const isBelow2160Height = useMediaQuery(2160, 'height');

  // Determine rows based on screen height
  let rows = 30; // Default for 1440p height

  if (isBelow768Height) {
    rows = 15; // Small screens
  } else if (isBelow1080Height) {
    rows = 20; // Tablets or medium screens
  } else if (isBelow1440Height) {
    rows = 30; // 1080p screens
  } else if (!isBelow2160Height) {
    rows = 45; // 4K screens
  }

  return (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      rows={rows}
      className={className}
    />
  );
}
