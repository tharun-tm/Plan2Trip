import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

function isValidSupabaseUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.includes('your_supabase') || url.includes('placeholder')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

const isAnonKeyValid = Boolean(
  supabaseAnonKey &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 20 &&
  !supabaseAnonKey.includes('your_supabase')
);

// Create Supabase client — do NOT set flowType here, let it default
export const supabase = (isValidSupabaseUrl(supabaseUrl) && isAnonKeyValid)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/**
 * Initiate Google OAuth login with dynamic redirect back to TripWise.
 */
export async function signInWithGoogle() {
  if (!supabase) {
    alert('Supabase is not configured!\n\nPlease set valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env');
    return;
  }

  const redirectTo = `${window.location.origin}/`;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });

  if (error) {
    console.error('Google OAuth error:', error.message);
    throw error;
  }
}

/**
 * Sign out current user
 */
export async function signOut() {
  if (supabase) {
    await supabase.auth.signOut();
  }
}
