'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<'student' | 'landlord'>('student');
  const [email, setEmail] = useState('alex@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (role === 'landlord') {
        router.push('/landlord');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  const setDemoUser = (selectedRole: 'student' | 'landlord') => {
    setRole(selectedRole);
    if (selectedRole === 'student') {
      setEmail('alex@university.edu');
    } else {
      setEmail('james@abodeslandlord.com');
    }
  };

  return (
    <main className="min-h-screen bg-background text-on-background flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <header className="w-full px-margin-mobile py-4 md:px-margin-desktop flex justify-between items-center z-10">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <span className="text-body-md font-bold tracking-tight text-primary">Academic Abodes</span>
        </Link>
        <Link
          href="/signup"
          className="text-label-md font-semibold text-primary hover:underline"
        >
          Create Account
        </Link>
      </header>

      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Center Form Card */}
      <div className="w-full max-w-md mx-auto px-margin-mobile my-auto z-10">
        <div className="rounded-[1.5rem] bg-white p-6 sm:p-8 shadow-soft border border-outline-variant/60">
          <div className="space-y-1 text-center md:text-left">
            <span className="rounded-full bg-secondary-container px-3 py-1 text-label-sm font-bold text-on-secondary-container inline-block mb-1">
              Secure Sign In
            </span>
            <h1 className="text-headline-lg-mobile md:text-headline-lg font-bold text-primary">Welcome Back</h1>
            <p className="text-body-md text-on-surface-variant">
              Access your student applications and verified housing portal.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-surface-container-low p-1.5 border border-outline-variant/40">
            <button
              type="button"
              onClick={() => setDemoUser('student')}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-label-md font-semibold transition-all ${
                role === 'student'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">school</span>
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => setDemoUser('landlord')}
              className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-label-md font-semibold transition-all ${
                role === 'landlord'
                  ? 'bg-white text-secondary shadow-sm'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">house</span>
              <span>Landlord</span>
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-label-sm font-semibold text-on-surface" htmlFor="email">
                {role === 'student' ? 'University Email (.edu / .ac.uk)' : 'Business Email'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'student' ? 'name@university.edu' : 'contact@agency.com'}
                  className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-11 pr-4 text-body-md outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-label-sm font-semibold text-on-surface" htmlFor="password">
                  Password
                </label>
                <a href="javascript:void(0)" className="text-label-sm font-semibold text-primary hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-outline-variant bg-surface py-3 pl-11 pr-11 text-body-md outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full mt-2 gap-2">
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign in as {role === 'student' ? 'Student' : 'Landlord'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 border-t border-outline-variant/40 pt-4 text-center">
            <p className="text-body-sm text-on-surface-variant">
              Don't have an account yet?{' '}
              <Link href="/signup" className="font-bold text-primary hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Quick Demo Credentials Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
            <span>256-Bit SSL Encrypted</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">school</span>
            <span>Official Campus Housing Partner</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-label-sm text-on-surface-variant z-10">
        © 2026 Academic Abodes. All rights reserved.
      </footer>
    </main>
  );
}
