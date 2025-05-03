import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartProvider } from "./src/context/CartContext"; // Import the CartProvider
import { FarmProvider } from "./src/context/FarmContext"; // Import the FarmProvider
import AppNavigator from "./src/navigation/AppNavigator"; // Use the updated AppNavigator
import SplashScreen from "./src/components/SplashScreen"; // Import the SplashScreen component
import { ActivityIndicator, View } from "react-native"; // Import ActivityIndicator for loading state
import "./global.css";
import Toast from 'react-native-toast-message';
import { AppProvider } from "./src/context/AppContext";
import { ProgressProvider } from "./src/context/ProgressContext";
import GlobalProgressBar from "./src/components/GlobalProgressBar";
import { LoaderProvider } from "./src/context/LoaderContext";
import { CorporateProvider } from './src/context/CorporateContext';

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false); // Initialize to false

  const handleSplashFinish = () => setSplashVisible(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("alreadyLaunched");
        if (value === null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem("isFirstLaunch", "true");
          await AsyncStorage.setItem("alreadyLaunched", "true");
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
       
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
      <NavigationContainer>
        <ProgressProvider>
          <LoaderProvider>
            <GlobalProgressBar />
            <AppProvider>
              <FarmProvider>
                <CartProvider>
                  <CorporateProvider>
                    <AppNavigator isFirstLaunch={isFirstLaunch} />
                  </CorporateProvider>
                </CartProvider>
              </FarmProvider>
            </AppProvider>
          </LoaderProvider>
        </ProgressProvider>
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}