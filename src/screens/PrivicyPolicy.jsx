import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon

const PrivicyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Privacy Policy Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>

        {/* Section 1 */}
        <Text style={styles.sectionHeader}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to eKisan Darshan. This Privacy Policy explains how we collect, use, and protect
          your personal information when you use our services.
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionHeader}>2. Information We Collect</Text>
        <Text style={styles.text}>We may collect the following types of information:</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bulletPoint}>• Personal Information: Name, email, phone number, etc.</Text>
          <Text style={styles.bulletPoint}>• Usage Data: Information about how you use our app.</Text>
          <Text style={styles.bulletPoint}>• Location Data: Your geographic location (if enabled).</Text>
        </View>

        {/* Section 3 */}
        <Text style={styles.sectionHeader}>3. How We Use Your Information</Text>
        <Text style={styles.text}>We use your information for the following purposes:</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bulletPoint}>• To provide and improve our services.</Text>
          <Text style={styles.bulletPoint}>• To communicate with you about updates and offers.</Text>
          <Text style={styles.bulletPoint}>• To ensure the security of our platform.</Text>
        </View>

        {/* Section 4 */}
        <Text style={styles.sectionHeader}>4. Sharing Your Information</Text>
        <Text style={styles.text}>
          We do not share your personal information with third parties except in the following cases:
        </Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bulletPoint}>• With your consent.</Text>
          <Text style={styles.bulletPoint}>• To comply with legal obligations.</Text>
          <Text style={styles.bulletPoint}>• To protect the rights and safety of our users.</Text>
        </View>

        {/* Section 5 */}
        <Text style={styles.sectionHeader}>5. Data Security</Text>
        <Text style={styles.text}>
          We take appropriate measures to protect your personal information from unauthorized access,
          disclosure, or destruction.
        </Text>

        {/* Section 6 */}
        <Text style={styles.sectionHeader}>6. Your Rights</Text>
        <Text style={styles.text}>You have the following rights regarding your personal data:</Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bulletPoint}>• The right to access your data.</Text>
          <Text style={styles.bulletPoint}>• The right to request corrections to your data.</Text>
          <Text style={styles.bulletPoint}>• The right to delete your data.</Text>
        </View>

        {/* Section 7 */}
        <Text style={styles.sectionHeader}>7. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated revision date.
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionHeader}>8. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us at:
        </Text>
        <View style={styles.bulletContainer}>
          <Text style={styles.bulletPoint}>• Email: support@ekisan.com</Text>
          <Text style={styles.bulletPoint}>• Phone: +91 913 124 8957</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivicyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#048404',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
  },
  bulletContainer: {
    marginLeft: 16,
    marginTop: 8,
  },
  bulletPoint: {
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
    marginBottom: 4,
  },
});