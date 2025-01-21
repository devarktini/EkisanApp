import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from '../context/CartContext';
const ProductDetails = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product?.availableSizes?.[0] || "N/A"
  );
  const [cartItems, setCartItems] = useState([]);

  if (!product) {
    return <Text>No product data available.</Text>;
  }

  const handleAddToCart = () => {
    const updatedProduct = {
      ...product,
      selectedSize,
      quantity: 1,
    };

    addToCart(updatedProduct);

    // Navigate to the CartScreen
    navigation.navigate('Cart');
  };

  const handleAddToCheckout = () => {
    const updatedProduct = {
      ...product,
      selectedSize,
      quantity: 1,
    };

    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    const updatedCartItems =
      existingProductIndex !== -1
        ? cartItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cartItems, updatedProduct];

    setCartItems(updatedCartItems);

    navigation.navigate("ShoppingBag", { cartItems: updatedCartItems });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity
          className=" shadow-md bg-white p-2 rounded-full shadow flex-row items-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color="black" />
          <Text className="text-black ml-1">Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ShoppingBag", { cartItems })}
        >
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <ScrollView>
          <Image
            source={{ uri: product.image }}
            className="w-full h-72"
            resizeMode="cover"
          />
        </ScrollView>

        {/* Size Selection */}
        <View className="px-4 py-3">
          <Text className="text-base mb-2">Size: {selectedSize}</Text>
          <View className="flex-row">
            {product.availableSizes?.map((size, index) => (
              <TouchableOpacity
                key={index}
                className={`mr-3 px-6 py-2 rounded-full border ${
                  selectedSize === size ? "bg-black" : "bg-white"
                }`}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  className={
                    selectedSize === size ? "text-white" : "text-black"
                  }
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Details */}
        <View className="px-4">
          <Text className="text-xl font-semibold">{product.name}</Text>
          <Text className="text-gray-500 text-base">
            {product.description || "No description available."}
          </Text>

          <View className="flex-row items-center mt-2">
            {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
              <Text key={i}>★</Text>
            ))}
            <Text className="ml-2 text-gray-500 text-sm">
              {product.reviews || "0"} Reviews
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <Text className="text-xl font-bold">${product.price}</Text>
            {product.originalPrice && (
              <Text className="ml-2 line-through text-gray-500">
                ${product.originalPrice}
              </Text>
            )}
            {product.discount && (
              <Text className="ml-2 text-green-600">
                {product.discount}% OFF
              </Text>
            )}
          </View>

          <View className="mt-3">
            <Text className="text-gray-600 text-sm">
              {product.longDescription || "No detailed description available."}
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 text-sm mt-1">Read more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Info */}
        <View className="px-4 py-3 mt-3 border-t border-gray-200">
          <Text className="text-base">Delivery in</Text>
          <Text className="text-lg font-bold">
            {product.deliveryTime || "N/A"}
          </Text>
        </View>

        {/* Product Category */}
        <View className="px-4 py-3 border-t border-gray-200">
          <Text className="text-base font-semibold">
            Category: {product.category || "N/A"}
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <View className="flex-row p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 mr-2 bg-white border-[2px] border-[#048404] rounded-full py-3"
          >
            <Text className="text-center font-semibold">Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddToCheckout}
            className="flex-1 ml-2 bg-[#048404] rounded-full py-3"
          >
            <Text className="text-center text-white font-semibold">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;