'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import InputField from '@/components/InputField';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background text-on-background flex items-center justify-center px-margin-mobile py-stack-lg">
      <div className="w-full max-w-md rounded-[1.5rem] bg-surface-container-lowest p-stack-lg shadow-soft border border-outline-variant">
        <div className="space-y-4 text-center">
          <p className="text-label-sm uppercase tracking-[0.3em] text-on-surface-variant">Academic Abodes</p>
          <h1 className="text-headline-lg-mobile font-bold text-primary">Welcome Back</h1>
          <p className="text-body-md text-on-surface-variant">Access your secure student housing dashboard.</p>
        </div>
        <form className="mt-stack-lg space-y-stack-md" onSubmit={(event) => event.preventDefault()}>
          <InputField label="University Email" icon="mail" placeholder="name@university.edu" type="email" />
          <InputField label="Password" icon="lock" placeholder="Enter your password" type="password" />
          <div className="flex items-center justify-between">
            <Link href="/signup" className="text-label-md font-semibold text-primary hover:underline">
              Forgot Password?
            </Link>
            <Link href="/signup" className="text-label-md font-semibold text-primary hover:underline">
              Create Account
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </main>
  );
}
