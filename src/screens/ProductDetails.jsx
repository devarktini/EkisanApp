import React from 'react';
import { View, Text, Image } from 'react-native';

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  return (
    <View className="flex-1 bg-white p-4">
      <Image source={{ uri: product.image }} className="w-full h-64" />
      <Text className="text-2xl font-bold mt-4">{product.name}</Text>
      <Text className="text-xl text-gray-600 mt-2">{product.price}</Text>
      <Text className="text-base text-gray-800 mt-4">
        This is a detailed description of the product. You can add more information here as needed.
      </Text>
    </View>
  );
};

export default ProductDetails; 