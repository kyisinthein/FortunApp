import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <LinearGradient colors={['#36010F', '#922407']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/setting')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lead}>
          At FortunAI, we value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Personal Information:</Text> Name, email address, date of birth, and gender you provide during registration and profile setup.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Fortune Data:</Text> Questions or personal data you submit for fortune readings (including sensitive topics if disclosed by you).
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Usage Data:</Text> Information about how you use our application, including features accessed, time spent, and interactions.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Device & Technical Information:</Text> Device type, IP address, browser type, operating system, device identifiers, and similar technical information.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Cookies & Tracking:</Text> We may use cookies and similar technologies to operate our website/app, analyze trends, and enhance your experience.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Support Communications:</Text> Content of any communications with our support or feedback channels.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <View style={styles.listItem}>
            <Text style={styles.listText}>To provide and personalize our services, including generating fortune readings based on your input and birth data.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>To improve and optimize our application and user experience, including using analytics.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>To communicate with you about your account, service updates, or support inquiries.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>To ensure security, prevent fraud, and comply with legal obligations.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>To enforce our terms and policies and protect our legal rights.</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>With your consent, for any other purpose disclosed at the time your data is collected.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Service Providers:</Text> We share data with third parties that help us provide our services, such as cloud hosting, analytics providers (e.g., Google Analytics), and AI service providers that process your fortune questions. These parties are contractually obligated to protect your data.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Legal Compliance:</Text> We may disclose your data if required by law, court order, or government regulation, or to defend our legal rights.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>Business Transfers:</Text> If we merge, sell, or transfer part or all of our assets, your information may be transferred as part of that transaction.
            </Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>
              <Text style={styles.bold}>With Consent:</Text> We may share your information for any other purpose disclosed at the time of collection, with your consent.
            </Text>
          </View>
          <Text style={styles.bodyText}>
            We do <Text style={styles.bold}>not sell</Text> your personal information to third parties.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Deletion</Text>
          <Text style={styles.bodyText}>
            You may request deletion of your account and all associated data at any time. In-app: Go to{' '}
            <Text style={styles.bold}>Settings &gt; Account &gt; Delete Account</Text> or email us at{' '}
            <TouchableOpacity onPress={() => handleEmailPress('joinfortunai@gmail.com')}>
              <Text style={styles.emailLink}>joinfortunai@gmail.com</Text>
            </TouchableOpacity>{' '}
            with the subject "Account Deletion Request". All your data will be permanently deleted within 30 days, except as required by law or for fraud prevention.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <View style={styles.listItem}>
            <Text style={styles.listText}>Access, correct, or delete your personal information</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>Object to or restrict processing of your data</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>Data portability (receive your data in a portable format)</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>Withdraw consent at any time</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>If you are in the EEA/UK: Right to lodge a complaint with your data protection authority</Text>
          </View>
          <View style={styles.listItem}>
            <Text style={styles.listText}>If you are in California: Rights under the California Consumer Privacy Act (CCPA), including the right to know, delete, or opt out of certain processing</Text>
          </View>
          <Text style={styles.bodyText}>
            To exercise your rights, email us at{' '}
            <TouchableOpacity onPress={() => handleEmailPress('joinfortunai@gmail.com')}>
              <Text style={styles.emailLink}>joinfortunai@gmail.com</Text>
            </TouchableOpacity>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.bodyText}>
            We implement industry-standard technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Children's Privacy</Text>
          <Text style={styles.bodyText}>
            FortunAI is not intended for children under the age of 13. We do not knowingly collect personal data from children under 13. If you believe a child has provided us information, please contact us to request deletion.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactText}>
            Contact:{' '}
            <TouchableOpacity onPress={() => handleEmailPress('joinfortunai@gmail.com')}>
              <Text style={styles.emailLink}>joinfortunai@gmail.com</Text>
            </TouchableOpacity>
          </Text>
          <Text style={styles.effectiveDate}>Effective Date: April 20, 2023</Text>
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
    paddingBottom: 40,
  },
  lead: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFD700',
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 8,
    paddingLeft: 16,
  },
  listText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  bodyText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  emailLink: {
    color: '#FFD700',
    textDecorationLine: 'underline',
  },
  contactSection: {
    marginTop: 32,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  effectiveDate: {
    fontSize: 12,
    color: '#ccc',
  },
});