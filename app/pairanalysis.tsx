//Kyi Sin Thein
import Footer from '@/components/ui/Footer';
import { supabase } from '@/lib/supabase';
import { BaziCalculator } from '@aharris02/bazi-calculator-by-alvamind';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Import Markdown component conditionally for platform compatibility
let Markdown: any = null;
if (Platform.OS !== 'web') {
  Markdown = require('react-native-markdown-display').default;
} else {
  // For web platform
  Markdown = ({ children }: { children: string }) => (
    <div dangerouslySetInnerHTML={{ __html: children }} />
  );
}

const DEEPSEEK_API_KEY = 'sk-8e8b3cf59fb74f49be40ce28c96ccf49'; // Replace with environment variable in production

interface PairAnalysisResult {
  id?: string;
  user_id?: string;
  date?: string;
  partner_name?: string;
  partner_date?: string;
  purpose?: string;
  summary?: string;
  created_at?: string;
}

interface UserProfile {
  birth: string;
  gender: 'male' | 'female';
}

export default function PairAnalysisScreen() {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [analysis, setAnalysis] = useState<PairAnalysisResult | null>(null);
  
  // Form state
  const [partnerName, setPartnerName] = useState('');
  const [partnerDate, setPartnerDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  
  const purposes = [
    'Romantic Relationship',
    'Friendship', 
    'Mentorship',
    'Business Partnership',
    'Family Relationship', 
    'Team Dynamics',
    'Creative Collaboration'
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Get authenticated user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser) throw new Error('User not authenticated');
      setUser(authUser);
      
      // Get user profile
      const { data: userProfile, error: profileError } = await supabase
        .from('userdata')
        .select('birth, gender')
        .eq('user_id', authUser.id)
        .single();
      if (profileError || !userProfile) throw new Error('Profile not found');
      setProfile(userProfile);
      
      // Check subscription status
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', authUser.id)
        .single();
      setHasSubscription(subscription?.status === 'active');
      
      // Check for today's analysis
      const now = new Date();
      const todayDateString = now.toLocaleDateString('en-CA'); // YYYY-MM-DD format
      
      const { data: existingAnalysis, error: analysisError } = await supabase
        .from('pair')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('date', todayDateString)
        .single();
      
      if (!analysisError && existingAnalysis) {
        setAnalysis(existingAnalysis);
      }
    } catch (err: any) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePurpose = (purpose: string) => {
    setSelectedPurposes(prev => 
      prev.includes(purpose) 
        ? prev.filter(p => p !== purpose)
        : [...prev, purpose]
    );
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setPartnerDate(selectedDate);
    }
  };

  const generatePairAnalysis = async () => {
    if (!profile || !hasSubscription) {
      if (!hasSubscription) {
        setError('Active subscription required');
        return;
      }
      return;
    }
    
    if (!partnerName.trim()) {
      setError('Partner name is required');
      return;
    }
    
    if (selectedPurposes.length === 0) {
      setError('Please select at least one purpose');
      return;
    }
    
    try {
      setGenerating(true);
      setError('');
      
      // Initialize Bazi calculator for user
      const userBirthDate = new Date(profile.birth);
      const userCalculator = new BaziCalculator(userBirthDate, profile.gender, 8, true);
      const userAnalysis = userCalculator.getCompleteAnalysis();
      
      // Initialize Bazi calculator for partner
      const partnerCalculator = new BaziCalculator(partnerDate, 'male', 8, true); // Default to male
      const partnerAnalysis = partnerCalculator.getCompleteAnalysis();
      
      // Generate prompt for DeepSeek API
      const prompt = `Analyze the compatibility and relationship dynamics between these two individuals for the following purposes: ${selectedPurposes.join(', ')}. Focus on their strengths as a pair, potential challenges, and growth opportunities specific to these relationship types. Use "you" language and flowing paragraphs. No questions or disclaimers and no Chinese characters.\n\nUser Analysis: ${JSON.stringify(userAnalysis)}\n\nPartner Analysis: ${JSON.stringify(partnerAnalysis)}`;
      
      // Call DeepSeek API
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
      
      // Get today's date
      const now = new Date();
      const todayDateString = now.toLocaleDateString('en-CA'); // YYYY-MM-DD format
      
      // Save to Supabase
      const { data: newAnalysis, error: insertError } = await supabase
        .from('pair')
        .upsert({
          user_id: user.id,
          date: todayDateString,
          partner_name: partnerName,
          partner_date: partnerDate.toISOString(),
          purpose: selectedPurposes.join(', '),
          summary,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();
      
      if (insertError) throw new Error(insertError.message);
      setAnalysis(newAnalysis);
    } catch (err: any) {
      console.error('Error generating pair analysis:', err);
      setError(err.message || 'Failed to generate analysis');
    } finally {
      setGenerating(false);
    }
  };

  const renderForm = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Partner Analysis</Text>
      <Text style={styles.label}>Partner Name</Text>
      <TextInput
        style={styles.input}
        value={partnerName}
        onChangeText={setPartnerName}
        placeholder="Enter partner's name"
        placeholderTextColor="#999"
      />
      
      <Text style={styles.label}>Partner Birth Date</Text>
      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {partnerDate.toLocaleDateString()}
        </Text>
        <Ionicons name="calendar-outline" size={24} color="#fff" />
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={partnerDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      
      <Text style={styles.label}>Select Purposes</Text>
      <View style={styles.purposesContainer}>
        {purposes.map(purpose => (
          <TouchableOpacity
            key={purpose}
            style={[
              styles.purposeButton,
              selectedPurposes.includes(purpose) && styles.purposeButtonSelected
            ]}
            onPress={() => togglePurpose(purpose)}
          >
            <Text 
              style={[
                styles.purposeButtonText,
                selectedPurposes.includes(purpose) && styles.purposeButtonTextSelected
              ]}
            >
              {purpose}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TouchableOpacity 
        style={[
          styles.generateButton,
          (!hasSubscription || generating) && styles.generateButtonDisabled
        ]}
        onPress={generatePairAnalysis}
        disabled={!hasSubscription || generating}
      >
        {generating ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <Ionicons name="analytics-outline" size={24} color="#fff" />
            <Text style={styles.generateButtonText}>
              {hasSubscription ? 'Generate Analysis' : 'Subscription Required'}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderAnalysis = () => (
    <View style={styles.analysisContainer}>
      <View style={styles.analysisHeader}>
        <Text style={styles.analysisTitle}>Pair Analysis Results</Text>
        <Text style={styles.partnerInfo}>
          Partner: {analysis?.partner_name} • {new Date(analysis?.partner_date || '').toLocaleDateString()}
        </Text>
        <Text style={styles.purposeInfo}>Purpose: {analysis?.purpose}</Text>
      </View>
      
      {analysis?.summary ? (
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
        <Text style={styles.noAnalysisText}>No analysis content available.</Text>
      )}
      
      <TouchableOpacity 
        style={styles.newAnalysisButton} 
        onPress={() => setAnalysis(null)}
      >
        <Ionicons name="create-outline" size={24} color="#fff" />
        <Text style={styles.newAnalysisButtonText}>New Analysis</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pair Analysis</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : !hasSubscription ? (
          <View style={styles.subscriptionRequired}>
            <Ionicons name="lock-closed" size={48} color="#FFB74D" />
            <Text style={styles.subscriptionTitle}>Premium Feature</Text>
            <Text style={styles.subscriptionText}>
              Pair Analysis requires an active subscription.
            </Text>
            <TouchableOpacity 
              style={styles.upgradeButton}
              onPress={() => router.replace('/pricing')}
            >
              <Text style={styles.upgradeButtonText}>View Plans</Text>
            </TouchableOpacity>
          </View>
        ) : analysis ? (
          renderAnalysis()
        ) : (
          renderForm()
        )}
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
    paddingBottom: 100, // Extra padding for footer
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  subscriptionRequired: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginVertical: 20,
  },
  subscriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginTop: 16,
    marginBottom: 8,
  },
  subscriptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: '#FFB74D',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  upgradeButtonText: {
    color: '#36010F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  purposesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center all buttons
    alignItems: 'center',
    marginBottom: 20,
  },
  purposeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin: 4, // Small margin around each button
    alignItems: 'center',
    minHeight: 44,
    minWidth: 120, // Minimum width for consistency
  },
  purposeButtonSelected: {
    backgroundColor: '#FFB74D',
  },
  purposeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  purposeButtonTextSelected: {
    color: '#36010F',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6B6B',
    marginBottom: 16,
    fontSize: 14,
  },
  generateButton: {
    backgroundColor: '#B71C1C',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  generateButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  generateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  analysisContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  analysisHeader: {
    marginBottom: 20,
  },
  analysisTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginBottom: 8,
  },
  partnerInfo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  purposeInfo: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 16,
  },
  noAnalysisText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  newAnalysisButton: {
    backgroundColor: '#36010F',
    borderWidth: 1,
    borderColor: '#FFB74D',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  newAnalysisButtonText: {
    color: '#FFB74D',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});