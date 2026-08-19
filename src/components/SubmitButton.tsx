'use client';

import { useFormStatus } from 'react-dom';
import Button from '@/components/Button';

export default function SubmitButton({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? 'Please wait…' : children}
    </Button>
  );
}
