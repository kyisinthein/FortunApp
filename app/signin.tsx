// kyi sin thein
// app/signin.tsx

import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/lib/supabase';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const router = useRouter();

  const handleOAuthResult = async (result: any) => {
    if (result.type === 'success') {
      console.log('OAuth flow completed, redirect URL:', result.url);
      
      // Parse the URL to extract tokens
      const url = new URL(result.url);
      const fragment = url.hash.substring(1);
      const params = new URLSearchParams(fragment);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      
      if (accessToken && refreshToken) {
        // Set the session manually
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        });
        
        if (data.session && !error) {
          console.log('Session established successfully');
          router.replace('/profile');
        } else {
          console.error('Failed to establish session:', error);
          alert('Failed to establish session. Please try again.');
        }
      } else {
        console.error('Missing tokens in OAuth response');
        alert('Authentication failed. Missing tokens.');
      }
    } else if (result.type === 'cancel' || result.type === 'dismiss') {
      console.log('OAuth flow was cancelled or dismissed.');
    } else {
      console.log('OAuth flow returned an unexpected result type:', result.type);
    }
  };

  const handleGoogleSignIn = async () => {
    console.log('Attempting Google Sign-In...');
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'fortunapp://profile',
          skipBrowserRedirect: true,
          queryParams: {
            prompt: 'select_account'
          }
        },
      });

      console.log('signInWithOAuth response:', { data, error });

      if (error) {
        console.error('Google Sign-In Error:', error);
        alert(`Google Sign-In Error: ${error.message}`);
        return;
      }

      if (!data || !data.url) {
        console.error('Google Sign-In did not return a URL.');
        alert('Google Sign-In did not return a URL. Please try again.');
        return;
      }

      console.log('Manually redirecting to:', data.url);
      const result = await WebBrowser.openAuthSessionAsync(data.url, 'fortunapp://profile');
      console.log('WebBrowser.openAuthSessionAsync result:', result);

      await handleOAuthResult(result);

    } catch (e: any) {
      console.error('Critical error in handleGoogleSignIn:', e);
      alert(`Critical error: ${e.message}`);
    }
  };

  const handleGoogleSignInDifferentAccount = async () => {
    console.log('Attempting Google Sign-In with different account...');
    try {
      // First sign out any existing session
      await supabase.auth.signOut();
      
      // Then proceed with OAuth with forced account selection
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'fortunapp://profile',
          skipBrowserRedirect: true,
          queryParams: {
            prompt: 'select_account',
            login_hint: '' // Clear any login hints
          }
        },
      });

      console.log('signInWithOAuth response:', { data, error });

      if (error) {
        console.error('Google Sign-In Error:', error);
        alert(`Google Sign-In Error: ${error.message}`);
        return;
      }

      if (!data || !data.url) {
        console.error('Google Sign-In did not return a URL.');
        alert('Google Sign-In did not return a URL. Please try again.');
        return;
      }

      console.log('Manually redirecting to:', data.url);
      const result = await WebBrowser.openAuthSessionAsync(data.url, 'fortunapp://profile');
      console.log('WebBrowser.openAuthSessionAsync result:', result);

      await handleOAuthResult(result);

    } catch (e: any) {
      console.error('Critical error in handleGoogleSignInDifferentAccount:', e);
      alert(`Critical error: ${e.message}`);
    }
  };

  const handleAppleSignIn = async () => {
    // Implement Apple sign-in logic here (similar to Google)
    router.replace('/');
  };

  return (
    <>
      {/* remove default nav header */}
      <Stack.Screen options={{ headerShown: false }} />

      <LinearGradient
        colors={['#36010F', '#7b1e05', '#36010F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header + underline */}
        <View style={styles.headerContainer}>
          <ThemedText type="title" style={styles.headerText}>
            Welcome Back!
          </ThemedText>
          <LinearGradient
            colors={['#FFD700', '#FF9900', '#FF5C39']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.headerLine}
          />
        </View>

        {/* Buttons */}
        <View style={styles.content}>
          <TouchableOpacity
            style={[styles.button, styles.googleButton]}
            activeOpacity={0.8}
            onPress={handleGoogleSignIn}
          >
            {/* <FontAwesome
              name="google"
              size={24}
              color="#DB4437"
              style={styles.icon}
            />
            <ThemedText style={[styles.buttonText, styles.googleText]}>
              Login with Google
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.differentAccountButton]}
            activeOpacity={0.8}
            onPress={handleGoogleSignInDifferentAccount}
          > */}
            <FontAwesome
              name="google"
              size={24}
              color="#DB4437"
              style={styles.icon}
            />
            <ThemedText style={[styles.buttonText, styles.googleText]}>
              Login with Google
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.appleButton]}
            activeOpacity={0.8}
            onPress={handleAppleSignIn}
          >
            <FontAwesome
              name="apple"
              size={24}
              color="#FFFFFF"
              style={styles.icon}
            />
            <ThemedText style={[styles.buttonText, styles.appleText]}>
              Login with Apple
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer link */}
        <TouchableOpacity
          onPress={() => router.push('/register')}
          style={styles.footer}
        >
          <ThemedText style={styles.footerText}>
            Don't have an account?{' '}
            <ThemedText style={styles.registerLink}>Register</ThemedText>
          </ThemedText>
        </TouchableOpacity>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: 35,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerLine: {
    height: 4,
    width: 120,
    borderRadius: 2,
    marginTop: 8,
  },
  content: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
  },
  differentAccountButton: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  icon: {
    marginLeft: 55,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#36010F',
  },
  googleText: {
    marginLeft: 15,
  },
  appleText: {
    color: '#FFFFFF',
    marginLeft: 15,
  },
  footer: {
    position: 'absolute',
    top: 580,
    alignSelf: 'center',
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#fa8911',
  },
});
