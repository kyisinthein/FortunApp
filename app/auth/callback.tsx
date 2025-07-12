// app/auth/callback.tsx
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Add a small delay for Android to process the deep link
        if (Platform.OS === 'android') {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        console.log('Auth callback - session data:', data);
        console.log('Auth callback - error:', error);

        if (data?.session) {
          // Successfully signed in, redirect to profile
          console.log('Session found, redirecting to profile');
          router.replace('/profile');
        } else {
          // Failed to get session, go back to sign in
          console.log('No session found, redirecting to signin');
          router.replace('/signin');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        router.replace('/signin');
      }
    };

    handleAuth();
  }, []);

  return null; // No UI needed, just logic
}