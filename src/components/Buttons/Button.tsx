import React from 'react';

import classes from './Button.module.scss';

export type TButton = 'success' | 'primary' | 'secondary' | 'outline';

interface IButtonProps {
  onClick?: () => void;
  variant?: TButton;
  block?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  block = false,
  className = '',
  disabled = false,
  loading = false
}) => {
  let bgClass = '';
  switch (variant) {
    case 'primary':
      bgClass = 'bg-maroon-300 dark:bg-maroon-200 text-white-0';
      break;
    case 'secondary':
      bgClass = 'bg-purple-100 dark:bg-purple-200 text-white-0';
      break;
    case 'success':
      bgClass = 'bg-green-300 dark:bg-green-200 text-white-0';
      break;
    case 'outline':
      bgClass = 'border border-gray-700 dark:border-white-400 bg-transparent dark:text-white-400';
      break;
    default:
      bgClass = 'bg-maroon-300 dark:bg-maroon-200 text-white-0';
      break;
  }

  if (loading) {

    return (
      <button
        className={`${className} ${bgClass} ${block ? 'w-full' : ''}  ${classes.button_class}`}
        disabled={loading}
      >
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {children}
      </button>
    )
  }
  return (
    <button
      className={`${className} ${bgClass} ${block ? 'w-full' : ''}  ${classes.button_class}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
