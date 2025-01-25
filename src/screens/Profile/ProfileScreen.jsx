import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import FarmIcon from "../../assets/Framing.svg";
import RentIcon from "../../assets/RentIcon.svg";
import AccountIcon from "../../assets/AccountIcon.svg";
import StoreIcon from "../../assets/StoreIcon.svg";
import GroupIcon from "../../assets/GroupIcon.svg";
import ExpertIcon from "../../assets/ExpertIcon.svg";

const ProfileScreen = () => {
  const navigator = useNavigation();
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Image */}
      <View>
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/108313157/photo/india-farming.webp?a=1&b=1&s=612x612&w=0&k=20&c=yseKM6JJgR7-3W0vV-ZGTClDwHNIumNoJw2nYWjQOAE=", // Replace with your background image
          }}
          className="w-full h-48"
        />
        <TouchableOpacity
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow flex-row items-center"
          onPress={() => navigator.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color="black" />
          <Text className="text-black ml-1">Back</Text>
        </TouchableOpacity>
      </View>
      {/* Profile Section */}
      <View className="px-4 -mt-12">
        <View className="flex-row items-center">
          <View className="items-center">
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/503646746/photo/farmer-spreading-fertilizer-in-the-field-wheat.webp?a=1&b=1&s=612x612&w=0&k=20&c=BnR0YEwUlQ7xXQhC3CRce04lqQv6pLWbvS076HCw4DI=", // Replace with profile picture URL
              }}
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <Text className="text-lg font-bold mt-2">Mike Caixa</Text>
            <Text className="text-sm text-gray-500">Lagos, Place, 65 ha</Text>
          </View>
          <TouchableOpacity className="bg-[#048404] px-4 py-2 rounded-full ml-20">
            <Text className="text-white px-3">seller</Text>
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-sm text-gray-900">
          Marketplace farmer page where you can see all the info related to the
          farmer itself, like location, products he can plant and harvest for
          you.
        </Text>

        <Text className="mt-2 text-gray-500">
          <Text className="font-bold">12 members</Text> ·{" "}
          <Text className="font-bold">642 plants</Text> in GrowthByYou
        </Text>
      </View>
      {/* Products Section */}
      <View className="mt-4 px-4">
        <Text className="font-bold text-lg mb-2">Products</Text>
        <View className="flex-row flex-wrap">
          {[
            { name: "Tomatoes", icon: "sun" }, // Example Feather icon
            { name: "Cucumbers", icon: "droplet" },
            { name: "Carrots", icon: "carrot" },
            { name: "Potatoes", icon: "package" },
            { name: "Onions", icon: "cloud-rain" },
            { name: "Oranges", icon: "sunrise" },
            { name: "Apples", icon: "apple" },
            { name: "Strawberries", icon: "heart" },
            { name: "Olives", icon: "circle" },
          ].map((item, index) => (
            <View
              key={index}
              className="bg-gray-100 px-3 py-2 rounded-full flex-row items-center m-1"
            >
              <Feather
                name={item.icon}
                size={14}
                color="black"
                className="mr-2"
              />
              <Text className="text-sm">{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Card Section */}
      {/* // Add this inside the ProfileScreen component, after the Products Section */}
      <View className="mt-6 px-4">
        <Text className="font-bold text-lg mb-4">Services</Text>
        <View className="flex-row flex-wrap justify-between">
          {/* Card 1: My Farm */}
          <TouchableOpacity onPress={()=> navigator.navigate('AddFarm')} className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border">
            <FarmIcon width={32} height={32} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">My Farm</Text>
              <Text className="text-sm text-gray-500">Manage your farm</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: Rent Product */}
          <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border">
            <RentIcon width={32} height={32} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">Rent Product</Text>
              <Text className="text-sm text-gray-500">
                Rent equipment easily
              </Text>
            </View>
          </TouchableOpacity>

          {/* Card 3: My Account */}
          <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border">
            <AccountIcon width={32} height={32} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">My Account</Text>
              <Text className="text-sm text-gray-500">Access your account</Text>
            </View>
          </TouchableOpacity>

          {/* Card 4: My Store */}
          <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border">
            <StoreIcon width={32} height={32} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">My Store</Text>
              <Text className="text-sm text-gray-500">Manage your store</Text>
            </View>
          </TouchableOpacity>

          {/* Card 5: Group */}
          <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border">
            <GroupIcon width={32} height={32} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">Group</Text>
              <Text className="text-sm text-gray-500">Join communities</Text>
            </View>
          </TouchableOpacity>

          {/* Card 6: Talk to Expert */}
          <TouchableOpacity className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border">
            <ExpertIcon width={32} height={32} />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">
                Talk to Expert
              </Text>
              <Text className="text-sm text-gray-500">Get expert advice</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
