import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import {cartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  wishlistItems,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from '../context/CartContext';
const ProductCard = ({  item  }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      className="w-[49%] mb-4 shadow-black shadow-md rounded-lg overflow-hidden "
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-48 bg-gray-100"
          resizeMode="cover"
        />
        {item.discount && (
          <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs">
              {item.discount}% OFF
            </Text>
          </View>
        )}
         <View className="absolute top-2 right-2 flex-col gap-5 z-20 backdrop-blur-sm">
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={30} color="#048404" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={30} color="#048404" />
        </TouchableOpacity>
      </View>
      </View>
      <View className="p-2 bg-white">
        <Text className="text-sm font-medium text-gray-800" numberOfLines={2}>
          {item.name}
        </Text>
        <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
          {item.description}
        </Text>
        <View className="flex-row items-center mt-1.5">
          <Text className="text-sm font-bold text-gray-900">
            ${item.price}
          </Text>
          {item.originalPrice && (
            <Text className="ml-2 text-xs text-gray-500 line-through">
              ${item.originalPrice}
            </Text>
          )}
        </View>
        <View className="flex-row items-center mt-1">
          <View className="flex-row">
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text className="text-xs text-gray-500 ml-1">{item.rating}</Text>
          </View>
          <Text className="text-xs text-gray-400 ml-1">({item.reviews})</Text>
          {item.freeShipping && (
            <Text className="text-xs text-green-600 ml-2">Free Shipping</Text>
          )}
          <Text>{item.CategoryProduct}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CategoryProduct = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params || {};
  const { categoryName = 'All' } = params;

  console.log('Category Name:', categoryName);



  const products = [
    // WOMEN CATEGORY
    {
      id: 1,
      name: 'Elegant Evening Dress',
      description: 'Black Formal Gown',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://i.imgur.com/dress1.jpg',
      rating: 4.8,
      reviews: 128,
      discount: 25,
      freeShipping: true,
      category: 'women',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Summer Floral Dress',
      description: 'Light Casual Wear',
      price: 59.99,
      image: 'https://i.imgur.com/dress2.jpg',
      rating: 4.5,
      reviews: 95,
      freeShipping: true,
      category: 'women',
      availableSizes: ['S', 'M', 'L']
    },
    {
      id: 3,
      name: 'Designer Handbag',
      description: 'Leather Luxury Bag',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://i.imgur.com/bag1.jpg',
      rating: 4.9,
      reviews: 156,
      discount: 25,
      freeShipping: true,
      category: 'women'
    },
    {
      id: 4,
      name: 'High Heel Shoes',
      description: 'Classic Stilettos',
      price: 89.99,
      image: 'https://i.imgur.com/shoes1.jpg',
      rating: 4.6,
      reviews: 112,
      freeShipping: true,
      category: 'women',
      availableSizes: ['6', '7', '8', '9']
    },
  
    // MEN CATEGORY
    {
      id: 5,
      name: 'Business Suit',
      description: 'Classic Fit Two-Piece',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://i.imgur.com/suit1.jpg',
      rating: 4.7,
      reviews: 89,
      discount: 25,
      freeShipping: true,
      category: 'men',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 6,
      name: 'Leather Jacket',
      description: 'Vintage Style',
      price: 199.99,
      image: 'https://i.imgur.com/jacket1.jpg',
      rating: 4.8,
      reviews: 134,
      freeShipping: true,
      category: 'men',
      availableSizes: ['M', 'L', 'XL']
    },
    {
      id: 7,
      name: 'Casual Denim',
      description: 'Slim Fit Jeans',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://i.imgur.com/jeans1.jpg',
      rating: 4.5,
      reviews: 167,
      discount: 20,
      freeShipping: true,
      category: 'men',
      availableSizes: ['28', '30', '32', '34']
    },
    {
      id: 8,
      name: 'Oxford Shoes',
      description: 'Classic Leather',
      price: 129.99,
      image: 'https://i.imgur.com/shoes2.jpg',
      rating: 4.6,
      reviews: 98,
      freeShipping: true,
      category: 'men',
      availableSizes: ['8', '9', '10', '11']
    },
  
    // KIDS CATEGORY
    {
      id: 9,
      name: 'School Uniform Set',
      description: 'Complete Package',
      price: 49.99,
      originalPrice: 69.99,
      image: 'https://i.imgur.com/uniform1.jpg',
      rating: 4.7,
      reviews: 145,
      discount: 28,
      freeShipping: true,
      category: 'kids',
      availableSizes: ['4-5Y', '6-7Y', '8-9Y']
    },
    {
      id: 10,
      name: 'Party Dress',
      description: 'Special Occasion',
      price: 39.99,
      image: 'https://i.imgur.com/kidsdress1.jpg',
      rating: 4.8,
      reviews: 78,
      freeShipping: true,
      category: 'kids',
      availableSizes: ['2-3Y', '4-5Y', '6-7Y']
    },
    {
      id: 11,
      name: 'Sports Set',
      description: 'Active Wear',
      price: 34.99,
      originalPrice: 44.99,
      image: 'https://i.imgur.com/kidsport1.jpg',
      rating: 4.5,
      reviews: 92,
      discount: 22,
      freeShipping: true,
      category: 'kids',
      availableSizes: ['4-5Y', '6-7Y', '8-9Y']
    },
    {
      id: 12,
      name: 'Winter Jacket',
      description: 'Warm Padded',
      price: 59.99,
      image: 'https://i.imgur.com/kidjacket1.jpg',
      rating: 4.6,
      reviews: 113,
      freeShipping: true,
      category: 'kids',
      availableSizes: ['2-3Y', '4-5Y', '6-7Y']
    },
  
    // SPORT CATEGORY
    {
      id: 13,
      name: 'Running Shoes',
      description: 'Professional Grade',
      price: 129.99,
      originalPrice: 159.99,
      image: 'https://i.imgur.com/sport1.jpg',
      rating: 4.9,
      reviews: 234,
      discount: 19,
      freeShipping: true,
      category: 'sport',
      availableSizes: ['7', '8', '9', '10']
    },
    {
      id: 14,
      name: 'Gym Set',
      description: 'Complete Workout Kit',
      price: 89.99,
      image: 'https://i.imgur.com/sport2.jpg',
      rating: 4.7,
      reviews: 167,
      freeShipping: true,
      category: 'sport',
      availableSizes: ['S', 'M', 'L']
    },
    {
      id: 15,
      name: 'Yoga Mat',
      description: 'Premium Quality',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://i.imgur.com/sport3.jpg',
      rating: 4.6,
      reviews: 189,
      discount: 25,
      freeShipping: true,
      category: 'sport'
    },
    {
      id: 16,
      name: 'Sports Bottle',
      description: 'Insulated Steel',
      price: 24.99,
      image: 'https://i.imgur.com/sport4.jpg',
      rating: 4.5,
      reviews: 145,
      freeShipping: true,
      category: 'sport'
    },
  
    // BEAUTY CATEGORY
    {
      id: 17,
      name: 'Skincare Set',
      description: 'Complete Routine',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://i.imgur.com/beauty1.jpg',
      rating: 4.8,
      reviews: 267,
      discount: 20,
      freeShipping: true,
      category: 'beauty'
    },
    {
      id: 18,
      name: 'Makeup Palette',
      description: 'Professional Grade',
      price: 79.99,
      image: 'https://i.imgur.com/beauty2.jpg',
      rating: 4.7,
      reviews: 198,
      freeShipping: true,
      category: 'beauty'
    },
    {
      id: 19,
      name: 'Hair Care Bundle',
      description: 'Salon Quality',
      price: 89.99,
      originalPrice: 119.99,
      image: 'https://i.imgur.com/beauty3.jpg',
      rating: 4.6,
      reviews: 156,
      discount: 25,
      freeShipping: true,
      category: 'beauty'
    },
    {
      id: 20,
      name: 'Perfume Set',
      description: 'Luxury Collection',
      price: 149.99,
      image: 'https://i.imgur.com/beauty4.jpg',
      rating: 4.9,
      reviews: 223,
      freeShipping: true,
      category: 'beauty'
    }
  ];



  // Filter products based on category
  const categoryProducts = categoryName === 'All'
  ? products
  : products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());

  // Debugging: Log the filtered products
  console.log('Filtered Products:', categoryProducts);
    // Filter products based on category if needed
  

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
    <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    
    
   <Header />


  {/* Search Bar */}
      <View className="bg-white px-4 py-2 border-b border-gray-100">
        <View className="flex-row items-center bg-[#F5F5F5] rounded-full px-4 py-1 border-2 border-[#048404]">
          <Ionicons name="search-outline" size={20} color="#048404" />
          <TextInput
            className="flex-1 ml-2 text-base font-medium text-gray-700"
            placeholder="Search any Product.."
            placeholderTextColor="#048404 "
            
          />
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={20} color="#048404" />
          </TouchableOpacity>
        </View>
      </View>

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center space-x-2">
          <Text className="text-base font-semibold text-gray-800">
            <Text>{categoryProducts.length} </Text>
            <Text>Items</Text>
          </Text>
          <View className="h-5 w-0.5 bg-gray-300" />
          <Text className="text-sm font-medium text-gray-600">
            Showing {categoryName} products
          </Text>
        </View>
        <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="funnel-outline" size={18} color="#666" />
            <Text className="text-gray-600 ml-1">Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="filter-outline" size={18} color="#666" />
            <Text className="text-gray-600 ml-1">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="flex-row flex-wrap justify-between px-2">
        {categoryProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default CategoryProduct;
