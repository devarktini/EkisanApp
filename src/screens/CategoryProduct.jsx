import React, { useContext } from 'react';
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
import { AppContext } from '../context/AppContext';
const ProductCard = ({  item  }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      className="w-[49%] mb-4 rounded-lg overflow-hidden"
      onPress={() => navigation.navigate('ProductList', { searchQuery: item.categorieName })}
    >
      <View>
        <Image
          source={{ uri: item.coverUrl || item.curlUrl }}
          className="w-full h-48 bg-gray-100"
          resizeMode="cover"
        />
      </View>
      <View className="p-2 bg-white">
        <Text className="text-sm font-medium text-gray-800 text-center" numberOfLines={2}>
          {item.categorieName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CategoryProduct = () => {
  const navigation = useNavigation();
  const { categoryList } = useContext(AppContext);
  const route = useRoute();
  const params = route.params || {};
  const { categoryName = 'All' } = params;


  // Filter products based on category
  const categoryProducts = categoryName === 'All'
  ? categoryList
  : categoryList.filter(product => product.category.toLowerCase() === categoryName.toLowerCase());

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
        {/* <View className="flex-row items-center space-x-4">
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="funnel-outline" size={18} color="#666" />
            <Text className="text-gray-600 ml-1">Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons name="filter-outline" size={18} color="#666" />
            <Text className="text-gray-600 ml-1">Filter</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      
      <View className="flex-row flex-wrap justify-between px-2">
        {categoryList.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default CategoryProduct;
