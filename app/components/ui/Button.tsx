import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  color?: string;
  size?: 'default' | 'large';
}

export default function Button({
  text,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  color,
  size = 'default',
}: ButtonProps) {
  const buttonClasses = clsx(
    // Base
    'rounded-lg font-mono font-medium uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center',
    // Size-specific
    size === 'default' ? 'text-sm text-xxs' : 'text-base min-w-[120px]',
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
      [`bg-${color} focus:ring-${color}/50 text-white`]: !!color,
      // Variant-specific colors
      'bg-red-600 focus:ring-red-500 text-white':
        variant === 'danger' && !color,
      'bg-transparent border border-dark dark:border-light text-dark dark:text-light focus:ring-gray-500':
        variant === 'secondary' && !color,
      'bg-dark dark:bg-light text-white dark:text-dark focus:ring-gray-500':
        variant === 'primary' && !color,
    }
  );

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
