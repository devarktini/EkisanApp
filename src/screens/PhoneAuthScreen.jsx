import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { sendOtp } from '../services/2FectorAuthService';
import { getAuthToken, getUserData } from '../asyncStorege/authStorage';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSendCode = async () => {
    setLoading(true);
    setError('');

    // Validate phone number
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }

    // Replace with your actual API key
    const otpTemplateName = 'OTP1'; // Replace with your actual template name
    try {
      console.log("EXISTING USER ", existingUser)
      // Call the sendOtp function
      // await sendOtp(`+91${phoneNumber}`, otpTemplateName);
      // Navigate to OTP screen
      navigation.navigate('OtpVerify', { phoneNumber: `+91${phoneNumber}` });
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#4caf50', '#388e3c']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={require('../../assets/splashscreen_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome To ekisan</Text>
        <Text style={styles.description}>Enter your phone number to receive a verification code.</Text>
        
        <View style={styles.inputContainer}>
          <Image source={require('../../assets/Flag_of_India.png')} style={styles.flag} />
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your 10-digit phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor="#888"
          />
        </View>
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSendCode} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Verification Code</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    padding: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#388e3c',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default PhoneAuthScreen;