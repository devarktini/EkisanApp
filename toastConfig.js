// toastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const toastConfig = {
  success: ({ text1, props }) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{text1}</Text>
      <Text style={styles.toastSubText}>{props.productName} added to cart!</Text>
    </View>
  ),
  wishlist: ({ text1, props }) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastText}>{text1}</Text>
      <Text style={styles.toastSubText}>{props.productName} added to wishlist!</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastSubText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});