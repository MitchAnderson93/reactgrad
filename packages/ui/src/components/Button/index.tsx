import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  type = 'button',
}) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {label}
    </button>
  );
};
