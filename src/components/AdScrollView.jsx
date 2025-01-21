import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const AdScrollView = () => {
  // Array of card data
  const cardData = [
    {
      id: 1,
      image: 'https://your-image-url-here.com/shoes1.jpg',
      title: 'Up to 50% Off',
      tag: 'Sponsored',
    },
    {
      id: 2,
      image: 'https://your-image-url-here.com/shoes2.jpg',
      title: 'Big Sale Today',
      tag: 'Sponsored',
    },
    {
      id: 3,
      image: 'https://your-image-url-here.com/shoes3.jpg',
      title: 'Exclusive Discounts',
      tag: 'Sponsored',
    },
    {
      id: 4,
      image: 'https://your-image-url-here.com/shoes4.jpg',
      title: 'Shop & Save',
      tag: 'Sponsored',
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-lg font-bold mb-4">Exclusive Deals</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {cardData.map((item) => (
          <View key={item.id} className="bg-white rounded-lg shadow-md p-4 w-72 mr-4">
            {/* Sponsored Tag */}
            <Text className="text-gray-500 text-sm mb-2">{item.tag}</Text>

            {/* Image Section */}
            <View className="relative">
              <Image
                source={{ uri: item.image }}
                className="w-full h-36 rounded-md"
                resizeMode="cover"
              />
              {/* Discount Overlay */}
              <View className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <Text className="text-white text-2xl font-bold">UP TO</Text>
                <Text className="text-white text-4xl font-extrabold">50% OFF</Text>
              </View>
            </View>

            {/* Description Section */}
            <TouchableOpacity className="mt-4">
              <Text className="text-gray-800 text-base font-semibold">{item.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AdScrollView;
