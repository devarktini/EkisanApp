import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from "react-native";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth, app } from "../../firebase.config"; // Adjust the path to your firebase config file
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { Button } from "react-native";
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (text) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    if (cleanedText.length <= 10) {
      setPhoneNumber(cleanedText);
    }
  };

  const auth = getAuth(app);
  const recaptchaVerifier = useRef(null);

  const handleLogin = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        const formattedPhoneNumber = `+91${phoneNumber}`; // Adjust country code as needed
        const verificationId = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifier.current);
        console.log("verificationId:", verificationId);
         setLoading(false);
        console.log("Confirmation object:", verificationId); // Debugging: Log the confirmation object
        navigation.navigate("OtpScreen", { verificationId });
      } catch (error) {
        if (error.code === "auth/too-many-requests") {
          console.error("Too many requests! Please try again later.");
          alert("Too many attempts! Please wait before trying again.");
        } else {
          console.error("Error during phone auth:", error.message);
          Alert.alert("Error", error.message);
        }
        setLoading(false);
        
      }
    } else {
      Alert.alert("Invalid Input", "Please enter a valid 10-digit phone number.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
            <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
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
  },
});