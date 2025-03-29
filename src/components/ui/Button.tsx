import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  url?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  color?: string;
  size?: 'default' | 'large';
}

export default function Button({
  text,
  onClick,
  url,
  type = 'button',
  disabled = false,
  variant = 'primary',
  color,
  size = 'default',
}: ButtonProps) {
  const buttonClasses = clsx(
    // Base
    'rounded-3xl text-sm uppercase focus:outline-none disabled:opacity-50 flex items-center justify-center',
    // Size-specific
    size === 'default' ? 'h-[35px] text-xxs' : 'min-w-[120px] text-lg',
    // Spacing
    {
      // Primary / Danger
      'px-4 py-2': size === 'default' && variant !== 'secondary',
      'px-6 py-3': size === 'large' && variant !== 'secondary',

      // Secondary
      'px-[15px] py-[7px]': size === 'default' && variant === 'secondary',
      'px-[23px] py-[11px]': size === 'large' && variant === 'secondary',
    },
    {
      // Custom color
      [`bg-${color} text-white`]: !!color,
      // Variant-specific colors
      'bg-red-600 text-white': variant === 'danger' && !color,
      'bg-zinc-50/70 dark:bg-zinc-950/70 border border-dark dark:border-light text-dark dark:text-light hover:border-primary hover:text-primary':
        variant === 'secondary' && !color,
      'bg-dark dark:bg-light text-white dark:text-dark hover:bg-primary':
        variant === 'primary' && !color,
    }
  );

  if (url) {
    return (
      <Link href={url} className={buttonClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {text}
    </button>
  );
}
