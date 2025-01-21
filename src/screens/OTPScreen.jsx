import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { getAuth } from "firebase/auth"; // Import from modular SDK
import { auth } from "../firebase/firebase"; // Adjust the path to your firebase config file

const OTPScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(60);
  const { confirmation } = route.params;

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleOtpChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    if (cleanedText.length <= 6) {
      setOtp(cleanedText);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      setLoading(true);
      try {
        await confirmation.confirm(otp);
        setLoading(false);
        navigation.navigate("Main");
      } catch (error) {
        setLoading(false);
        Alert.alert("Error", "Invalid OTP");
      }
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>Enter OTP</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 20 }}
        placeholder="123456"
        keyboardType="number-pad"
        value={otp}
        onChangeText={handleOtpChange}
        maxLength={6}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#048404", borderRadius: 25, padding: 15, marginBottom: 20 }}
        onPress={handleVerifyOtp}
        disabled={otp.length !== 6 || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default OTPScreen;