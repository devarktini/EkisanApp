import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

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
      navigation.navigate('Landing'); // Redirect to main app after onboarding
    }
  };

  const handleSkip = () => {
    navigation.navigate('Landing'); // Redirect to main app if skipped
  };

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1 items-center mt-[50%] justify-center">

     
      <ScrollView   contentContainerStyle={styles.scrollView}>
        <Image  source={steps[currentStep].image} style={styles.image} />
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text className="text-center text-4xl" style={styles.subtitle}>{steps[currentStep].subtitle}</Text>
      </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        {currentStep !== steps.length - 1 && (
          <View style={styles.skipButtonContainer}>
            <Text style={styles.skipButtonText} onPress={handleSkip}>Skip</Text>
          </View>
        )}

        <Button
        className="flex-1 items-center justify-center text-red-600"
          title={currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={[styles.button, { alignSelf: 'flex-end' }]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007540',
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#007540',
  },
});

export default OnboardingScreen;

