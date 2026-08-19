'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { signupSchema, loginSchema } from '@/lib/validations/auth';

export type AuthActionState = { error?: string; success?: string } | undefined;

export async function signup(formData: FormData): Promise<AuthActionState> {
  const parsed = signupSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    fullName: formData.get('fullName'),
    role: formData.get('role'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };
  }

  const { email, password, fullName, role } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (!data.session) {
    return {
      success:
        'Account created! Check your email to confirm your account before signing in.',
    };
  }

  redirect(role === 'landlord' ? '/landlord' : '/search');
}

export async function login(formData: FormData): Promise<AuthActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };
  }

  const { email, password } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const user = data.user;

  let role = user.user_metadata?.role as 'student' | 'landlord' | undefined;

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (profile?.role) {
    role = profile.role as 'student' | 'landlord';
  }

  if (!role) {
    return { error: 'No role is assigned to this account. Please contact support.' };
  }

  redirect(role === 'landlord' ? '/landlord' : '/search');
}
