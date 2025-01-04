import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Splash screen duration (3 seconds)
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash.png")} // Replace with your splash image path
        style={styles.image}
      />
      <Text style={styles.text}>EKisan Darshan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Background color
  },
  image: {
    width: 200, // Adjust the size of your image
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
});

export default SplashScreen;
