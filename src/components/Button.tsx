import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl px-4 py-3 text-body-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary';
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary-container',
    secondary: 'border border-primary text-primary bg-white hover:bg-surface-container-low',
    ghost: 'text-primary bg-transparent hover:bg-surface-container-low',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
