import React from "react";
import { View, Text, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundImage from '../../assets/agricultures.jpeg';

const HomeTab = () => {
  const categories = [
    { id: 1, name: 'Germinated', image: require("../../assets/agricultures.jpeg") },
    { id: 2, name: 'Flax seeds', image: require("../../assets/agricultures.jpeg") },
    { id: 3, name: 'Nucleus', image: require("../../assets/agricultures.jpeg") },
    { id: 4, name: 'Vegetable', image: require("../../assets/agricultures.jpeg") },
    { id: 5, name: 'Flowers', image: require("../../assets/agricultures.jpeg") },
  ];

  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: require("../../assets/agricultures.jpeg"),
      discount: '-17%',
      price: '₹1,498',
    },
    {
      id: 2,
      name: 'Product 2',
      image: require("../../assets/agricultures.jpeg"),
      discount: '-79%',
      price: '₹74',
    },
    {
      id: 3,
      name: 'Product 1',
      image: require("../../assets/agricultures.jpeg"),
      discount: '-17%',
      price: '₹1,498',
    },
    {
      id: 4,
      name: 'Product 2',
      image: require("../../assets/agricultures.jpeg"),
      discount: '-79%',
      price: '₹74',
    },
    {
      id: 5,
      name: 'Product 1',
      image: require("../../assets/agricultures.jpeg"),
      discount: '-17%',
      price: '₹1,498',
    },
    {
      id: 6,
      name: 'Product 2',
      image: require("../../assets/agricultures.jpeg"),
      discount: '-79%',
      price: '₹74',
    },
  ];

  return (
    <ScrollView scrollEnabled className=" h-full bg-gray-100">
    {/* Weather Section */}
    <ImageBackground
      source={require("../../assets/homeBackground.webp")}
      style={{ height: 200 }}
      className="flex justify-center items-center"
      resizeMode="cover"
    >
      <View className="absolute top-4 left-4">
        <TouchableOpacity>
          <Image source={require("../../assets/userProfile.png")} className="w-10 h-10" />
        </TouchableOpacity>
      </View>
      <View className="flex justify-center absolute right-6 top-0 items-center">
        <Image source={require("../../assets/cloudy.webp")} className="w-20 h-20" />
        <Text className="text-4xl font-bold text-white mt-0">29</Text>
        <Text className="text-white">Cloudy 29°/23°</Text>
        <Text className="text-white">Today | Feroke</Text>
      </View>
      
    </ImageBackground>

    {/* My Farm Button */}
    <View className="bg-white relative rounded-t-3xl -mt-8 px-6 pt-4 pb-6 shadow-lg">
      <TouchableOpacity className="bg-[#548d22] rounded-lg py-2 px-8 self-center">
        <Text className="text-white font-bold">My farm</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mt-4 absolute inset-x-[50%] -top-16">
        <Image source={require("../../assets/downarrow.gif")} className="w-8 h-10" />
      </TouchableOpacity>
    </View>

    {/* Category Section */}
    <View className="px-6 mt-4">
      <Text className="text-xl font-bold mb-2">Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        {categories.map((category) => (
          <View key={category.id} className="mr-4 items-center">
            <Image source={category.image} className="w-16 h-16 rounded-full bg-gray-200" />
            <Text className="text-sm mt-2">{category.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>

    {/* Featured Products Section */}
    <View className="px-6 mt-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Featured product</Text>
        <TouchableOpacity>
          <Text className="text-[#548d22] font-bold">View All</Text>
        </TouchableOpacity>
      </View>
      <View className=" flex-wrap flex-row   flex items-center justify-around">
        {products.map((product) => (
          <View
            key={product.id}
            className="w-[48%] mt-2 bg-white rounded-lg shadow-lg p-6 items-center"
          >
            <Image source={product.image} className="w-full h-24 rounded" />
            <Text className="mt-2 text-gray-700">{product.name}</Text>
            <Text className="text-green-500 font-bold">{product.discount}</Text>
            <Text className="text-gray-700 font-bold">{product.price}</Text>
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
  );
};

export default HomeTab;
