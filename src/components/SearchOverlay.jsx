import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, StatusBar, Modal, Dimensions,
  Animated, Platform, Keyboard, ScrollView, Image
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SearchOverlay = ({ isVisible, onClose, onSearch, recentSearches = [], tempFilterProduct = [] }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const searchTimeout = useRef(null);

  const trendingSearches = useMemo(() => [
    'Organic Vegetables',
    'Farm Equipment',
    'Seeds',
    'Fertilizers',
    'Tools'
  ], []);

  // Reset state when overlay opens/closes
  useEffect(() => {
    if (isVisible) {
      setSearchQuery('');
      setFilteredItems([]);
      setFilteredProducts([]);
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [isVisible]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      try {
        if (!text.trim()) {
          setFilteredItems([]);
          setFilteredProducts([]);
          return;
        }

        const searchTerm = text.toLowerCase().trim();

        // Filter suggestions
        const filtered = Array.from(new Set([...recentSearches, ...trendingSearches]))
          .filter(item => item && typeof item === 'string')
          .filter(item => item.toLowerCase().includes(searchTerm));
        setFilteredItems(filtered);

        // Filter products
        const filteredProds = tempFilterProduct
          .filter(product => {
            if (!product || typeof product !== 'object') return false;
            
            const searchFields = [
              product.name,
              product.description,
              product.district,
              product.block,
              product.state,
              product.sellerName
            ];

            return searchFields.some(field => 
              field?.toLowerCase()?.includes(searchTerm)
            );
          })
          .slice(0, 20); // Limit results for better performance

        setFilteredProducts(filteredProds);
      } catch (error) {
        console.error('Search error:', error);
        setFilteredItems([]);
        setFilteredProducts([]);
      }
    }, 300); // Debounce delay
  }, [recentSearches, tempFilterProduct]);

  const renderSearchHeader = () => (
    <Animated.View 
      className="bg-white shadow-sm"
      style={{
        transform: [{
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
          })
        }]
      }}
    >
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity 
          className="mr-3 p-2 rounded-full bg-gray-50"
          onPress={onClose}
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 py-2 text-base font-medium"
            placeholder="Search products, categories, Item, Seller, Location..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              className="bg-gray-200 rounded-full p-1"
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close" size={16} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );

  const renderSection = (title, data, icon) => (
    <View className="mb-4">
      <Text className="px-4 py-2 text-sm font-bold text-gray-600 uppercase">
        {title}
      </Text>
      {data.slice(0, 5).map((item, index) => (
        <TouchableOpacity 
          key={index}
          className="flex-row items-center px-4 py-3 border-b border-gray-100 active:bg-gray-50"
          onPress={() => {
            onSearch(item);
            onClose();
          }}
        >
          <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
            <Ionicons name={icon} size={18} color="#048404" />
          </View>
          <Text className="ml-3 flex-1 text-gray-700 font-medium">{item}</Text>
          <Ionicons name="arrow-forward" size={18} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderProductCard = ({ item }) => (
    <TouchableOpacity 
      className="flex-row bg-white p-3 mb-2 rounded-lg shadow-sm border border-gray-100"
      onPress={() => {
        onSearch(item.name);
        onClose();
        navigation.navigate('ProductDetails', { product: item });
      }}
    >
      <Image 
        source={{ uri: item.imgUrl }}
        className="w-20 h-20 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-3">
        <Text className="text-gray-800 font-bold" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-gray-500 text-sm mb-1" numberOfLines={2}>
          Seller: {item.sellerName}
        </Text>
        <Text className="text-gray-500 text-sm mb-1" numberOfLines={2}>
          {item.block}, {item.district}, {item.state}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-green-600 font-bold">
            ₹{item.price}{item.inStock}
          </Text>
          {/* <View className={`px-2 py-1 rounded-full ${item.inStock ? 'bg-green-100' : 'bg-red-100'}`}>
            <Text className={`text-xs ${item.inStock ? 'text-green-700' : 'text-red-700'}`}>
              {item.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="none" // Handle animation ourselves
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={{ width, height }} className="bg-white">
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {renderSearchHeader()}
        
        <Animated.View className="flex-1" style={{
          opacity: animatedValue,
          transform: [{
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0]
            })
          }]
        }}>
          <View className="flex-1">
            {searchQuery.length === 0 ? (
              <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {renderSection('Recent Searches', recentSearches, 'time-outline')}
                {renderSection('Trending Searches', trendingSearches, 'trending-up-outline')}
                
                <View className="px-4 py-6 mt-4 bg-gray-50">
                  <Text className="text-center text-sm text-gray-500">
                    Try searching for products, categories, or brands
                  </Text>
                </View>
              </ScrollView>
            ) : (
              <ScrollView className="flex-1 px-4">
                {filteredProducts.length > 0 && (
                  <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-600 uppercase mb-2">
                      Products ({filteredProducts.length})
                    </Text>
                    {filteredProducts.map((item, index) => (
                      <View key={index}>
                        {renderProductCard({ item })}
                      </View>
                    ))}
                  </View>
                )}
                
                {filteredItems.length > 0 && (
                  <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-600 uppercase mb-2">
                      Suggestions
                    </Text>
                    {filteredItems.map((item, index) => (
                      <TouchableOpacity 
                        key={index}
                        className="flex-row items-center py-3 border-b border-gray-100"
                        onPress={() => {
                          onSearch(item);
                          onClose();
                        }}
                      >
                        <Ionicons name="search-outline" size={18} color="#048404" />
                        <Text className="ml-3 flex-1 text-gray-700">{item}</Text>
                        <Ionicons name="arrow-forward" size={18} color="#999" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                {filteredProducts.length === 0 && filteredItems.length === 0 && (
                  <View className="flex-1 items-center justify-center py-12">
                    <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
                      <Ionicons name="search-outline" size={32} color="#999" />
                    </View>
                    <Text className="text-gray-500 font-medium">No results found</Text>
                    <Text className="text-gray-400 text-sm mt-1">Try a different search term</Text>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default React.memo(SearchOverlay);