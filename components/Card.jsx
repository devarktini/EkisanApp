import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Card({ item }) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity 
      className="w-[160px] mr-4 bg-white rounded-lg overflow-hidden shadow-md"
      onPress={() => {
        navigation.navigate('ProductDetails', { product: item });
      }}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-40 rounded-t-lg"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="text-sm font-medium" numberOfLines={2}>{item.name}</Text>
        <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="text-sm font-bold text-gray-900">${item.price}</Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text className="text-xs text-gray-500 ml-1">{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}