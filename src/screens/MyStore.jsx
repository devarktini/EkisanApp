import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { AppContext } from '../context/AppContext';
import { fetchRejectedProducts, fetchItemToVerify } from '../services/productService';
import { fetchReceivedOrders } from '../services/OrderService';

const { width } = Dimensions.get('window'); // Get screen width for responsive design
const tabs = ['Received Order', 'Verified', 'Pending', 'Rejected'];

const MyStore = ({ navigation }) => {
  const { userData } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [verifiedProducts, setVerifiedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch rejected products
        const rejectedResponse = await fetchRejectedProducts(userData.uid);
        setRejectedProducts(rejectedResponse);

        // Fetch pending and verified products
        const verifyingResponse = await fetchItemToVerify(userData.uid);
        const verified = verifyingResponse.filter((item) => item.status === 'verified');
        const pending = verifyingResponse.filter((item) => item.status === 'pending');

        // Fetch received orders
        const receivedResponse = await fetchReceivedOrders(userData);
        setReceivedOrders(receivedResponse);

        setVerifiedProducts(verified);
        setPendingProducts(pending);

        console.log('Verified Products:', verified);
        console.log('Pending Products:', pending);
        console.log('Rejected Products:', rejectedResponse);
        console.log('Received Orders:', receivedOrders);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to Render Product Cards
  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.cardPrice}>Price: ₹{item.price}</Text>
        <Text style={styles.cardDate}>Created: {item.createdDate}</Text>
        <Text
          style={[
            styles.cardStatus,
            item.status === 'verified' && styles.statusAvailable,
            item.status === 'pending' && styles.statusPending,
            item.status === 'rejected' && styles.statusRejected,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  // Determine which data to display based on the active tab
  const getTabData = () => {
    switch (activeTab) {
      case 'Received Order':
        return receivedOrders;
      case 'Verified':
        return verifiedProducts;
      case 'Pending':
        return pendingProducts;
      case 'Rejected':
        return rejectedProducts;
      default:
        return [];
    }
  };

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
      <ScrollView>
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
            <Text className=" whitespace-nowrap" style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      </ScrollView>

      {/* Tab Content */}
      <FlatList
        key={activeTab} // Force re-render when the active tab changes
        data={getTabData()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductCard}
        contentContainerStyle={styles.cardList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products available in this category.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default MyStore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#38a169',
  },
  tabText: {
    
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#38a169',
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
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardImage: {
    width: '100%',
    height: width * 0.4, // Responsive height based on screen width
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#38a169',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  cardStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statusAvailable: {
    color: '#38a169',
  },
  statusPending: {
    color: '#d69e2e',
  },
  statusRejected: {
    color: '#e53e3e',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});