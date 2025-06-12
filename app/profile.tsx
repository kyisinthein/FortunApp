//Kyi Sin Thein //Kaung San Thwin
import { supabase } from '@/lib/supabase';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Footer from '../components/ui/Footer';

export default function ProfileScreen() {
  const router = useRouter();
  type ProfileType = {
    name: string
    birth: string | null
    purpose: string
    gender: string
  } | null

  const [profile, setProfile] = useState<ProfileType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('userdata')
        .select('name, birth, purpose, gender')
        .eq('user_id', user.id)
        .single();
      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={['#36010F', '#922407']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <Text style={styles.header}>
        Welcome, <Text style={styles.nameHighlight}>{profile?.name ?? ''}</Text>
      </Text>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.profileTitle}>Profile Information</Text>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Name</Text>
            <Text style={styles.profileValue}>{profile?.name ?? ''}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Birth Date</Text>
            <Text style={styles.profileValue}>
              {profile?.birth ? new Date(profile.birth).toISOString().slice(0, 10) : ''}
            </Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Purpose</Text>
            <Text style={styles.profileValue}>{profile?.purpose ?? ''}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Gender</Text>
            <Text style={styles.profileValue}>{profile?.gender ?? ''}</Text>
          </View>
        </View>

        <View style={styles.othersCard}>
          <Text style={styles.othersTitle}>Others</Text>
          <TouchableOpacity style={styles.othersItem} onPress={() => router.replace('/feedback')}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" style={styles.othersIcon} />
            <Text style={styles.othersText}>Send feedback</Text>
          </TouchableOpacity>
          {/* <Link href="/setting" style={styles.othersItem}>
            <Ionicons name="settings-outline" size={24} color="#fff" style={styles.othersIcon} />
            <Text style={styles.othersText}>Account Settings</Text>
          </Link> */}
          <TouchableOpacity style={styles.othersItem} onPress={() => router.replace('/setting')}>
            <Ionicons name="information-circle-outline" size={24} color="#fff" style={styles.othersIcon} />
            <Text style={styles.othersText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.othersItem} onPress={() => router.replace('/about')}>
            <Ionicons name="information-circle-outline" size={24} color="#fff" style={styles.othersIcon} />
            <Text style={styles.othersText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutItem} onPress={async () => {
            await supabase.auth.signOut();
            router.replace('/');
          }}>
            <Ionicons name="log-out-outline" size={24} color="#FF4500" style={styles.othersIcon} />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <Footer 
        onPressHome={() => router.replace('/dashboard')} 
        onPressPlans={() => router.replace('/pricing')} 
        onPressMain={() => router.replace('/')} 
        onPressMessages={() => router.replace('/messages')} 
        onPressProfile={() => router.replace('/profile')} 
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  nameHighlight: {
    color: '#FFD700',
  },
  content: {
    paddingBottom: 150,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
    marginTop: 20,
  },
  profileTitle: {
    color: '#FF5C39',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  profileLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  profileValue: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
  othersCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 2,
  },
  othersTitle: {
    color: '#FF5C39',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  othersItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  othersIcon: {
    marginRight: 15,
  },
  othersText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  logoutText: {
    color: '#FF4500',
    fontSize: 20,
    fontWeight: '500',
  },
});