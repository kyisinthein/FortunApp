import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Footer from '../components/ui/Footer';

export default function EducationScreen() {
  const [activeSection, setActiveSection] = useState('history');

  const sections = [
    { id: 'history', title: 'History & Origins', icon: 'library-outline' },
    { id: 'howit', title: 'How It Works', icon: 'cog-outline' },
    { id: 'glossary', title: 'Glossary', icon: 'book-outline' },
    { id: 'culture', title: 'Cultural Context', icon: 'globe-outline' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'history':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>📚 Astrology History & Origins</Text>
            
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Ancient Chinese Astrology (BaZi)</Text>
              <Text style={styles.contentText}>
                BaZi, also known as the "Four Pillars of Destiny," originated over 1,000 years ago during the Tang Dynasty. 
                This sophisticated system analyzes the year, month, day, and hour of birth to understand personality traits and life patterns.
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Tang Dynasty (618-907 AD):</Text> First systematic documentation
                • <Text style={styles.highlight}>Song Dynasty (960-1279 AD):</Text> Refinement and popularization
                • <Text style={styles.highlight}>Modern Era:</Text> Integration with psychology and personal development
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Five Elements Theory (Wu Xing)</Text>
              <Text style={styles.contentText}>
                The Five Elements - Wood, Fire, Earth, Metal, and Water - form the foundation of Chinese metaphysics. 
                This theory explains how different energies interact and influence each other in cycles of creation and destruction.
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Wood:</Text> Growth, creativity, flexibility
                • <Text style={styles.highlight}>Fire:</Text> Energy, passion, transformation
                • <Text style={styles.highlight}>Earth:</Text> Stability, nurturing, grounding
                • <Text style={styles.highlight}>Metal:</Text> Structure, precision, clarity
                • <Text style={styles.highlight}>Water:</Text> Wisdom, adaptability, flow
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Historical Significance</Text>
              <Text style={styles.contentText}>
                Chinese astrology was used by emperors for state decisions, by scholars for philosophical understanding, 
                and by common people for daily guidance. It represents thousands of years of observation and wisdom about human nature and cosmic patterns.
              </Text>
            </View>
          </View>
        );

      case 'howit':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>⚙️ How Our Readings Work</Text>
            
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Daily Reading Process</Text>
              <Text style={styles.contentText}>
                1. <Text style={styles.highlight}>Birth Chart Analysis:</Text> We calculate your personal BaZi chart using your birth date, time, and gender
              </Text>
              <Text style={styles.contentText}>
                2. <Text style={styles.highlight}>Current Energy Assessment:</Text> We analyze today's elemental energies and how they interact with your chart
              </Text>
              <Text style={styles.contentText}>
                3. <Text style={styles.highlight}>AI Integration:</Text> Our AI combines traditional wisdom with modern insights to provide personalized guidance
              </Text>
              <Text style={styles.contentText}>
                4. <Text style={styles.highlight}>Personal Development Focus:</Text> We translate ancient wisdom into practical modern advice
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Pair Analysis Methodology</Text>
              <Text style={styles.contentText}>
                Our relationship analysis examines the elemental compatibility between two people's charts:
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Elemental Harmony:</Text> How your elements support or challenge each other
                • <Text style={styles.highlight}>Personality Dynamics:</Text> Understanding different communication styles
                • <Text style={styles.highlight}>Growth Opportunities:</Text> Areas where you can learn from each other
                • <Text style={styles.highlight}>Practical Advice:</Text> Real-world tips for better relationships
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Scientific Approach</Text>
              <Text style={styles.contentText}>
                While rooted in traditional wisdom, our approach emphasizes:
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Pattern Recognition:</Text> Identifying personality and behavioral patterns
                • <Text style={styles.highlight}>Self-Reflection:</Text> Encouraging introspection and personal growth
                • <Text style={styles.highlight}>Cultural Learning:</Text> Understanding different philosophical perspectives
                • <Text style={styles.highlight}>Practical Application:</Text> Translating insights into actionable advice
              </Text>
            </View>
          </View>
        );

      case 'glossary':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>📖 Astrology Glossary</Text>
            
            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>BaZi (八字)</Text>
              <Text style={styles.glossaryDefinition}>
                "Eight Characters" - The Four Pillars of Destiny system using birth year, month, day, and hour to create a personal energy map.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Wu Xing (五行)</Text>
              <Text style={styles.glossaryDefinition}>
                The Five Elements theory: Wood, Fire, Earth, Metal, Water. Fundamental forces that govern natural cycles and human characteristics.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Heavenly Stems (天干)</Text>
              <Text style={styles.glossaryDefinition}>
                Ten celestial symbols representing different types of elemental energy, used in calculating birth charts.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Earthly Branches (地支)</Text>
              <Text style={styles.glossaryDefinition}>
                Twelve terrestrial symbols corresponding to the Chinese zodiac animals, representing different personality archetypes.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Day Master (日主)</Text>
              <Text style={styles.glossaryDefinition}>
                The central element in your birth chart representing your core personality and life approach.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Productive Cycle (相生)</Text>
              <Text style={styles.glossaryDefinition}>
                The supportive relationship between elements: Wood feeds Fire, Fire creates Earth, Earth produces Metal, Metal collects Water, Water nourishes Wood.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Destructive Cycle (相克)</Text>
              <Text style={styles.glossaryDefinition}>
                The challenging relationship between elements: Wood depletes Earth, Earth absorbs Water, Water extinguishes Fire, Fire melts Metal, Metal cuts Wood.
              </Text>
            </View>

            <View style={styles.glossaryItem}>
              <Text style={styles.glossaryTerm}>Yin Yang (阴阳)</Text>
              <Text style={styles.glossaryDefinition}>
                The fundamental principle of complementary opposites - passive/active, receptive/assertive, internal/external energies.
              </Text>
            </View>
          </View>
        );

      case 'culture':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>🌍 Cultural Context & Traditions</Text>
            
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Chinese Cultural Foundation</Text>
              <Text style={styles.contentText}>
                Chinese astrology is deeply integrated with traditional Chinese culture, philosophy, and medicine. 
                It's not just fortune-telling, but a comprehensive worldview that emphasizes harmony, balance, and understanding natural cycles.
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Confucian Influence:</Text> Emphasis on self-cultivation and moral development
                • <Text style={styles.highlight}>Taoist Philosophy:</Text> Living in harmony with natural rhythms
                • <Text style={styles.highlight}>Traditional Medicine:</Text> Understanding body-mind-spirit connections
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Modern Applications</Text>
              <Text style={styles.contentText}>
                Today, Chinese metaphysics is used worldwide for:
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Personal Development:</Text> Understanding strengths and growth areas
                • <Text style={styles.highlight}>Relationship Counseling:</Text> Improving communication and compatibility
                • <Text style={styles.highlight}>Career Guidance:</Text> Aligning work with natural talents
                • <Text style={styles.highlight}>Stress Management:</Text> Working with natural energy cycles
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Cultural Respect & Understanding</Text>
              <Text style={styles.contentText}>
                When engaging with Chinese astrology, it's important to:
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Appreciate the Depth:</Text> Recognize thousands of years of accumulated wisdom
                • <Text style={styles.highlight}>Understand Context:</Text> See it as philosophy and psychology, not just prediction
                • <Text style={styles.highlight}>Respect Tradition:</Text> Honor the cultural origins while applying modern insights
                • <Text style={styles.highlight}>Focus on Growth:</Text> Use insights for self-improvement and understanding
              </Text>
            </View>

            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>Global Perspectives</Text>
              <Text style={styles.contentText}>
                Similar wisdom traditions exist worldwide:
              </Text>
              <Text style={styles.contentText}>
                • <Text style={styles.highlight}>Western Astrology:</Text> Planetary influences and psychological archetypes
                • <Text style={styles.highlight}>Vedic Astrology:</Text> Indian system emphasizing karma and spiritual development
                • <Text style={styles.highlight}>Mayan Astrology:</Text> Calendar-based system focusing on natural cycles
                • <Text style={styles.highlight}>Indigenous Wisdom:</Text> Various earth-based traditions worldwide
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education Center</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Section Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.tab,
                activeSection === section.id && styles.activeTab,
              ]}
              onPress={() => setActiveSection(section.id)}
            >
              <Ionicons 
                name={section.icon as any} 
                size={20} 
                color={activeSection === section.id ? '#36010F' : '#FFB74D'} 
              />
              <Text style={[
                styles.tabText,
                activeSection === section.id && styles.activeTabText,
              ]}>
                {section.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={styles.bottomPadding} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#FFB74D',
  },
  tabText: {
    color: '#FFB74D',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },
  activeTabText: {
    color: '#36010F',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginBottom: 20,
  },
  subsection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  contentText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  highlight: {
    color: '#FFB74D',
    fontWeight: 'bold',
  },
  glossaryItem: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 183, 77, 0.3)',
  },
  glossaryTerm: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFB74D',
    marginBottom: 8,
  },
  glossaryDefinition: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
  bottomPadding: {
    height: 100,
  },
});