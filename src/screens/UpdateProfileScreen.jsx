import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../context/AppContext';
import { getCurrentUser, updateUserProfile } from '../services/authservice';
import { IndianDistrict, IndianStates, Blocks } from '../constants/GeographicalData'; // Import your geographical data
import { useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// Mock data for dropdowns (replace with your actual data)
const roles = ['Select Role', 'Farmer', 'Buyer', 'Agent'];
const states = ['Select State', 'Maharashtra', 'Gujarat', 'Karnataka']; // Add your states
const districts = ['Select District', 'District 1', 'District 2', 'District 3']; // Add your districts
const blocks = ['Select Block', 'Block 1', 'Block 2', 'Block 3']; // Add your blocks

const CustomCheckbox = ({ value, onValueChange }) => (
  <TouchableOpacity 
    style={[styles.checkbox, value && styles.checkboxChecked]}
    onPress={() => onValueChange(!value)}
    activeOpacity={0.7}
  >
    {value && (
      <Text style={styles.checkmark}>✓</Text>
    )}
  </TouchableOpacity>
);

const UpdateProfileScreen = ({ navigation }) => {

  const route = useRoute();
  const {user, type} = route.params || {};
  const { userData, setUserData, setIsAuthenticated } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const object = {
    fullName: '',
    email: '',
    role: '',
    state: '',
    district: '',
    block: '',
  }
  const [formData, setFormData] = useState(object);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [optionDistrict, setOptionDistrict] = useState([]);
  const [optionBlock, setOptionBlock] = useState([]);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        role: user.role || '',
        state: user.state || '',
        district: user.district || '',
        block: user.block || '',
      });
    }
  }, [user]);

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          console.log("response", response)
          setUserPhone(response.userData.phoneNumber);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getCurrentUserData();
  }, []);
  
  useEffect(() => {
    // Update districts when state changes
    // setFormData(userData)
    if (formData.state) {
      setOptionDistrict(IndianDistrict[formData.state] || []);
      if (!formData.district) {
        setFormData((prev) => ({ ...prev, district: '', block: '' }));
      }
    } else {
      setOptionDistrict([]);
      setOptionBlock([]);
    }
  }, [formData.state]);

  useEffect(() => {
    // Update blocks when district changes
    if (formData.district) {
      setOptionBlock(Blocks[formData.district] || []);
    } else {
      setOptionBlock([]);
    }
  }, [formData.district]);

  const handleFormChanges = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      // Validation
      if (!formData.fullName.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!formData.role || formData.role === 'Select Role') {
        setError('Please select a role');
        return;
      }
      if (!formData.state || formData.state === 'Select State') {
        setError('Please select a state');
        return;
      }
      if (!formData.district || formData.district === 'Select District') {
        setError('Please select a district');
        return;
      }
      if (!formData.block || formData.block === 'Select Block') {
        setError('Please select a block');
        return;
      }
      if (!agreed) {
        setError('Please agree to the terms and conditions');
        return;
      }
      const result = await updateUserProfile({
        ...formData,
        uid: userData.uid,
        phoneNumber: userPhone,
        isProfileComplete: true,
        isFirstTimeUser: false,
        updatedAt: new Date().toISOString()
      });
      if (result.success) {
        setIsAuthenticated (true)
        setUserData(result.userData);
        await AsyncStorage.setItem("isFirstLaunch", "false");
        if (type === 'edit') {
          navigation.navigate('MyAccount');
        }
        else{
          setTimeout(() => {
            navigation.navigate('Main');
          }, 100);
        }
      } else {
        setError(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderDropdown = (items, selectedValue, onValueChange) => (
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => navigation.goBack()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {type === 'edit' &&
            <View style={styles.modalHeader}>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
            }
          
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>{type === 'edit' ? 'Update Your Profile':'Complete Your Profile'}</Text>
              <Text style={styles.subtitle}>Please provide your details to continue</Text>

              <View style={styles.form}>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Full Name*</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChangeText={(text) => handleFormChanges('fullName', text)}
                  />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email (optional)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChangeText={(text) => handleFormChanges('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Role Dropdown */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Role*</Text>
                  {renderDropdown(
                    roles,
                    formData.role,
                    (value) => handleFormChanges('role', value),
                    'Select Role'
                  )}
                </View>

                {/* State Dropdown */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>State*</Text>
                  <Picker
                    selectedValue={formData.state}
                    onValueChange={(itemValue) => handleFormChanges('state', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select a State" value="" />
                    {IndianStates.sort().map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </View>

                {/* District Dropdown */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>District*</Text>
                  <Picker
                    selectedValue={formData.district}
                    onValueChange={(itemValue) => handleFormChanges('district', itemValue)}
                    style={styles.picker}
                    // enabled={optionDistrict.length > 0}
                  >
                    <Picker.Item label="Select a District" value="" />
                    {optionDistrict.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </View>

                {/* Block Dropdown */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Block*</Text>
                  <Picker
                    selectedValue={formData.block}
                    onValueChange={(itemValue) => handleFormChanges('block', itemValue)}
                    style={styles.picker}
                    // enabled={!!formData.district}
                  >
                    <Picker.Item label="Select a Block" value="" />
                    {optionBlock.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </View>

                {/* Agreement Checkbox */}
                <View style={styles.checkboxContainer}>
                  <CustomCheckbox
                    value={agreed}
                    onValueChange={setAgreed}
                  />
                  <Text style={styles.checkboxLabel}>
                    I agree to the Terms and Conditions
                  </Text>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity 
                  style={[styles.button, (!agreed || loading) && styles.buttonDisabled]} 
                  onPress={handleSubmit}
                  disabled={!agreed || loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.buttonText}>Continue</Text>
                  )}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: height * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#388e3c',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#388e3c',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    gap: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  button: {
    backgroundColor: '#388e3c',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});

export default UpdateProfileScreen; 