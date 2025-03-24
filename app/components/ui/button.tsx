import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  color?: string;
}

export default function Button({
  text,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  color,
}: ButtonProps) {
  const baseClasses =
    'rounded-lg px-4 py-2 font-mono text-sm text-xxs font-medium uppercase focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';

  let colorClasses = '';

  // Determine color classes based on variant and/or custom color
  if (color) {
    // Use the custom color if provided
    colorClasses = `bg-${color} hover:bg-${color}/80 focus:ring-${color}/50 text-white`;
  } else {
    // Default colors based on variant
    switch (variant) {
      case 'danger':
        colorClasses =
          'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white';
        break;
      case 'secondary':
        // Ghost button style - transparent with border
        colorClasses =
          'bg-transparent border border-dark dark:border-light text-dark dark:text-light hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500';
        break;
      default: // primary
        colorClasses =
          'bg-dark dark:bg-light text-white dark:text-dark hover:bg-gray-800 dark:hover:bg-gray-200 focus:ring-gray-500';
        break;
    }
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${colorClasses}`}
    >
      {text}
    </button>
  );
}
