import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useContext, useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { clearUserCart, placeOrderInFirebase } from '../services/OrderService';
import ConfettiCannon from 'react-native-confetti-cannon';
import { Alert } from 'react-native';

const ShoppingCart = ({ navigation }) => {
  const {user, userData}= useContext(AppContext)
  const route = useRoute();
  const { cartItems = [], selectedAddress } = route.params || {};
  const [isSuccessPopup, setIsSuccessPopup]=useState(false)
  const confettiRef = useRef(null);
  const calculateCartTotal = () =>
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const calculateServiceCharge = (total) => (total * 0.03).toFixed(2);
  const calculatePromotionalDiscount = (total) => (total * 0.03).toFixed(2);

  const cartTotal = parseFloat(calculateCartTotal());
  const serviceCharge = parseFloat(calculateServiceCharge(cartTotal));
  const promotionalDiscount = parseFloat(calculatePromotionalDiscount(cartTotal));
  const finalTotal = (cartTotal + serviceCharge - promotionalDiscount).toFixed(2);
  

  const onHandlePressOrder = async() => {
    try {
      const response = await placeOrderInFirebase(cartItems, userData);
      if (response.success) {
        // Alert.alert("Success", response.message);
        await clearUserCart(userData.uid);
        // navigation.goBack();
        setIsSuccessPopup(true)
      confettiRef.current.start();
      
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert("Failed to place order", "Please try again later.");
    }
    
  }
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Product Section */}
      {cartItems?.length > 0 ? (
        <>
          {cartItems?.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.imgUrl }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>₹{(Number(item.price) || 0).toFixed(2)}</Text>
                  <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
                  <Text style={styles.productTotal}>Total: ₹{(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      )}

      {/* Delivery Address Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        {selectedAddress ? (
          <View style={styles.addressCard}>
            <Text style={styles.addressText}>{selectedAddress.name}</Text>
            <Text style={styles.addressText}>{selectedAddress.address_line_1}</Text>
            <Text style={styles.addressText}>Contact: {selectedAddress.contact}</Text>
            <Text style={styles.addressText}>PIN: {selectedAddress.pincode}</Text>
            <Text style={styles.addressText}>Area: {selectedAddress.localarea}</Text>
          </View>
        ) : (
          <Text style={styles.noAddressText}>No address selected.</Text>
        )}
      </View>

      {/* Order Payment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Payment Details</Text>
        <View style={styles.paymentDetails}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Order Amount</Text>
            <Text style={styles.paymentValue}>₹{cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Service Charge (3%)</Text>
            <Text style={styles.paymentValue}>₹{serviceCharge.toFixed(2)}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Promotional Discount (3%)</Text>
            <Text style={styles.paymentValue}>-₹{promotionalDiscount.toFixed(2)}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Delivery Fee</Text>
            <Text style={styles.paymentValue}>Free</Text>
          </View>
        </View>
      </View>

      {/* Order Total Section */}
      <View style={styles.section}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>₹{finalTotal}</Text>
        </View>
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalAmount}>₹{finalTotal}</Text>
        <TouchableOpacity onPress={() => onHandlePressOrder()} style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
      {/* Success Popup Modal */}
      <Modal
        animationType="fade"
         animationIn="zoomIn"
        animationOut="zoomOut"
        transparent={true}
        visible={isSuccessPopup}
        onRequestClose={() => setIsSuccessPopup(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            width: '80%',
          }}>
            <FontAwesome name="check-circle" size={50} color="#4CAF50" />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 15 }}>
              Order Placed Successfully!
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 10, color: '#666' }}>
              Thank you for your order. It will be delivered soon.
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#029130',
                padding: 10,
                borderRadius: 25,
                marginTop: 20,
                width: '100%',
              }}
              onPress={() => {
                setIsSuccessPopup(false);
                navigation.navigate('order');
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ConfettiCannon ref={confettiRef} count={200} origin={{ x: 10, y: 0 }} fadeOut />
      
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    marginLeft: 8,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  productQuantity: {
    fontSize: 14,
    color: '#333',
  },
  productTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyCart: {
    padding: 16,
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 16,
    color: '#888',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  addressCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  noAddressText: {
    fontSize: 14,
    color: '#888',
  },
  paymentDetails: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#333',
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentButton: {
    backgroundColor: '#029130',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  paymentButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ShoppingCart;