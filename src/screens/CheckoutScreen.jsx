import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-vector-icons/MaterialCommunityIcons";

const CheckoutScreen = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState("visa");

  const paymentMethods = [
    { id: "visa", name: "VISA", logo: "💳", last4: "2109" },
    { id: "paypal", name: "PayPal", logo: "💰", last4: "2109" },
    { id: "mastercard", name: "MasterCard", logo: "💳", last4: "2109" },
    { id: "applepay", name: "Apple Pay", logo: "🍎", last4: "2109" },
  ];

  return (
    <View className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center">
          <Icon name="arrow-left" size={24} color="#374151" className="mr-2" />
          <Text className="text-lg font-bold">Back</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold">Checkout</Text>
      </View>

      {/* Order Summary */}
      <View className="mb-6">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Order</Text>
          <Text className="text-gray-700">₹ 7,000</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Shipping</Text>
          <Text className="text-gray-700">₹ 30</Text>
        </View>
        <View className="flex-row justify-between border-t border-gray-300 pt-2">
          <Text className="font-bold">Total</Text>
          <Text className="font-bold">₹ 7,030</Text>
        </View>
      </View>

      {/* Payment Options */}
      <Text className="text-lg font-semibold mb-4">Payment</Text>
      {paymentMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          onPress={() => setSelectedPayment(method.id)}
          className={`flex-row items-center justify-between p-4 mb-3 border ${
            selectedPayment === method.id
              ? "border-red-500"
              : "border-gray-300"
          } rounded-lg`}
        >
          <Text className="text-lg font-bold">{method.logo}</Text>
          <Text className="text-gray-600 flex-1 ml-4">{method.name}</Text>
          <Text className="text-gray-500">********{method.last4}</Text>
        </TouchableOpacity>
      ))}

      {/* Continue Button */}
      <TouchableOpacity className="bg-red-500 py-3 rounded-lg mt-4">
        <Text className="text-center text-white font-bold text-lg">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;
