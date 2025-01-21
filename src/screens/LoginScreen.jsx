import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Adjust the path to your firebase config file

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    if (cleanedText.length <= 10) {
      setPhoneNumber(cleanedText);
    }
  };

  const handleLogin = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        const formattedPhoneNumber = `+91${phoneNumber}`; // Adjust country code as needed
        const authInstance = getAuth(); // Get the auth instance
        const confirmation = await signInWithPhoneNumber(authInstance, formattedPhoneNumber); // Use modular function
        setLoading(false);
        console.log("Confirmation object:", confirmation); // Debugging: Log the confirmation object
        navigation.navigate("OtpScreen", { confirmation });
      } catch (error) {
        setLoading(false);
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Invalid Input", "Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>Login</Text>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Welcome Back!</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 20 }}
        placeholder="Enter your mobile number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        maxLength={10}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#048404", borderRadius: 25, padding: 15, marginBottom: 20 }}
        onPress={handleLogin}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;