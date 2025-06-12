// app/auth/callback.tsx
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // Get the current session
      const { data } = await supabase.auth.getSession();

      if (data?.session) {
        // Successfully signed in, redirect to profile or dashboard
        router.replace('/profile');
      } else {
        // Failed to get session, go back to sign in
        router.replace('/signin');
      }
    };

    handleAuth();
  }, []);

  return null; // No UI needed, just logic
}