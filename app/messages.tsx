import { supabase } from '@/lib/supabase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Footer from '../components/ui/Footer';
dayjs.extend(relativeTime);

const adminAvatar = require('../assets/images/icon.png');

export default function Messages() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select('id, created_at, message, title')
        .order('created_at', { ascending: false });

      console.log('Fetched Messages:', data); // Debug log
      if (!error && data) {
        setMessages(data);
      }
      setLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          supabase
            .from('messages')
            .select('id, created_at, message, title')
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
              if (!error && data) setMessages(data);
              setLoading(false);
            });
        }}
        renderItem={({ item }) => (
          <View style={styles.messageCard}>
            <View style={styles.avatarSection}>
              {/* <Image source={adminAvatar} style={styles.avatar} /> */}
              <Text style={styles.adminLabel}>FortunAI</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.message}</Text>
            <Text style={styles.date}>{item.created_at ? dayjs(item.created_at).fromNow() : ''}</Text>
          </View>
        )}
      />
      {messages.length === 0 && !loading && (
        <Text style={styles.emptyMessage}>No notifications available.</Text>
      )}
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
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 30,
    marginBottom: 20,
    alignSelf: 'center',
  },
  listContent: {
    paddingBottom: 150,
  },
  messageCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 1,
    elevation: 2,
    marginTop: 20,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  adminLabel: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  body: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 30,
  },
  date: {
    color: '#FFD700',
    fontSize: 13,
    alignSelf: 'flex-end',
  },
  emptyMessage: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});