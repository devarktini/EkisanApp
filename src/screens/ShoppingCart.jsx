import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ShoppingCart = ({ navigation }) => {
  const route = useRoute();
  const { cartItems = [], selectedAddress } = route.params || {};

  const calculateCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity
          className="shadow-md bg-white p-2 rounded-full flex-row items-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color="black" />
          <Text className="text-black ml-1">Back</Text>
        </TouchableOpacity>
      </View>

      {/* Product Section */}
      {cartItems.length > 0 ? (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Product</Text>
            <Text style={styles.headerText}>Price</Text>
            <Text style={styles.headerText}>Quantity</Text>
            <Text style={styles.headerText}>Total</Text>
          </View>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.productCell}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
              </View>
              <Text style={styles.cellText}>${item.price.toFixed(2)}</Text>
              <Text style={styles.cellText}>{item.quantity}</Text>
              <Text style={styles.cellText}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
        </>
      ) : (
        <View className="p-4">
          <Text className="text-gray-500">Your cart is empty.</Text>
        </View>
      )}

      {/* Delivery Address Section */}
      <View className="px-4 py-4 border-b border-gray-200">
        <Text className="text-base font-semibold text-gray-800 mb-2">
          Delivery Address
        </Text>
        {selectedAddress ? (
          <View className="p-4 border border-gray-300 rounded-lg">
            <Text className="font-semibold">{selectedAddress.name}</Text>
            <Text>{selectedAddress.address}</Text>
            <Text>Contact: {selectedAddress.contact}</Text>
            <Text>PIN: {selectedAddress.pinno}</Text>
            <Text>Area: {selectedAddress.localarea}</Text>
            {selectedAddress.extraFields.map((field, index) => (
              <Text key={index}>
                {field.key}: {field.value}
              </Text>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500">No address selected.</Text>
        )}
      </View>

      {/* Order Payment Details */}
      <View className="px-4 py-4 border-b border-gray-200">
        <Text className="text-base font-semibold text-gray-800 mb-2">
          Order Payment Details
        </Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">Order Amount</Text>
          <Text className="text-sm font-medium text-gray-800">${calculateCartTotal()}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-gray-600">Delivery Fee</Text>
          <Text className="text-sm font-medium text-green-500">Free</Text>
        </View>
      </View>

      {/* Order Total Section */}
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row justify-between mb-2">
          <Text className="text-base font-semibold text-gray-800">Order Total</Text>
          <Text className="text-base font-semibold text-gray-800">${calculateCartTotal()}</Text>
        </View>
      </View>

      {/* Bottom Bar */}
      <View className="w-full bg-white border-t border-gray-200">
        <View className="flex-row justify-between items-center px-4 py-3">
          <Text className="text-lg font-bold text-gray-800">${calculateCartTotal()}</Text>
          <TouchableOpacity className="bg-pink-500 px-4 py-2 rounded-md">
            <Text className="text-sm font-medium text-white">Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'medium',
    color: '#333',
    
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
});

export default ShoppingCart;