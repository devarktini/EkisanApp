import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, ImageBackground  } from 'react-native';
import BackgroundImage from '../../src/assets/agricultures.jpeg';

const OnLandingScreen = () => {
    const navigation = useNavigation();

    // You can add any logic or UI elements here for the landing screen.
 const onGoToHome = () => {
        navigation.navigate('Main');
    };
  return (
    <View className=" relative h-full w-full">
    <ImageBackground
      source={BackgroundImage}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover" // Ensure the image covers the entire screen
    >
      {/* Overlay with semi-transparent background for better text readability */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for readability
        }}
      />

      {/* Content */}
      <View className =" absolute bottom-[10%]">

      
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-2xl font-bold text-white mt-4 text-center">
          Welcome to the Landing Page
        </Text>
        <Text className="text-white text-lg mt-2 text-center">
          This is your landing page after onboarding.
        </Text>

        {/* Button to go to Main screen (Home) */}
        <View className=" mt-6">
        <Button
         
          title="Get Started"
          onPress={onGoToHome}
          color="#548d22" // Button text color
        />
        </View>
      </View>
      </View>
    </ImageBackground>
        </View>
  );
};

export default OnLandingScreen;