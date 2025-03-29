import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for arrows and back button

const faqData = [
  {
    question: 'What is Ekisan?',
    answer: 'Ekisan is a platform that connects farmers with buyers for agricultural products.',
  },
  {
    question: 'How can I sell my products?',
    answer: 'You can sell your products by registering on the platform and listing your items.',
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We support various payment methods, including UPI, credit/debit cards, and net banking.',
  },
  {
    question: 'How do I track my orders?',
    answer: 'You can track your orders in the "My Orders" section of the app.',
  },
];

const FQScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const animatedHeights = useRef(faqData.map(() => new Animated.Value(0))).current;

  const toggleCollapse = (index) => {
    if (activeIndex === index) {
      // Collapse the currently active item
      Animated.timing(animatedHeights[index], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setActiveIndex(null));
    } else {
      // Collapse the previously active item
      if (activeIndex !== null) {
        Animated.timing(animatedHeights[activeIndex], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
      // Expand the new item
      Animated.timing(animatedHeights[index], {
        toValue: 100, // Adjust this value based on the expected height of the answer
        duration: 300,
        useNativeDriver: false,
      }).start();
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
      </View>

      {/* FAQ List */}
      <ScrollView style={styles.content}>
        {faqData.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity onPress={() => toggleCollapse(index)} style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={activeIndex === index ? 'chevron-down' : 'chevron-forward'}
                size={20}
                color="#333"
              />
            </TouchableOpacity>
            <Animated.View style={[styles.answerContainer, { height: animatedHeights[index] }]}>
              <Text style={styles.answer}>{item.answer}</Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FQScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  faqItem: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  answerContainer: {
    overflow: 'hidden',
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
});