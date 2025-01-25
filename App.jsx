// App.js
// import "expo-firebase-recaptcha/shims";
// import "react-native-get-random-values";
// import "@react-native-polyfills/base64";

import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartProvider } from "./src/context/CartContext"; // Import the CartProvider
import AppNavigator from "./src/navigation/AppNavigator"; // Use the updated AppNavigator
import SplashScreen from "./src/components/SplashScreen ";
import { ActivityIndicator, View } from "react-native"; // Import ActivityIndicator for loading state
import "./global.css";
import Toast from 'react-native-toast-message';
import { toastConfig } from './toastConfig';
export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false); // Initialize to false

  const handleSplashFinish = () => setSplashVisible(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("alreadyLaunched");
        console.log("First Launch Value:", value); // Debug log
        if (value === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem("alreadyLaunched", "true");
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.log("Error checking first launch: ", error);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isFirstLaunch === null) {
    // Render a loading spinner or placeholder while checking the first launch status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator isFirstLaunch={isFirstLaunch} />
        </NavigationContainer>
      </CartProvider>
      <Toast config={toastConfig} />
    </SafeAreaProvider>
  );
}