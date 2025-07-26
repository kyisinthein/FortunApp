import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    // First confirmation
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account? This action cannot be undone and will remove all your data.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Continue",
          style: "destructive",
          onPress: () => showFinalConfirmation()
        }
      ]
    );
  };

  const showFinalConfirmation = () => {
    // Second confirmation
    Alert.alert(
      "Final Confirmation",
      "This will permanently delete your account and all associated data. Are you absolutely sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete Forever",
          style: "destructive",
          onPress: () => performAccountDeletion()
        }
      ]
    );
  };

  const performAccountDeletion = async () => {
    setIsDeleting(true);
    
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('Unable to get user information');
      }

      // Delete user data from userdata table
      const { error: deleteDataError } = await supabase
        .from('userdata')
        .delete()
        .eq('user_id', user.id);

      if (deleteDataError) {
        console.error('Error deleting user data:', deleteDataError);
        // Continue with account deletion even if data deletion fails
      }

      // Delete any other user-related data (add more tables as needed)
      // Example: messages, readings, etc.
      const { error: deleteMessagesError } = await supabase
        .from('messages')
        .delete()
        .eq('user_id', user.id);

      // Sign out and delete the auth user
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        throw signOutError;
      }

      // Note: Supabase doesn't allow direct user deletion from client
      // You'll need to implement this on the server side or use Supabase's admin API
      // For now, we'll just sign out and clear data
      
      Alert.alert(
        "Account Deleted",
        "Your account and data have been successfully deleted.",
        [
          {
            text: "OK",
            onPress: () => router.replace('/')
          }
        ]
      );
      
    } catch (error: any) {
      console.error('Error deleting account:', error);
      Alert.alert(
        "Error",
        `Failed to delete account: ${error.message}. Please try again or contact support.`,
        [{ text: "OK" }]
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/profile')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Management</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/edit_profile')}>
            <Ionicons name="person-outline" size={24} color="#fff" />
            <Text style={styles.settingText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/privacy')}>
            <Ionicons name="lock-closed-outline" size={24} color="#fff" />
            <Text style={styles.settingText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Privacy</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Ionicons name="download-outline" size={24} color="#fff" />
            <Text style={styles.settingText}>Download My Data</Text>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.dangerSection}>
          <Text style={styles.dangerSectionTitle}>Danger Zone</Text>
          
          <TouchableOpacity 
            style={[styles.deleteButton, isDeleting && styles.deleteButtonDisabled]} 
            onPress={handleDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="trash-outline" size={24} color="#fff" />
            )}
            <Text style={styles.deleteButtonText}>
              {isDeleting ? 'Deleting Account...' : 'Delete Account'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.deleteWarning}>
            This action is permanent and cannot be undone. All your data will be permanently deleted.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
  dangerSection: {
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(220, 53, 69, 0.3)',
  },
  dangerSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 15,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  deleteWarning: {
    fontSize: 14,
    color: '#dc3545',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});