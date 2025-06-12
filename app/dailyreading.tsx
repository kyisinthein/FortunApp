// Kyi Sin Thein
// dailyreading.tsx
import { BaziCalculator } from '@aharris02/bazi-calculator-by-alvamind';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Markdown from 'react-native-markdown-display'; // <-- Using markdown-display
import Footer from '../components/ui/Footer';
import { supabase } from '../lib/supabase';

const DEEPSEEK_API_KEY = 'sk-8e8b3cf59fb74f49be40ce28c96ccf49';

export default function DailyReadingScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const fetchDailyReading = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Authenticate user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('User not authenticated');

      // 2. Get user profile (birth, gender)
      const { data: profile, error: profileError } = await supabase
        .from('userdata')
        .select('birth, gender')
        .eq('user_id', user.id)
        .single();
      if (profileError || !profile || !profile.birth) throw new Error('Profile or birth date not found');

      

        // ... existing code ...
// 3. Get today's date in user's timezone
const now = new Date();
const todayDateString = now.toLocaleDateString('en-CA'); // Simple and reliable
// ... existing code ...
      
      // 4. Check cache
      const { data: existingAnalysis, error: analysisError } = await supabase
        .from('daily')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', todayDateString)
        .single();
      if (!analysisError && existingAnalysis) {
        setAnalysis(existingAnalysis);
        setLoading(false);
        return;
      }

      // 5. Calculate BaZi
      const birthDate = profile.birth ? new Date(profile.birth) : null;
      const gender = profile.gender === 'male' ? 'male' : 'female';
      if (!birthDate) throw new Error('Birth date is missing or invalid');
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const userBazi = new BaziCalculator(birthDate, gender, timezone, true);
      const todayBazi = new BaziCalculator(now, gender, timezone, true);
      const userBaziEnglish = userBazi.getCompleteAnalysis();
      const todayBaziEnglish = todayBazi.getCompleteAnalysis();

      // 6. Call DeepSeek API
      const prompt = `Create today's fortune reading guidance and analysis, using \"you\" language. Make it personal and insightful. No questions or disclaimers. Don't include Chinese characters. 
      Use natural markdown formatting for structure like headings, bold, and lists.\n\n**User Profile:**\n${JSON.stringify(userBaziEnglish)}\n\n**Daily Energy Profile:**\n${JSON.stringify(todayBaziEnglish)}`;
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });
      if (!response.ok) throw new Error('DeepSeek API error');
      const data = await response.json();
      const summary = data.choices?.[0]?.message?.content || '';

      // 7. Store result
      const { data: newAnalysis, error: insertError } = await supabase
        .from('daily')
        .upsert({
          user_id: user.id,
          date: todayDateString,
          summary: summary,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      if (insertError) throw new Error(insertError.message);
      setAnalysis(newAnalysis);
    } catch (err) {
      console.log('Full error:', err);
      console.log('Error message:', err.message);
      console.log('Error status:', err.status);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyReading();
  }, []);

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Analysis</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* <Text style={styles.sectionTitle}>Today's Guidance</Text> */}
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <Text style={{ color: 'red' }}>{error}</Text>
          ) : (
            <>
              {analysis && analysis.summary ? (
                // <Markdown
                //   style={{
                //     body: {
                //       color: '#fff',
                //       fontSize: 16,
                //       lineHeight: 26,
                //     },
                //     heading3: {
                //       color: '#FFB74D',
                //       fontWeight: 'bold',
                //       marginTop: 16,
                //       marginBottom: 8,
                //     },
                //     strong: {
                //       fontWeight: 'bold',
                //       color: '#FFB74D', // Correct bold color
                //     },
                //     bullet_list: {
                //       marginLeft: 16,
                //     },
                //     list_item: {
                //       marginBottom: 6,
                //       color: '#fff',
                //     },
                //     unordered_list_icon: {
                //       color: '#FFB74D', // Bullet point color
                //     },
                //     code_block: {
                //       backgroundColor: 'rgba(255, 255, 255, 0.1)',
                //       padding: 10,
                //       borderRadius: 8,
                //       marginVertical: 10,
                //     },
                //   }}
                // >
                //   {analysis.summary}
                // </Markdown>
                <Markdown
                  style={{
                    body: {
                      color: '#fff',
                      fontSize: 16,
                      lineHeight: 26,
                    },
                    
                    heading1: {
                             color: '#FFB74D',
                             fontWeight: 'bold',
                             marginTop: 10,
                             marginBottom: 10,
                             fontSize: 20,
                          },
                          heading2: {
                            color: '#FFB74D',
                            fontWeight: 'bold',
                            marginTop: 10,
                            marginBottom: 10,
                            fontSize: 20,
                         },
                         heading3: {
                          color: '#FFB74D',
                          fontWeight: 'bold',
                          marginTop: 10,
                          marginBottom: 10,
                          fontSize: 20,
                       },
                    strong: {
                      fontWeight: 'bold',
                      color: '#FFB74D', // Bold text color
                    },
                    bullet_list: {
                      marginLeft: 0,
                    },
                    list_item: {
                      marginBottom: 6,
                      color: '#fff',
                    },
                    unordered_list_icon: {
                      color: '#FFB74D', // Bullet point color
                    },
                    code_block: {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      padding: 10,
                      borderRadius: 8,
                      marginVertical: 10,
                    },
                    hr: {
                      borderColor: '#FFB74D', // Change line color to orange
                      borderWidth: 1,
                      marginTop: 10,
                      marginBottom: 10,
                    },
                  }}
                >
                  {analysis.summary}
                </Markdown>
              ) : (
                <Text style={styles.analysisText}>No analysis available.</Text>
              )}
            </>
          )}
          <TouchableOpacity style={styles.regenerateButton} onPress={fetchDailyReading}>
           
            
          
            <Ionicons name={"refresh-circle"} size={24} color="#fff" />
            <Text style={styles.regenerateButtonText}>Regenerate</Text>
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
  },
  header: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 60,
    marginBottom: 20,
  },
  content: {
    padding: 16,
    marginBottom: 0,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 130,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginBottom: 12,
  },
  analysisText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  regenerateButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B71C1C',
    paddingVertical: 12,
    borderRadius: 8,
  },
  regenerateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});
