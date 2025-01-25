import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { getAuth, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../../firebase.config"; // Adjust the path to your firebase config file

const OTPScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const { verificationId } = route.params;

  const handleOtpChange = (text) => {
    setOtp(text);
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      setLoading(true);
      try {
        console.log("verificationId:", verificationId); // Debugging: Log the verificationId
        console.log("otp:", otp);
        // Create the phone Auth credential with the verificationId and the OTP
        const credential = PhoneAuthProvider.credential(verificationId.verificationId, otp);
        
        // Sign in with the credential
        const userCredential = await signInWithCredential(auth, credential);
        setLoading(false);
        console.log("User signed in successfully:", userCredential.user);
        
        // Navigate to the home screen or wherever you want after successful login
        navigation.navigate("HomeScreen"); // Replace "HomeScreen" with your desired screen
      } catch (error) {
        setLoading(false);
        console.error("Error during OTP verification:", error.message);
        Alert.alert("Error", "Failed to verify OTP. Please try again.");
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={handleOtpChange}
        maxLength={6}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#048404",
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
