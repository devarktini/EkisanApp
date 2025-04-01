import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Ensure you have this package installed
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  verifyOtp,
  sendOtp,
  handleResendOtp,
} from "../services/2FectorAuthService"; // Import the verifyOtp, sendOtp, and handleResendOtp functions
import { AppContext } from "../context/AppContext";
import {
  saveUserInDatabase,
  signInAnonymouslyToFirebase,
} from "../services/authservice";

const AuthOtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber } = route.params; // Get the phone number from the previous screen
  const { login } = useContext(AppContext);

  // Create refs for the input fields
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");

    // Join the OTP array into a single string
    const otpString = otp.join("");

    // Validate OTP (for 6 digits)
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }
    try {
      // Call the verifyOtp function
      // const response = await verifyOtp(phoneNumber, otpString);
      const response = { Status: true }; // Mock response for testing
      if (!response.Status) {
        setError("Invalid OTP. Please try again.");
        setLoading(false);
      } else {
        var authResponse = await signInAnonymouslyToFirebase(phoneNumber);
        if (authResponse.success) {
          const userData = authResponse.userData;
          setUserData(authResponse.userData);
          // await saveUserInDatabase(authResponse.user.uid, phoneNumber);
          await login(
            authResponse.token,
            authResponse.user,
            authResponse.userData,
            authResponse.refreshToken,
          );
          // Check if it's a first-time user or if profile is incomplete
          if (authResponse.isFirstTimeUser) {
            navigation.navigate("UpdateProfile", {
              user: userData.phoneNumber || phoneNumber,
            });
          } else {
            navigation.navigate("Main", {
              user: userData.phoneNumber || phoneNumber,
            });
          }
        } else {
          setError("Login failed. Please try again.");
        }
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    // Move to the next input if the current input is filled
    if (text.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus(); // Focus the next input
    } else if (text.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus(); // Focus the previous input
      newOtp[index - 1] = ""; // Clear the previous input
    }

    setOtp(newOtp);
  };

  const handleResendOtps = async () => {
    const otpTemplateName = "OTP1";
    setLoading(true);
    setError("");
    setOtp(["", "", "", "", "", ""]); // Clear the OTP input fields

    try {
      // Call the handleResendOtp function to resend the OTP
      const response = await handleResendOtp(phoneNumber, otpTemplateName); // Assuming handleResendOtp takes phoneNumber as a parameter
      // Optionally, show a success message or alert here
    } catch (err) {
      setError(err.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#4caf50", "#388e3c"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.description}>
          A verification code has been sent to {phoneNumber}.
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.otpInput,
                {
                  borderColor: error ? "#ff0000" : digit ? "#388e3c" : "#ccc",
                },
              ]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRefs[index]}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace" && digit === "") {
                  if (index > 0) {
                    inputRefs[index - 1].current.focus();
                    const newOtp = [...otp];
                    newOtp[index - 1] = "";
                    setOtp(newOtp);
                  }
                }
              }}
              selectionColor="#388e3c"
              autoComplete="off"
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerifyOtp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendOtps}>
          <Text style={styles.footerText}>
            Didn't receive the code? Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    maxWidth: 400, // Add maximum width for larger screens
    padding: "5%",
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#388e3c",
    marginBottom: "3%",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: "5%",
    textAlign: "center",
    paddingHorizontal: "2%",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
    width: "100%",
    gap: 8, // Add gap between inputs
  },
  otpInput: {
    flex: 1,
    aspectRatio: 1, // Makes the input square
    maxWidth: 55, // Maximum width for larger screens
    minWidth: 40, // Minimum width for smaller screens
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#fff",
    padding: 0, // Remove padding to prevent layout issues
  },
  error: {
    color: "red",
    marginBottom: "3%",
    textAlign: "center",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#3b5998",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: "3%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: "5%",
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});

export default AuthOtpScreen;
