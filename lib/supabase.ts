//lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://kofcitribiroufhhecem.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvZmNpdHJpYmlyb3VmaGhlY2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3OTc2NDIsImV4cCI6MjA1OTM3MzY0Mn0.fWTWnbpSBS5QCDi81n9goKA8dW7pqxE0MNntpj8y-1Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})