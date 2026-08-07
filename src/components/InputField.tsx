import type { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  helpText?: string;
}

export default function InputField({ label, icon, helpText, className = '', ...props }: InputFieldProps) {
  return (
    <label className="space-y-2 text-body-md text-on-surface">
      <span className="text-label-md font-semibold text-on-surface-variant">{label}</span>
      <div className="relative">
        {icon ? (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">{icon}</span>
        ) : null}
        <input
          className={`w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary ${icon ? 'pl-12' : ''} ${className}`}
          {...props}
        />
      </div>
      {helpText ? <p className="text-body-sm text-on-surface-variant">{helpText}</p> : null}
    </label>
  );
}
