import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const UserProfile = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-6 mb-4">
        <TouchableOpacity>
          <Icon name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">User Profile</Text>
        <TouchableOpacity>
          <Icon name="cog-outline" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View className="items-center">
        <Image
          source={{
            uri: "https://via.placeholder.com/100",
          }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold">Jane Doe</Text>
        <Text className="text-gray-500 mb-4">@jane_doe</Text>

        <View className="flex-row justify-around w-full mb-6">
          <View className="items-center">
            <Text className="font-bold text-lg">1.2K</Text>
            <Text className="text-gray-500">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="font-bold text-lg">300</Text>
            <Text className="text-gray-500">Following</Text>
          </View>
          <View className="items-center">
            <Text className="font-bold text-lg">45</Text>
            <Text className="text-gray-500">Posts</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-center mb-6">
          <TouchableOpacity className="bg-blue-400 rounded-md px-4 py-2 flex-row items-center mr-2">
            <Icon name="account-plus" size={20} color="white" />
            <Text className="text-white ml-2">Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 rounded-md px-3 py-2">
            <Icon name="message-outline" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity className="items-center">
          <Icon name="clipboard-outline" size={24} color="#374151" />
          <Text className="text-gray-500">Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Icon name="account-multiple-outline" size={24} color="#374151" />
          <Text className="text-gray-500">Followers</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="bg-blue-400 rounded-md py-3 mb-6">
        <Text className="text-white text-center text-lg">Edit Profile</Text>
      </TouchableOpacity>

      {/* Wishlist Section */}
      <Text className="text-xl font-bold mb-4">Wishlist</Text>

      <View className="mb-4 flex-row items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <Image
          source={{ uri: "https://via.placeholder.com/60" }}
          className="w-16 h-16 rounded-lg mr-4"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-700">Apple iPhone...</Text>
          <Text className="text-gray-500">$799</Text>
        </View>
        <Text className="font-bold text-blue-400">$799</Text>
      </View>

      <View className="mb-4 flex-row items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <Image
          source={{ uri: "https://via.placeholder.com/60" }}
          className="w-16 h-16 rounded-lg mr-4"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-700">Sony...</Text>
          <Text className="text-gray-500">$349</Text>
        </View>
        <Text className="font-bold text-blue-400">$349</Text>
      </View>

      <View className="mb-4 flex-row items-center border border-gray-300 rounded-lg p-3 bg-gray-50">
        <Image
          source={{ uri: "https://via.placeholder.com/60" }}
          className="w-16 h-16 rounded-lg mr-4"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-700">Kindle...</Text>
          <Text className="text-gray-500">$129</Text>
        </View>
        <Text className="font-bold text-blue-400">$129</Text>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
