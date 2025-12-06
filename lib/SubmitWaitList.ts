import { supabase } from '@/lib/supabase';

export async function SubmitWaitlist(email: string, isAgreed: boolean) {
  const { error } = await supabase.from('waitlist').insert({
    email,
    is_agreed: isAgreed,
  });

  if (error) {
    console.error('Insert error:', error);
    return { success: false, error };
  }

  return { success: true };
}
