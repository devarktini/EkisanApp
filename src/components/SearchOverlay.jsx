import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  FlatList, StatusBar, Modal, Dimensions,
  Animated, Platform, Keyboard, ScrollView
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const SearchOverlay = ({ isVisible, onClose, onSearch, recentSearches = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [trendingSearches] = useState([
    'Organic Vegetables', 'Farm Equipment', 'Seeds', 'Fertilizers', 'Tools'
  ]);
  
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    if (isVisible) {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }).start();
    }
  }, [isVisible]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = [...recentSearches, ...trendingSearches].filter(item => 
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

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
            placeholder="Search products, categories..."
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

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={{ width, height }} className="bg-white">
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {renderSearchHeader()}
        
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
            <FlatList
              data={filteredItems}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  className="flex-row items-center px-4 py-3 border-b border-gray-100 active:bg-gray-50"
                  onPress={() => {
                    onSearch(item);
                    onClose();
                  }}
                >
                  <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
                    <Ionicons name="search-outline" size={18} color="#048404" />
                  </View>
                  <Text className="ml-3 flex-1 text-gray-700 font-medium">{item}</Text>
                  <TouchableOpacity 
                    className="p-2"
                    onPress={() => setSearchQuery(item)}
                  >
                    <Ionicons name="arrow-up-outline" size={18} color="#666" />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <View className="flex-1 items-center justify-center py-12">
                  <View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
                    <Ionicons name="search-outline" size={32} color="#999" />
                  </View>
                  <Text className="text-gray-500 font-medium">No results found</Text>
                  <Text className="text-gray-400 text-sm mt-1">Try a different search term</Text>
                </View>
              }
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SearchOverlay;