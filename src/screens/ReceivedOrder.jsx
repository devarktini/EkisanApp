import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { fetchReceivedOrders } from '../services/OrderService';
import { AppContext } from '../context/AppContext';

const ReceivedOrder = ({ navigation }) => {
  const { userData } = useContext(AppContext);
  const [receivedOrders, setReceivedOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch received orders
        const receivedResponse = await fetchReceivedOrders(userData);
        setReceivedOrders(receivedResponse);
       
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

const renderOrderCard = ({ item }) => (
    <View style={styles.card}>
        {/* Product Image */}
        <Image source={{ uri: item.item.imgUrl }} style={styles.productImage} />

        {/* Order Details */}
        <View style={styles.cardContent}>
            <Text style={styles.productName}>{item.item.name}</Text>
            <Text style={styles.productCategory}>{item.item.category}</Text>
            <Text style={styles.productDescription} numberOfLines={2}>
                {item.item.description}
            </Text>

            {/* Buyer Details */}
            <View style={styles.buyerDetails}>
                <Text style={styles.buyerName}>
                    Buyer: {item.buyerName} ({item.buyerMobile})
                </Text>
                <Text style={styles.buyerLocation}>
                    {item.BuyerDistrict}, {item.BuyerState}
                </Text>
            </View>

            {/* Order Info */}
            <View style={styles.orderInfo}>
                <Text style={styles.orderQuantity}>
                    Quantity: {item.quantity} {item.item.unit}
                </Text>
                <Text style={styles.orderPrice}>
                    Price: ₹{item.item.price * item.quantity}
                </Text>
            </View>

            {/* Order Status */}
            <Text style={styles.orderStatus}>
                Status: {item.orderStatus.charAt(0).toUpperCase() + item.orderStatus.slice(1)}
            </Text>
        </View>

        {/* Track Button */}
        <TouchableOpacity
            style={styles.trackButton}
            onPress={() => navigation.navigate('trackorder', { orderDetails: item })}
        >
            <Ionicons name="location-outline" size={20} color="#fff" />
            <Text style={styles.trackButtonText}>Track</Text>
        </TouchableOpacity>
    </View>
);

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className=" text-center" style={styles.header}>Received Orders</Text>
      </View>

      {/* Order List */}
      {receivedOrders.length > 0 ? (
        <FlatList
          data={receivedOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderCard}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noOrdersText}>No orders available.</Text>
      )}
    </View>
  );
};

export default ReceivedOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems:'center',
    justifyContent:'center',
    color: 'black',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  buyerDetails: {
    marginBottom: 8,
  },
  buyerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  buyerLocation: {
    fontSize: 12,
    color: '#666',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderQuantity: {
    fontSize: 14,
    color: '#333',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#048404',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#048404',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  noOrdersText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});