import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeTokens } from '../../themes/ThemeProvider';
import type { ButtonVariant } from '@reactgrad/types/button';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  to?: string; // Support for routing
<<<<<<< HEAD
  variant?: ButtonVariant; // Support for theme variants
=======
  variant?: ButtonVariant; //Support for theme variants
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
  onAction?: () => void; // New prop for handling actions
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = 'button',
  to,
  variant = 'primary',
  onAction,
}) => {
  const tokens = useThemeTokens();

  // Add error handling for missing button tokens
  if (!tokens.button) {
    console.error('[ReactGrad] Button tokens not found in theme');
    return <div style={{ color: 'red' }}>Button theme tokens missing</div>;
  }
  
  const buttonClasses = `${tokens.button.base} ${tokens.button.variants[variant]} ${className || ''}`.trim();

<<<<<<< HEAD
  // Handle click event, prioritizing onAction if provided
=======
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
  const handleClick = () => {
    if (onAction) {
      onAction();
    } else if (onClick) {
      onClick();
    }
  };

  // If 'to' prop is provided, render as a Link styled as a button
  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {label}
      </Link>
    );
  }

  // Otherwise render as a regular button
  return (
    <button type={type} onClick={handleClick} className={buttonClasses}>
      {label}
    </button>
  );
};
