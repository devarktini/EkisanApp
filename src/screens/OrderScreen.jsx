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
      const userOrders = await fetchOrdersByUserId(userData.uid);
      console.log("sssssss", userOrders)

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
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

  
        <ScrollView style={styles.orderList}>
          {orders?.length > 0 ? (
            orders?.map((order, index) => (
          <View key={index} style={styles.orderCard}>
            <Text style={styles.orderTitle}>Order ID : {order?.orderId}</Text>
            <Text style={styles.orderDetail}>Total: ₹{order?.total}</Text>
            <Text style={styles.orderDetail}>Quantity: {order?.quantity}</Text>
            <Text style={styles.orderDetail}>Date: {new Date(order.timeStamp).toLocaleString()}</Text>
          
              <View  style={styles.itemContainer}>
              <Image source={{ uri: order.imgUrl }} className="w-24 h-24 rounded-lg" />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{order?.name}</Text>
              <Text style={styles.productPrice}>₹{order?.price ? order.price : '0.00'}</Text>
            </View>
              </View>
            {/* ))} */}
            </View>
          ))
        ) : (
          <View style={styles.emptyOrders}>
            <Text style={styles.emptyOrdersText}>You have no orders.</Text>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
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
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDetail: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
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
    paddingLeft:6,
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  emptyOrders: {
    padding: 16,
    alignItems: 'center',
  },
  emptyOrdersText: {
    fontSize: 16,
    color: '#888',
  },
});

export default OrderScreen;