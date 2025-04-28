import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import submitContactData from '../../services/ContactService';

const ContactScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.mobile.trim()) {
      tempErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      tempErrors.mobile = 'Enter valid 10 digit mobile number';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Enter valid email address';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const result = await submitContactData(formData);
        console.log("result ", result)
        if (result) {
          Alert.alert('Success', 'Thank you for contacting us. We will get back to you soon!');
          setFormData({ name: '', subject: '', email: '', mobile: '', message: '' });
        } else {
          Alert.alert('Error', result.message);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact</Text>
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
              style={[styles.input, styles.halfInput, errors.name && styles.inputError]}
              placeholder="Your Name *"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Subject (optional)"
              value={formData.subject}
              onChangeText={(value) => handleInputChange('subject', value)}
            />
          </View>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Your email ID (optional)"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={[styles.input, errors.mobile && styles.inputError]}
            placeholder="Mobile no. *"
            value={formData.mobile}
            onChangeText={(value) => handleInputChange('mobile', value)}
            keyboardType="phone-pad"
          />
          {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
          <TextInput
            style={[styles.input, styles.textArea, errors.message && styles.inputError]}
            placeholder="Please describe your issue or message here properly *"
            value={formData.message}
            onChangeText={(value) => handleInputChange('message', value)}
            multiline
            numberOfLines={4}
          />
          {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactScreen;

const additionalStyles = {
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 4,
  }
};

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
    flexDirection: 'col',
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
    width: '100%',
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
  ...additionalStyles,
});