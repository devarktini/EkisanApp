import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product })}
      className="bg-white shadow-md rounded-lg overflow-hidden m-4"
    >
      <Image source={{ uri: product.image }} className="w-full h-40" />
      <View className="p-4">
        <Text className="text-xl font-bold">{product.name}</Text>
        <Text className="text-gray-600">{product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard; 