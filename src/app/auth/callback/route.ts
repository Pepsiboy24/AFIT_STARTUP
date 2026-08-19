import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tokenHash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const origin = request.nextUrl.origin;

  if (!tokenHash || !type) {
    return NextResponse.redirect(`${origin}/login?error=Invalid+or+expired+confirmation+link`);
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    type: type as 'email' | 'sms' | 'phone' | 'email_change' | 'recovery' | 'invite',
    token_hash: tokenHash,
  });

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=Invalid+or+expired+confirmation+link`);
  }

  const userId = data.user.id;

  let role = data.user.user_metadata?.role as 'student' | 'landlord' | undefined;

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (profile?.role) {
    role = profile.role as 'student' | 'landlord';
  }

  const destination = role === 'landlord' ? '/landlord' : '/dashboard';

  return NextResponse.redirect(`${origin}${destination}`);
}
