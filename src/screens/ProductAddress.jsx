import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

const ProductAddress = () => {
  const shoppingList = [
    {
      id: 1,
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      title: "Women's Casual Wear",
      variations: ["Black", "Red"],
      rating: 4.8,
      price: "$34.00",
      originalPrice: "$64.00",
      discount: "upto 33% off",
      quantity: 1,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      title: "Men's Jacket",
      variations: ["Green", "Grey"],
      rating: 4.7,
      price: "$45.00",
      originalPrice: "$67.00",
      discount: "upto 28% off",
      quantity: 1,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="mb-4">
        <Text className="text-lg font-bold">Checkout</Text>
      </View>

      {/* Delivery Address Section */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Delivery Address</Text>
        <View className="border border-gray-300 rounded-lg p-4 flex-row items-start justify-between">
          <View className="flex-1">
            <Text className="text-gray-500">
              Address: {"\n"}216 St Paul's Rd, London N1 2LL, UK
            </Text>
            <Text className="text-gray-500 mt-2">Contact: +44-784232</Text>
          </View>
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity className="bg-gray-200 p-2 rounded-lg">
              <Text className="text-gray-600">✎</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-200 p-2 rounded-lg">
              <Text className="text-gray-600">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Shopping List */}
      <View>
        <Text className="text-lg font-semibold mb-4">Shopping List</Text>
        {shoppingList.map((item) => (
          <View
            key={item.id}
            className="mb-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
          >
            <View className="flex-row">
              {/* Product Image */}
              <Image
                source={{ uri: item.image }}
                className="w-24 h-24 rounded-lg"
              />
              {/* Product Details */}
              <View className="ml-4 flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-gray-500 text-sm">
                  Variations: {item.variations.join(", ")}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-yellow-500 text-sm">⭐</Text>
                  <Text className="text-gray-500 text-sm ml-1">
                    {item.rating}
                  </Text>
                </View>
                <View className="flex-row items-center mt-2">
                  <Text className="text-lg font-bold text-black">
                    {item.price}
                  </Text>
                  <Text className="text-gray-500 line-through text-sm ml-2">
                    {item.originalPrice}
                  </Text>
                  <Text className="text-red-500 text-sm ml-2">
                    {item.discount}
                  </Text>
                </View>
              </View>
            </View>
            {/* Total Order */}
            <View className="mt-4 flex-row justify-between">
              <Text className="text-gray-500">Total Order ({item.quantity}) :</Text>
              <Text className="text-lg font-bold">{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductAddress
