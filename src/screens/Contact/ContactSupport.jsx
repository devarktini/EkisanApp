import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons

const ContactSupport = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Add form submission logic here
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Support</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Form Section */}
        <Text style={styles.header}>Reach out to us!</Text>
        <Text style={styles.subHeader}>
          Have a query about sustainable farming practices, want to partner with us, or need
          assistance with our services? We’re here to help you. Contact eKisan Darshan by filling
          out the form below:
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Your Name *"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Subject (optional)"
              value={formData.subject}
              onChangeText={(value) => handleInputChange('subject', value)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Your email ID (optional)"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile no. *"
            value={formData.mobile}
            onChangeText={(value) => handleInputChange('mobile', value)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Please describe your issue or message here properly *"
            value={formData.message}
            onChangeText={(value) => handleInputChange('message', value)}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* Customer Care Section */}
        <View style={styles.customerCareContainer}>
          <Text style={styles.customerCareHeader}>Customer Care</Text>
          <Text style={styles.customerCareText}>
            Not sure where to start? Need guidance on our farming technologies, consultancy, or seed
            distribution? Visit our help center or get in touch with our customer care team:
          </Text>

          <View style={styles.contactPerson}>
            <Ionicons name="leaf-outline" size={24} color="#048404" />
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>eKisan Darshan</Text>
              <Text style={styles.contactRole}>Agri Consultant</Text>
              <Text style={styles.contactPhone}>Toll free: +91 913 124 8957</Text>
            </View>
          </View>

          <View style={styles.contactPerson}>
            <Ionicons name="leaf-outline" size={24} color="#048404" />
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>Praveen Sharma</Text>
              <Text style={styles.contactRole}>Customer Care Lead</Text>
              <Text style={styles.contactPhone}>+91 993 436 6082</Text>
            </View>
          </View>

          <Text style={styles.otherWaysHeader}>Others ways to connect</Text>
          <Text style={styles.otherWaysText}>
            <Ionicons name="logo-facebook" size={16} color="#048404" /> Like us on{' '}
            <Text style={styles.link}>Facebook</Text> today!
          </Text>
          <Text style={styles.otherWaysText}>
            <Ionicons name="logo-twitter" size={16} color="#048404" /> Follow us on{' '}
            <Text style={styles.link}>Twitter</Text>!
          </Text>
          <Text style={styles.otherWaysText}>
            <Ionicons name="logo-instagram" size={16} color="#048404" /> Follow us on{' '}
            <Text style={styles.link}>Instagram</Text>!
          </Text>
          <Text style={styles.otherWaysText}>
            <Ionicons name="logo-linkedin" size={16} color="#048404" /> Follow us on{' '}
            <Text style={styles.link}>LinkedIn</Text>!
          </Text>
          <Text style={styles.otherWaysText}>
            <Ionicons name="logo-youtube" size={16} color="#048404" /> Follow us on{' '}
            <Text style={styles.link}>YouTube</Text>!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactSupport;

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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#048404',
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
  },
  halfInput: {
    width: '48%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#048404',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  customerCareContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customerCareHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  customerCareText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  contactPerson: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactDetails: {
    marginLeft: 8,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactRole: {
    fontSize: 14,
    color: '#666',
  },
  contactPhone: {
    fontSize: 14,
    color: '#048404',
  },
  otherWaysHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  otherWaysText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  link: {
    color: '#048404',
    fontWeight: 'bold',
  },
});