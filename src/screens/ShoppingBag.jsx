import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AddressManager from '../components/AddressManager';
import CartCard from '../components/CartCard';

const ShoppingBag = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { cartItems: initialCartItems = [] } = route.params || {};

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  useEffect(() => {
    navigation.setParams({ cartItems });
  }, [cartItems]);

  const calculateCartTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleQuantityChange = (index, delta) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index] = {
      ...updatedCartItems[index],
      quantity: updatedCartItems[index].quantity + delta,
    };

    if (updatedCartItems[index].quantity < 1) {
      updatedCartItems[index].quantity = 1;
    }

    setCartItems(updatedCartItems);
  };

  const handleDeleteCartItem = (index) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedCartItems = cartItems.filter((_, i) => i !== index);
          setCartItems(updatedCartItems);
        },
      },
    ]);
  };

  const handleNextStep = () => {
    if (selectedAddressIndex === null) {
      Alert.alert('Error', 'Please select an address before proceeding.');
    } else {
      navigation.navigate('ShoppingCart', { cartItems, selectedAddress: addresses[selectedAddressIndex] });
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <AddressManager
        addresses={addresses}
        setAddresses={setAddresses}
        selectedAddressIndex={selectedAddressIndex}
        setSelectedAddressIndex={setSelectedAddressIndex}
      />

      <ScrollView className="mt-6">
        <Text className="text-lg font-semibold mb-4 text-[#048404]">Shopping List</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartCard
              key={`${item.id}-${item.selectedSize}`}
              item={item}
              index={index}
              handleQuantityChange={handleQuantityChange}
              handleDeleteCartItem={handleDeleteCartItem}
            />
          ))
        ) : (
          <View>
            <Text className="text-gray-500">Your cart is empty.</Text>
          </View>
        )}

        {cartItems.length > 0 && (
          <View className="mt-6 border-t border-gray-200 pt-4">
            <Text className="text-lg font-semibold text-[#048404]">Total Cart Value:</Text>
            <Text className="text-xl font-bold">${calculateCartTotal()}</Text>
          </View>
        )}

        {cartItems.length > 0 && (
          <TouchableOpacity
            className="bg-[#048404] rounded-full py-4 mt-6"
            onPress={handleNextStep}
          >
            <Text className="text-center text-white font-semibold">Next Step</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default ShoppingBag;