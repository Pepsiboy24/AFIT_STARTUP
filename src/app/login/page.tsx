'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';
import { login, type AuthActionState } from '@/app/actions/auth';

export default function LoginPage() {
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    (_prevState, formData) => login(formData),
    undefined,
  );

  return (
    <main className="min-h-screen bg-background text-on-background flex items-center justify-center px-margin-mobile py-stack-lg">
      <div className="w-full max-w-md rounded-[1.5rem] bg-surface-container-lowest p-stack-lg shadow-soft border border-outline-variant">
        <div className="space-y-4 text-center">
          <p className="text-label-sm uppercase tracking-[0.3em] text-on-surface-variant">Academic Abodes</p>
          <h1 className="text-headline-lg-mobile font-bold text-primary">Welcome Back</h1>
          <p className="text-body-md text-on-surface-variant">Access your secure student housing dashboard.</p>
        </div>
        <form action={formAction} className="mt-stack-lg space-y-stack-md">
          {state?.error ? (
            <p role="alert" className="rounded-xl bg-error-container px-4 py-3 text-body-sm font-medium text-on-error-container">
              {state.error}
            </p>
          ) : null}
          {state?.success ? (
            <p role="status" className="rounded-xl bg-secondary-container px-4 py-3 text-body-sm font-medium text-on-secondary-container">
              {state.success}
            </p>
          ) : null}
          <InputField label="University Email" name="email" icon="mail" placeholder="name@university.edu" type="email" required />
          <InputField label="Password" name="password" icon="lock" placeholder="Enter your password" type="password" required />
          <div className="flex items-center justify-between">
            <Link href="/signup" className="text-label-md font-semibold text-primary hover:underline">
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-label-md font-semibold text-primary hover:underline">
              Create Account
            </Link>
          </div>
          <SubmitButton className="w-full">Sign in</SubmitButton>
        </form>
      </div>
    </main>
  );
}
