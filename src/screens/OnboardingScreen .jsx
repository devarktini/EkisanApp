import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';

const OnboardingScreen = () => {
    const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to the App',
      subtitle: 'Get started with our amazing app!',
      image: require('../../assets/splash.png'),
    },
    {
      title: 'Easy to Use',
      subtitle: 'Everything is simple and user-friendly.',
      image: require('../../assets/splash.png'),
    },
    {
      title: 'Get Started!',
      subtitle: 'Explore all the features now!',
      image: require('../../assets/splash.png'),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigation.navigate('HomeTabs'); // Redirect to main app after onboarding
    }
  };

  const handleSkip = () => {
    navigation.navigate('HomeTabs'); // Redirect to main app if skipped
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={steps[currentStep].image} style={styles.image} />
      <Text className="text-xl font-bold text-red-500" >{steps[currentStep].title}</Text>
      <Text style={styles.subtitle}>{steps[currentStep].subtitle}</Text>

      {currentStep !== steps.length - 1 && (
        <Button className={""} title="Skip" onPress={handleSkip} />
      )}

      <Button
        title={currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
        onPress={handleNext}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default OnboardingScreen;
