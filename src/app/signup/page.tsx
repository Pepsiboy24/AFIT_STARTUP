'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useActionState } from 'react';
import InputField from '@/components/InputField';
import SubmitButton from '@/components/SubmitButton';
import { signup, type AuthActionState } from '@/app/actions/auth';

const userTypes = [
  { id: 'student', label: 'I am a Student', icon: 'person_outline' },
  { id: 'landlord', label: 'I am a Landlord', icon: 'house' },
];

export default function SignupPage() {
  const [selectedType, setSelectedType] = useState<'student' | 'landlord'>('student');
  const [state, formAction] = useActionState<AuthActionState, FormData>(
    (_prevState, formData) => signup(formData),
    undefined,
  );

  return (
    <main className="min-h-screen bg-background text-on-background flex items-center justify-center px-margin-mobile py-stack-lg">
      <div className="w-full max-w-[1100px] overflow-hidden rounded-[1.5rem] bg-white shadow-soft border border-outline-variant">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <section className="hidden lg:block bg-primary p-margin-desktop text-white relative">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_40%)]" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-display font-bold">Find your sanctuary.</h2>
              <p className="max-w-sm text-body-lg text-primary-fixed-dim">
                Join thousands of students and verified landlords in the most secure housing marketplace built specifically for the academic community.
              </p>
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/10"> </div>
                <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/10"> </div>
                <div className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/10"> </div>
              </div>
              <p className="text-label-md text-white/80">4.8/5 Rating from 2k+ Students</p>
            </div>
          </section>
          <section className="p-margin-desktop">
            <div className="space-y-4">
              <p className="text-label-sm uppercase tracking-[0.3em] text-on-surface-variant">Academic Abodes</p>
              <h1 className="text-headline-lg font-bold text-on-surface">Create Account</h1>
              <p className="text-body-md text-on-surface-variant">Start your journey toward a better living experience.</p>
            </div>
            <div className="mt-stack-lg rounded-[1rem] bg-surface-container-low p-4">
              <div className="grid grid-cols-2 gap-2 rounded-[1rem] bg-white p-2 shadow-sm">
                {userTypes.map((type) => {
                  const active = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id as 'student' | 'landlord')}
                      className={`relative rounded-[1rem] px-4 py-3 text-left transition-all ${
                        active ? 'bg-primary text-white shadow-soft' : 'bg-surface text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">{type.icon}</span>
                        <span className="font-semibold">{type.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <form action={formAction} className="mt-stack-lg space-y-stack-md">
              <input type="hidden" name="role" value={selectedType} />
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
              {selectedType === 'student' ? (
                <>
                  <InputField label="Full Name" name="fullName" icon="person" placeholder="John Doe" required />
                  <InputField label="University Email" name="email" icon="mail" placeholder="name@university.edu" type="email" helpText="Verify your student status with an .edu address" required />
                </>
              ) : (
                <>
                  <InputField label="Full Name or Company" name="fullName" icon="business" placeholder="Acme Rentals" required />
                  <InputField label="Business Email" name="email" icon="alternate_email" placeholder="contact@acmerentals.com" type="email" required />
                </>
              )}
              <InputField label="Create Password" name="password" icon="lock" placeholder="••••••••" type="password" required />
              <div className="flex items-start gap-3">
                <input id="terms" type="checkbox" className="mt-1 h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary" />
                <label htmlFor="terms" className="text-body-sm text-on-surface-variant">
                  I agree to the{' '}
                  <a href="javascript:void(0)" className="text-primary underline-offset-2 underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="javascript:void(0)" className="text-primary underline-offset-2 underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              <SubmitButton className="w-full">Create Account</SubmitButton>
            </form>
            <p className="mt-stack-lg text-center text-body-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
