import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon

const tabs = ['Verified', 'Not Verified', 'Rejected'];

const sampleProducts = {
  Verified: [
    {
      id: '1',
      image: 'https://via.placeholder.com/100',
      title: 'Product 1',
      description: 'This is a verified product.',
      price: '$10',
      createdDate: '2025-03-01',
      status: 'Available',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/100',
      title: 'Product 2',
      description: 'This is another verified product.',
      price: '$20',
      createdDate: '2025-03-02',
      status: 'Out of Stock',
    },
  ],
  'Not Verified': [
    {
      id: '3',
      image: 'https://via.placeholder.com/100',
      title: 'Product 3',
      description: 'This product is not verified.',
      price: '$15',
      createdDate: '2025-03-03',
      status: 'Pending',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/100',
      title: 'Product 4',
      description: 'Another unverified product.',
      price: '$25',
      createdDate: '2025-03-04',
      status: 'Pending',
    },
  ],
  Rejected: [
    {
      id: '5',
      image: 'https://via.placeholder.com/100',
      title: 'Product 5',
      description: 'This product was rejected.',
      price: '$30',
      createdDate: '2025-03-05',
      status: 'Rejected',
    },
    {
      id: '6',
      image: 'https://via.placeholder.com/100',
      title: 'Product 6',
      description: 'Another rejected product.',
      price: '$35',
      createdDate: '2025-03-06',
      status: 'Rejected',
    },
  ],
};

const MyStore = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // Function to Render Product Cards
  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <Text style={styles.cardDate}>Created: {item.createdDate}</Text>
        <Text
          style={[
            styles.cardStatus,
            item.status === 'Available' && styles.statusAvailable,
            item.status === 'Out of Stock' && styles.statusOutOfStock,
            item.status === 'Pending' && styles.statusPending,
            item.status === 'Rejected' && styles.statusRejected,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Store</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton, // Active Tab Style
            ]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <FlatList
        key={activeTab} // Force re-render when the active tab changes
        data={sampleProducts[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={renderProductCard}
        contentContainerStyle={styles.cardList}
      />
    </SafeAreaView>
  );
};

export default MyStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f0f0f0', // Default background for inactive tabs
  },
  activeTabButton: {
    backgroundColor: '#38a169', // Background for active tab
  },
  tabText: {
    fontSize: 16,
    color: '#a0aec0', // Default text color for inactive tabs
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff', // Text color for active tab
    fontWeight: 'bold',
  },
  cardList: {
    padding: 10,
  },
  card: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: 'gray',
    borderWidth: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#38a169',
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statusAvailable: {
    color: '#38a169',
  },
  statusOutOfStock: {
    color: '#e53e3e',
  },
  statusPending: {
    color: '#d69e2e',
  },
  statusRejected: {
    color: '#e53e3e',
  },
});