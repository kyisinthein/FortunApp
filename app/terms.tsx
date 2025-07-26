import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TermsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>
          
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By downloading, installing, or using the FortunApp mobile application ("the App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App.
          </Text>

          <Text style={styles.sectionTitle}>2. Description of Service</Text>
          <Text style={styles.text}>
            FortunApp provides astrological readings, horoscopes, and fortune-telling services based on Chinese astrology (BaZi), Five Elements theory, and traditional divination methods. Our services include:
          </Text>
          <Text style={styles.bulletPoint}>• Daily astrological readings</Text>
          <Text style={styles.bulletPoint}>• Compatibility analysis between individuals</Text>
          <Text style={styles.bulletPoint}>• Free fortune readings</Text>
          <Text style={styles.bulletPoint}>• Educational content about astrology and cultural traditions</Text>
          <Text style={styles.bulletPoint}>• Personalized astrological insights</Text>

          <Text style={styles.sectionTitle}>3. Educational and Entertainment Purpose</Text>
          <Text style={styles.text}>
            FortunApp is designed primarily for educational and entertainment purposes. Our content provides:
          </Text>
          <Text style={styles.bulletPoint}>• Historical and cultural information about astrology</Text>
          <Text style={styles.bulletPoint}>• Educational insights into traditional fortune-telling methods</Text>
          <Text style={styles.bulletPoint}>• Personal development and self-reflection tools</Text>
          <Text style={styles.bulletPoint}>• Cultural context for astrological traditions</Text>
          <Text style={styles.text}>
            The App should not be used as a substitute for professional advice in matters of health, finance, legal issues, or major life decisions.
          </Text>

          <Text style={styles.sectionTitle}>4. User Accounts and Data</Text>
          <Text style={styles.text}>
            To use certain features of the App, you may need to create an account. You agree to:
          </Text>
          <Text style={styles.bulletPoint}>• Provide accurate and complete information</Text>
          <Text style={styles.bulletPoint}>• Keep your account information updated</Text>
          <Text style={styles.bulletPoint}>• Maintain the security of your account credentials</Text>
          <Text style={styles.bulletPoint}>• Accept responsibility for all activities under your account</Text>

          <Text style={styles.sectionTitle}>5. Privacy and Data Protection</Text>
          <Text style={styles.text}>
            Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy, which is incorporated into these Terms by reference. By using the App, you consent to the collection and use of your information as described in our Privacy Policy.
          </Text>

          <Text style={styles.sectionTitle}>6. Subscription and Payment Terms</Text>
          <Text style={styles.text}>
            Some features of the App may require a paid subscription. By purchasing a subscription, you agree to:
          </Text>
          <Text style={styles.bulletPoint}>• Pay all applicable fees and charges</Text>
          <Text style={styles.bulletPoint}>• Automatic renewal unless cancelled</Text>
          <Text style={styles.bulletPoint}>• Our refund policy as outlined in the App Store or Google Play Store</Text>
          <Text style={styles.bulletPoint}>• Price changes with 30 days advance notice</Text>

          <Text style={styles.sectionTitle}>7. Intellectual Property</Text>
          <Text style={styles.text}>
            All content, features, and functionality of the App, including but not limited to text, graphics, logos, images, and software, are owned by FortunApp or its licensors and are protected by copyright, trademark, and other intellectual property laws.
          </Text>

          <Text style={styles.sectionTitle}>8. Prohibited Uses</Text>
          <Text style={styles.text}>
            You agree not to use the App for any unlawful purpose or in any way that could damage, disable, or impair the App. Prohibited activities include:
          </Text>
          <Text style={styles.bulletPoint}>• Violating any applicable laws or regulations</Text>
          <Text style={styles.bulletPoint}>• Attempting to gain unauthorized access to the App</Text>
          <Text style={styles.bulletPoint}>• Interfering with the App's operation or security</Text>
          <Text style={styles.bulletPoint}>• Using the App to harass, abuse, or harm others</Text>
          <Text style={styles.bulletPoint}>• Distributing malware or other harmful code</Text>

          <Text style={styles.sectionTitle}>9. Disclaimers and Limitations</Text>
          <Text style={styles.text}>
            IMPORTANT DISCLAIMERS:
          </Text>
          <Text style={styles.bulletPoint}>• Astrological readings are for entertainment and educational purposes only</Text>
          <Text style={styles.bulletPoint}>• Results are not guaranteed and should not be relied upon for important decisions</Text>
          <Text style={styles.bulletPoint}>• The App is provided "as is" without warranties of any kind</Text>
          <Text style={styles.bulletPoint}>• We do not guarantee the accuracy, completeness, or reliability of any content</Text>
          <Text style={styles.bulletPoint}>• Use of the App is at your own risk</Text>

          <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
          <Text style={styles.text}>
            To the maximum extent permitted by law, FortunApp and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of the App.
          </Text>

          <Text style={styles.sectionTitle}>11. Indemnification</Text>
          <Text style={styles.text}>
            You agree to indemnify and hold harmless FortunApp and its affiliates from any claims, damages, losses, or expenses arising out of your use of the App or violation of these Terms.
          </Text>

          <Text style={styles.sectionTitle}>12. Termination</Text>
          <Text style={styles.text}>
            We may terminate or suspend your account and access to the App at any time, with or without notice, for any reason, including violation of these Terms. Upon termination, your right to use the App will cease immediately.
          </Text>

          <Text style={styles.sectionTitle}>13. Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right to modify these Terms at any time. We will notify users of significant changes through the App or by email. Your continued use of the App after changes constitutes acceptance of the new Terms.
          </Text>

          <Text style={styles.sectionTitle}>14. Governing Law</Text>
          <Text style={styles.text}>
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
          </Text>

          <Text style={styles.sectionTitle}>15. Contact Information</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms and Conditions, please contact us at:
          </Text>
          <Text style={styles.bulletPoint}>• Email: support@fortunapp.com</Text>
          <Text style={styles.bulletPoint}>• Address: [Your Business Address]</Text>
          <Text style={styles.bulletPoint}>• Phone: [Your Contact Number]</Text>

          <Text style={styles.sectionTitle}>16. Severability</Text>
          <Text style={styles.text}>
            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
          </Text>

          <Text style={styles.acknowledgment}>
            By using FortunApp, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2d1810',
    borderBottomWidth: 1,
    borderBottomColor: '#8B4513',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingVertical: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 5,
    marginLeft: 10,
  },
  acknowledgment: {
    fontSize: 14,
    color: '#D4AF37',
    lineHeight: 20,
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TermsScreen;