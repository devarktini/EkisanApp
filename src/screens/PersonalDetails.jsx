import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PersonalDetails = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      <ScrollView>
        {/* Profile Image Section */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center overflow-hidden">
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity className="mt-2">
            <Text className="text-blue-500 font-semibold">Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Details Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-2">Personal Details</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text className="text-gray-600 mb-1">Email Address</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="sanith@gemul.com"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">Change Password</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter new password"
              secureTextEntry
            />
          </View>
        </View>

        {/* Business Address Details Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-2">Business Address Details</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text className="text-gray-600 mb-1">Phone Job</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="400186"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">Address</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="216 St Paul's Rd"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">City</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="London"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">State</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="N.E.L.L."
              editable={false}
            />
            <Text className="text-gray-600 mb-1">Stanley</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="United Kingdom"
              editable={false}
            />
          </View>
        </View>

        {/* Bank Account Details Section */}
        <View className="mb-6">
          <Text className="text-lg font-bold mb-2">Bank Account Details</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm">
            <Text className="text-gray-600 mb-1">Bank Account Number</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="2043660000000X"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">Account Issuer's Name</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Abdhaji Riadaja"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">PK Code</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="SBN00438"
              editable={false}
            />
            <Text className="text-gray-600 mb-1">State</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="State"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDetails;
