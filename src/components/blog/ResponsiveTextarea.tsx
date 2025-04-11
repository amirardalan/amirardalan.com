'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRef } from 'react';

interface ResponsiveTextareaProps {
  id: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onSelect?: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
}

export default function ResponsiveTextarea({
  id,
  value,
  placeholder,
  onChange,
  required,
  className,
  onFocus,
  onBlur,
  onSelect,
  textareaRef,
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

  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaReference = textareaRef || internalRef;

  return (
    <div className="bg-zinc-100 pt-1 dark:bg-zinc-800">
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        rows={rows}
        className={className}
        style={{ resize: 'none' }}
        ref={textareaReference}
        onFocus={onFocus}
        onBlur={onBlur}
        onSelect={onSelect}
      />
    </div>
  );
}
