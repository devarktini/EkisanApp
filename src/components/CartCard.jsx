import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

const CartCard = ({ item, index, handleQuantityChange, handleDeleteCartItem }) => {
  const calculateTotalPrice = (price, quantity) => (price * quantity).toFixed(2);

  return (
    <View className="mb-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <View className="flex-row">
        <Image source={{ uri: item.image }} className="w-24 h-24 rounded-lg" />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold">{item.name}</Text>
          <Text className="text-gray-500 text-sm">Size: {item.selectedSize}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-yellow-500 text-sm">⭐</Text>
            <Text className="text-gray-500 text-sm ml-1">{item.rating || 'N/A'}</Text>
          </View>
          <View className="flex-row items-center mt-2">
            <Text className="text-lg font-bold">${item.price}</Text>
            {item.originalPrice && (
              <Text className="text-gray-500 line-through text-sm ml-2">
                ${item.originalPrice}
              </Text>
            )}
            {item.discount && (
              <Text className="text-red-500 text-sm ml-2">{item.discount}% OFF</Text>
            )}
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-gray-500">Quantity:</Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            className="bg-gray-200 rounded-full w-8 h-8 justify-center items-center"
            onPress={() => handleQuantityChange(index, -1)}
          >
            <Text className="text-lg">-</Text>
          </TouchableOpacity>
          <Text className="mx-4 text-lg">{item.quantity}</Text>
          <TouchableOpacity
            className="bg-gray-200 rounded-full w-8 h-8 justify-center items-center"
            onPress={() => handleQuantityChange(index, 1)}
          >
            <Text className="text-lg">+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-4 flex-row justify-between">
        <Text className="text-gray-500">Total Order ({item.quantity}):</Text>
        <Text className="text-lg font-bold">${calculateTotalPrice(item.price, item.quantity)}</Text>
      </View>
      <TouchableOpacity
        className="bg-red-200 rounded-full py-2 px-4 mt-4"
        onPress={() => handleDeleteCartItem(index)}
      >
        <Text className="text-red-600 font-semibold">Delete Item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartCard;