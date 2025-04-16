import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useCorporate } from '../context/CorporateContext';
import { AppContext } from '../context/AppContext';
import { createCorporateProfile, editCorporateProfile } from '../services/CorporateService';
import { useNavigation } from '@react-navigation/native';

const AddCorporateProfile = ({ onClose, existingData, onSuccess }) => {
  const navigation = useNavigation();
  const { updateProfile } = useCorporate();
  const { userData } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    company_type: '',
    contact_person_name: '',
    contact_person_email: '',
    contact_person_phone: '',
    address: '',
    gst: '',
    iso: '',
    website: '',
    agro: false,
    storage: false,
    agree: false,
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (existingData) {
      setFormData(prev => ({
        ...prev,
        ...existingData
      }));
    }
  }, [existingData]);

  const handleSubmit = async () => {
    try {
      // Validate required fields
      const requiredFields = [
        'name',
        'company_type',
        'contact_person_name',
        'contact_person_email',
        'contact_person_phone',
        'address'
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);
      if (missingFields.length > 0) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      let result;
      if (existingData) {
          result = await editCorporateProfile({ data: formData, user: userData });
      } else {
          result = await createCorporateProfile({ data: formData, user: userData });
      }
      console.log("first", result)
      if (result) {
        updateProfile(formData);
        if (onSuccess) {
          onSuccess(formData);
        }
        Alert.alert(
          'Success', 
          existingData ? 'Profile updated successfully' : 'Profile created successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                onClose();
                navigation.goBack();
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to save profile');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={[styles.container]}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>
            {existingData ? 'Edit Company Profile' : 'Add Company Profile'}
          </Text>
          <Text style={styles.headerSubtitle}>
            Please fill in your company details
          </Text>
        </View>
        <TouchableOpacity 
          onPress={onClose}
          style={styles.closeButton}
        >
          <View style={styles.closeButtonCircle}>
            <Ionicons name="close" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {/* Section Headers */}
        <View style={styles.sectionHeader}>
          <Ionicons name="business" size={20} color="#048404" />
          <Text style={styles.sectionTitle}>Company Information</Text>
        </View>
        
        {/* Company Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
          />
        </View>

        {/* Company Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Type <Text style={styles.required}>*</Text></Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.company_type}
              onValueChange={(value) => setFormData({...formData, company_type: value})}
            >
              <Picker.Item label="Select Company Type" value="" />
              <Picker.Item label="Manufacturer" value="Manufacturer" />
              <Picker.Item label="Seller/Vendors/Distributor" value="Seller-Vendors-Distributor" />
              <Picker.Item label="FPO (Farmer Producer Orgnisation)/SHG (Self Help Group)" value="FPO-SHG" />
            </Picker>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Ionicons name="person" size={20} color="#048404" />
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>
        
        {/* Contact Person Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Person Name"
            value={formData.contact_person_name}
            onChangeText={(text) => setFormData({...formData, contact_person_name: text})}
          />
        </View>

        {/* Contact Person Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person Email <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="eg:name@company.com"
            keyboardType="email-address"
            value={formData.contact_person_email}
            onChangeText={(text) => setFormData({...formData, contact_person_email: text})}
          />
        </View>

        {/* Contact Person Phone */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person Phone <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="97XXXXXXXX"
            keyboardType="phone-pad"
            value={formData.contact_person_phone}
            onChangeText={(text) => setFormData({...formData, contact_person_phone: text})}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Ionicons name="document-text" size={20} color="#048404" />
          <Text style={styles.sectionTitle}>Additional Details</Text>
        </View>
        
        {/* Company Address */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Address <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="eg: 15, Kohinoor Capital, Bandra, Mumbai"
            multiline
            numberOfLines={3}
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
          />
        </View>

        {/* GST IN */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>GST IN</Text>
          <TextInput
            style={styles.input}
            placeholder="GST IN (optional)"
            value={formData.gst}
            onChangeText={(text) => setFormData({...formData, gst: text})}
          />
        </View>

        {/* ISO Certification Number */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ISO Certification Number</Text>
          <TextInput
            style={styles.input}
            placeholder="ISO Certification Number (optional)"
            value={formData.iso}
            onChangeText={(text) => setFormData({...formData, iso: text})}
          />
        </View>

        {/* Company Website */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company Website</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg: company.com"
            keyboardType="url"
            value={formData.website}
            onChangeText={(text) => setFormData({...formData, website: text})}
          />
        </View>

        {/* Additional Facilities */}
        <View style={styles.sectionHeader}>
          <Ionicons name="options" size={20} color="#048404" />
          <Text style={styles.sectionTitle}>Additional Facilities</Text>
        </View>

        {/* Agro Facility */}
        <View style={styles.facilitiesContainer}>
          <TouchableOpacity 
            style={styles.facilityOption}
            onPress={() => setFormData({...formData, agro: !formData.agro})}
          >
            <View style={[styles.checkbox, formData.agro && styles.checkboxChecked]}>
              {formData.agro && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.facilityLabel}>Agro Facility</Text>
          </TouchableOpacity>

          {/* Storage Facility */}
          <TouchableOpacity 
            style={styles.facilityOption}
            onPress={() => setFormData({...formData, storage: !formData.storage})}
          >
            <View style={[styles.checkbox, formData.storage && styles.checkboxChecked]}>
              {formData.storage && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.facilityLabel}>Storage Facility</Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Agreement Section */}
        <View style={styles.agreementSection}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setFormData({...formData, agree: !formData.agree})}
          >
            <View style={[styles.checkbox, formData.agree && styles.checkboxChecked]}>
              {formData.agree && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to the <Text style={styles.linkText}>terms and conditions</Text> and <Text style={styles.linkText}>privacy policy</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Enhanced Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.submitButton, !formData.agree && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!formData.agree}
          >
            <Text style={styles.submitButtonText}>
              {existingData ? 'Update Profile' : 'Create Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    maxHeight: '95%',
    paddingBottom: 2,
  },
  header: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerContent: {
    marginRight: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  closeButtonCircle: {
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 8,
  },
  formContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  agreementSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginVertical: 24,
  },
  linkText: {
    color: '#048404',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#048404',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#048404',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    flex: 2,
    backgroundColor: '#048404',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#048404',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  facilitiesContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  facilityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  facilityLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
  },
});

export default AddCorporateProfile;