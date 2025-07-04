import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeTokens } from '../../themes/ThemeProvider';
import type { ButtonVariant } from '../../types/button/types';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  to?: string; // Support for routing
  variant?: ButtonVariant; //Support for theme variants
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = 'button',
  to,
  variant = 'primary',
}) => {
  const tokens = useThemeTokens();

  // Add error handling for missing button tokens
  if (!tokens.button) {
    console.error('[ReactGrad] Button tokens not found in theme');
    return <div style={{ color: 'red' }}>Button theme tokens missing</div>;
  }
  
  const buttonClasses = `${tokens.button.base} ${tokens.button.variants[variant]} ${className || ''}`.trim();

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
    <button type={type} onClick={onClick} className={buttonClasses}>
      {label}
    </button>
  );
};
