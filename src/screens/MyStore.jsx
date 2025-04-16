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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { AppContext } from '../context/AppContext';
import { fetchRejectedProducts, fetchItemToVerify, fetchProducts } from '../services/productService';
import filterProduct from '../services/filterProduct';
import AddProduct from './AddProduct';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window'); // Get screen width for responsive design
const tabs = [ 'Verified', 'Pending', 'Rejected', 'Rent'];

const MyStore = ({ navigation }) => {
  const { userData } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [verifiedProducts, setVerifiedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [rentProducts, setRentProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


 

  useEffect(() => {
    const fetchProductss = async () => {
      try {
        // Fetch rejected products
        const rejectedResponse = await fetchRejectedProducts(userData.uid || userData.userId);
        setRejectedProducts(rejectedResponse);
        // Fetch pending and verified products
        const verifyingResponse = await fetchItemToVerify(userData.uid || userData.uiId);
        const verified = await fetchProducts({})
        const RentProduct = verifyingResponse.filter((item) => item.isRented === true);
        const pending = verifyingResponse.filter((item) => item.status === 'pending');
        // Fetch received orders
        const filteredProducts = filterProduct({
          verified,
          filterBy: "seller",
          sellerUID: userData.uid || userData.userId,
        });
        console.log("dddddddd", rejectedResponse)
        setRentProducts(RentProduct)
        setVerifiedProducts(filteredProducts);
        setPendingProducts(pending);

    
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProductss();
  }, []);

  // Function to Render Product Cards
  const renderProductCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imgUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title? item.title : item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.cardPrice}>Price: ₹{item.price? item.price : item.rentPrice}</Text>
        <Text style={styles.cardDate}>Created: {item.createdDate? item.createdDate : item.createdAt}</Text>
        
        {/* Show rejection reason if product is rejected */}
        {item.status === 'pending' && item.reason && (
          <View style={styles.rejectionContainer}>
            <Text style={styles.rejectionLabel}>Rejection Reason:</Text>
            <Text style={styles.rejectionText}>{item.reason}</Text>
          </View>
        )}

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
      case 'Verified':
        return verifiedProducts;
      case 'Pending':
        return pendingProducts;
      case 'Rejected':
        return rejectedProducts;
        case 'Rent':
        return rentProducts;
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
        {tabs.map((tab) => {
          if(userData.userType === "corporate" && tab === 'Rent') return null;
          return (
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
          )
        })}
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

      <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <AddProduct setIsModalVisible={setIsModalVisible} />
                  <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setIsModalVisible(true)}
      >
        <LinearGradient
          colors={['#048404', '#38a169']}
          style={styles.fabGradient}
        >
          <Ionicons name="add" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
            
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabGradient: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '90%', height: '95%', backgroundColor: 'white', borderRadius: 10, padding: 10, alignItems: 'center' },
  closeButton: { backgroundColor: '#048404', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  closeButtonText: { color: 'white', fontWeight: 'bold' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  rejectionContainer: {
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 6,
    marginVertical: 5,
  },
  rejectionLabel: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  rejectionText: {
    color: '#7F1D1D',
    fontSize: 12,
  },
});