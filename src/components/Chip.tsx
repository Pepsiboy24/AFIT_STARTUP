import type { ButtonHTMLAttributes } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export default function Chip({ active = false, className = '', children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-label-md font-medium transition-all ${
        active
          ? 'bg-tertiary text-white shadow-soft'
          : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container transition-colors'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
