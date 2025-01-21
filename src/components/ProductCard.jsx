import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function ProductCard({ item }) {
  const navigation = useNavigation();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();

  const handleWishlistToggle = () => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      console.log("Item to add:", item); // Debugging
      addToWishlist(item);
    }
  };

  return (
    <TouchableOpacity
      className="w-[160px] mr-4 bg-white rounded-lg overflow-hidden shadow-md relative"
      onPress={() => {
        navigation.navigate("ProductDetails", { product: item });
      }}
    >
      <View className="absolute top-2 right-2 flex-col gap-5 z-20 backdrop-blur-sm">
        <TouchableOpacity onPress={handleWishlistToggle}>
          <Ionicons
            name={isInWishlist(item.id) ? "heart" : "heart-outline"}
            size={30}
            color={isInWishlist(item.id) ? "blue" : "#048404"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addToCart(item)}>
          <Ionicons name="cart-outline" size={30} color="#048404" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: item.image }}
        className="w-full h-40 rounded-t-lg"
        resizeMode="cover"
      />
      <View className="p-2">
        <Text className="text-sm font-medium" numberOfLines={2}>
          {item.name}
        </Text>
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