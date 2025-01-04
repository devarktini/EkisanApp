import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button } from 'react-native';

const OnLandingScreen = () => {
    const navigation = useNavigation();

    // You can add any logic or UI elements here for the landing screen.
 const onGoToHome = () => {
        navigation.navigate('Main');
    };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>Welcome to the Landing Page</Text>
      <Text className="text-gray-500 mt-4">This is your landing page after onboarding.</Text>
      <Button title="Go to Home" onPress={onGoToHome} />
    </View>
  );
};

export default OnLandingScreen;