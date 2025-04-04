import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useProgress } from "../context/ProgressContext";

const GlobalProgressBar = () => {  
  const { progress, visible } = useProgress();
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  if (!visible) return null; // Hide progress overlay when not visible

  return (
    <View style={styles.overlay}>
      {/* Background Overlay to Block Interaction */}
      <View style={styles.backgroundOverlay} />

      {/* Progress Bar Container */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>

      {/* Loading Spinner (Optional) */}
      {/* <ActivityIndicator size="large" color="#048404" style={{transform: [{scale: 2}]}} /> */}
      <Text style={{color: "#FFFFFF", fontSize: 20, marginTop: 10}}>Loading data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9000, // Ensure it appears on top
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  progressContainer: {
    width: "80%",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#048404", // Progress bar color
  },
});

export default GlobalProgressBar;
