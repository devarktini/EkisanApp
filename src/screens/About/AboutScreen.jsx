import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
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
        {/* Image Section */}
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }} // Replace with the actual image URL
          style={styles.headerImage}
        />

        {/* About Button */}
        <TouchableOpacity style={styles.aboutButton}>
          <Text style={styles.aboutButtonText}>About eKisan Darshan</Text>
        </TouchableOpacity>

        {/* Description Section */}
        <Text style={styles.sectionTitle}>
          eKisan Darshan Stands For The Larger Purpose:
        </Text>
        <Text style={styles.text}>
          <Text style={styles.highlight}>eKisan Darshan</Text> is a platform dedicated to empowering
          farmers by providing them with tools, resources, and market access to succeed in the
          agricultural sector. Farmers can connect with buyers, sellers, and service providers to
          enhance their productivity and profitability.
        </Text>
        <Text style={styles.text}>
          Our platform caters to farmers, agricultural professionals, suppliers, and distributors,
          fostering an ecosystem where modern agricultural practices and technologies are accessible
          to everyone. We aim to create a sustainable and inclusive agricultural system for every
          farmer in India.
        </Text>

        {/* Our Genesis Section */}
        <View style={styles.genesisSection}>
          <Text style={styles.genesisTitle}>Our Genesis</Text>
          <Text style={styles.text}>
            We strongly believe that every farmer in our country has the potential to achieve
            greater productivity and profitability with access to the right tools, resources, and
            market opportunities. However, challenges such as limited access to modern equipment,
            fragmented markets, and lack of information often hinder their progress.
          </Text>
          <Text style={styles.text}>
            eKisan Darshan was created to bridge this gap by providing a platform that connects
            farmers with buyers, sellers, and service providers, enabling them to adopt modern
            agricultural practices and achieve sustainable growth.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>01 Our Mission</Text>
          </View>
          <View style={styles.cardContent}>
            <Ionicons name="leaf-outline" size={40} color="#048404" />
            <Text style={styles.cardText}>
              To empower farmers by providing access to modern agricultural tools, resources, and
              market opportunities, enabling them to achieve sustainable growth and profitability.
            </Text>
          </View>
        </View>

        {/* Vision Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>02 Our Vision</Text>
          </View>
          <View style={styles.cardContent}>
            <Ionicons name="eye-outline" size={40} color="#048404" />
            <Text style={styles.cardText}>
              Our vision is to revolutionize the agricultural sector by creating a platform that
              connects farmers with the global market, promotes sustainable practices, and ensures
              equitable growth for all stakeholders in the agricultural ecosystem.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  aboutButton: {
    backgroundColor: "#048404",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  aboutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  highlight: {
    color: "#048404",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: "#048404",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 16,
    alignItems: "center",
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  genesisSection: {
    backgroundColor: "#e8f5e9",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  genesisTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#048404",
    marginBottom: 8,
  },
});