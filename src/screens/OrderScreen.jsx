import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { fetchOrders, fetchOrdersByUserId, getUserOrders } from '../services/OrderService';

const OrderScreen = () => {
  const navigation = useNavigation();
  const { user, userData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersList = async () => {
      const userOrders = await fetchOrdersByUserId(userData.uid || userData.userId);
  

      setOrders(userOrders);
    };
    fetchOrdersList();
  }, [userData.uid]);

 

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Main')}>
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View>
        </View>
      </View>

      <ScrollView style={styles.orderList}>
        {orders?.length > 0 ? (
          orders?.map((order, index) => (
            <View key={index} style={styles.orderCard}>
              {/* Order Header */}
              <View style={styles.orderHeader}>
                <View style={styles.orderStatus}>
                  <Ionicons name="cart" size={20} color="#048404" />
                  <Text style={styles.orderIdText}>#{order?.orderId}</Text>
                </View>
                <Text style={styles.orderDate}>
                  {new Date(order.timeStamp).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </Text>
              </View>

              {/* Product Details */}
              <View style={styles.itemContainer}>
                <Image 
                  source={{ uri: order.imgUrl }} 
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {order?.name}
                  </Text>
                  <Text style={styles.quantityText}>
                    Quantity: {order?.quantity}/ {order?.unit}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>₹{order?.price}</Text>
                    <Text style={styles.totalAmount}>Total: ₹{order?.price}</Text>
                  </View>
                </View>
              </View>

              {/* Order Footer */}
              <View style={styles.orderFooter}>
                <TouchableOpacity 
                  style={styles.trackButton}
                  onPress={() => navigation.navigate('trackorder', { orderDetails: order, type:'buyer' })}
                >
                  <Ionicons name="location-outline" size={18} color="#048404" />
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.reorderButton}>
                  <Ionicons name="repeat-outline" size={18} color="#fff" />
                  <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity> */}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyOrders}>
            <Ionicons name="cart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyOrdersText}>No orders yet</Text>
            <TouchableOpacity 
              style={styles.shopNowButton}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.shopNowText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  homeButton: {
    padding: 8,
  },
  orderList: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderIdText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    paddingLeft: 6,
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#048404',
    borderRadius: 8,
  },
  trackButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#048404',
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#048404',
    borderRadius: 8,
  },
  reorderButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#fff',
  },
  emptyOrders: {
    padding: 16,
    alignItems: 'center',
  },
  emptyOrdersText: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  shopNowButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#048404',
    borderRadius: 8,
  },
  shopNowText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderScreen;