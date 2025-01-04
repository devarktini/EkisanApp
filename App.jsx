import 'react-native-gesture-handler';
import React, { useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import * as SplashScreen from "expo-splash-screen";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from './src/components/SplashScreen ';
import OnboardingScreen from './src/screens/OnboardingScreen ';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, TouchableOpacity } from 'react-native';
import "./global.css"
import OnLandingScreen from './src/screens/OnLandingScreen';
const Stack = createStackNavigator();
export default function App() {
 
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  const handleSplashFinish = () => {
    setSplashVisible(false);
  };

  // Wait until AsyncStorage is checked before rendering the app
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem('alreadyLaunched');
        if (value == null) {
          setIsFirstLaunch(true);
          await AsyncStorage.setItem('alreadyLaunched', 'true');
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.log('Error checking first launch: ', error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isFirstLaunch === null) {
    // Return null or a loading spinner while checking the first launch
    return null;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isFirstLaunch ? (
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : (
            <>
            <Stack.Screen name="Landing" component={OnLandingScreen} />
            <Stack.Screen name="Main" component={DrawerNavigator} />
            </>
            
            // <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
