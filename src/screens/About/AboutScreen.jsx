import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // For back button icon

const AboutScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* About Section */}
        <Text style={styles.sectionTitle}>Who We Are</Text>
        <Text style={styles.text}>
          Welcome to eKisan Darshan! We are a platform dedicated to empowering farmers by providing
          them with the tools and resources they need to succeed. Our mission is to bridge the gap
          between farmers and technology, enabling sustainable agricultural practices and better
          market access.
        </Text>

        {/* Mission Section */}
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.text}>
          Our mission is to revolutionize the agricultural sector by offering innovative solutions
          that improve productivity, reduce costs, and enhance the livelihoods of farmers. We aim to
          create a sustainable ecosystem where farmers can thrive.
        </Text>

        {/* Vision Section */}
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.text}>
          Our vision is to become the leading platform for farmers, providing them with access to
          cutting-edge technology, expert advice, and a global marketplace. We envision a future
          where every farmer has the tools they need to succeed.
        </Text>

        {/* Team Section */}
        <Text style={styles.sectionTitle}>Our Team</Text>
        <Text style={styles.text}>
          Our team is composed of passionate individuals who are committed to making a difference in
          the lives of farmers. From agricultural experts to technology enthusiasts, we work
          together to bring you the best solutions.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f8f8f8",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#048404",
    marginBottom: 8,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
});