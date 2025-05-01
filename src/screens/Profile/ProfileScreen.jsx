import React, { useContext, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";
import farmerImage from '../../assets/farmer.png';

import AddProduct from "../AddProduct";
import { StyleSheet } from "react-native";

const ProfileScreen = () => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const navigator = useNavigation();
  const { userData } = useContext(AppContext);
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header with Background Image */}
      <View className="relative h-56">
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/108313157/photo/india-farming.webp?a=1&b=1&s=612x612&w=0&k=20&c=yseKM6JJgR7-3W0vV-ZGTClDwHNIumNoJw2nYWjQOAE=",
          }}
          className="absolute w-full h-full"
        />
        {/* Overlay for better text readability */}
        <View className="absolute w-full h-full bg-black/20" />

        {/* Header Content */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
            onPress={() => navigator.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="flex-1 text-lg font-bold text-white text-center mx-4">
            Profile
          </Text>
          {/* <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            className="bg-green-500 p-3 rounded-lg shadow-lg ">
            <Text className="text-white text-sm">Add Product</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm"
            onPress={() => {navigator.navigate("MyAccount")
              
            }}
          >
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity> */}
        </View>
      </View>
      {/* Profile Section - Update the margin top */}
      <View className="px-4 -mt-20">
        <View className="flex-row items-center">
          <View className="items-center">
            <Image
              // source={farmerImage}
              source={
                userData?.pfp?.profilePic
                  ? { uri: userData.pfp.profilePic } // For remote image
                  : farmerImage                      // For local image
              }
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <View className=" flex flex-row">
              <Text className="text-lg font-bold mt-2">
                {userData?.fullName !== undefined
                  ? userData?.fullName
                  : userData?.name}
              </Text>
              <TouchableOpacity className="bg-[#048404] px-4 py-2 ml-2  text-xs rounded-full ">
                <Text className="text-white  text-sm text-center">{userData.userType === 'corporate'? 'Company/Organisation':userData.userType}</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-md font-bold ">
              {userData?.phoneNumber !== undefined
                ? userData?.phoneNumber
                : userData?.phone}
            </Text>
            <Text className="text-sm text-gray-500">
              {userData?.block + " " + userData?.district + " " + userData?.state}
            </Text>
          </View>


          
        </View>

        <Text className="mt-4 text-sm text-gray-900 font-italic p-2 border-2 border-blue-500">
          Marketplace farmer page where you can see all the info related to the
          farmer itself, like location, products he can plant and harvest for
          you.
        </Text>
      </View>
      {/* Products Section */}
      <View className="mt-4 px-4">
        <Text className="font-bold text-lg mb-2">Products</Text>
        <View className="flex-row flex-wrap">
          {[
            { name: "Tomatoes", icon: "sun" }, // Example Feather icon
            { name: "Cucumbers", icon: "droplet" },
            { name: "Potatoes", icon: "package" },
            { name: "Onions", icon: "cloud-rain" },

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
      <View className="mt-6 px-4">
        <Text className="font-bold text-lg mb-4">Services</Text>
        <View className="flex-row flex-wrap justify-between">
          {/* Card 1: My Farm */}
          {(userData.userType === "farmer" || userData.userType === "corporate") && (
            <TouchableOpacity
              onPress={() =>
                userData.userType === "farmer"
                  ? navigator.navigate("AddFarm")
                  : navigator.navigate("BusinessProfile")
              }
              className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border"
            >
              <Feather name="box" size={32} color="#048404" />
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-gray-800">
                  {userData.userType === "farmer" ? "My Farm" : "My Business Profile"}
                </Text>
                <Text className="text-sm text-gray-500">
                  {userData.userType === "farmer"
                    ? "Manage your farm"
                    : "Manage your business"}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Card 2: Rent Product */}
          {userData.userType === "farmer" && (
            <TouchableOpacity
              onPress={() => navigator.navigate("rentProduct")}
              className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border"
            >
              <Feather name="package" size={32} color="#048404" />
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-gray-800">Rent Product</Text>
                <Text className="text-sm text-gray-500">
                  Rent equipment easily
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Card 3: My Account */}
          <TouchableOpacity
            onPress={() => navigator.navigate("MyAccount")}
            className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border"
          >
            <Feather name="user" size={32} color="#048404" />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">My Account</Text>
              <Text className="text-sm text-gray-500">Access your account</Text>
            </View>
          </TouchableOpacity>

          {/* Card 4: My Store */}
          {userData.userType !== "consumer" && (
            <TouchableOpacity
              onPress={() => navigator.navigate("myStore")}
              className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border"
            >
              <Feather name="shopping-bag" size={32} color="#048404" />
              <View className="ml-3 flex-1">
                <Text className="font-semibold text-gray-800">My Store</Text>
                <Text className="text-sm text-gray-500">Manage your store</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Card 5: Group */}
          <TouchableOpacity
            onPress={() => navigator.navigate("groupList")}
            className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border"
          >
            <Feather name="users" size={32} color="#048404" />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">Group</Text>
              <Text className="text-sm text-gray-500">Join communities</Text>
            </View>
          </TouchableOpacity>

          {/* Card 6: Talk to Expert */}
         {userData.userType !== "corporate" && (
            <TouchableOpacity
            onPress={() => navigator.navigate("TalkToExpert")}
            className="w-[48%] bg-white p-4 rounded-xl shadow-md mb-4 flex-row items-center border-[#048404] border"
          >
            <Feather name="message-circle" size={32} color="#048404" />
            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">
                Talk to Expert
              </Text>
              <Text className="text-sm text-gray-500">Get expert advice</Text>
            </View>
          </TouchableOpacity>
         )}
        </View>
      </View>

      {/* <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddProduct setIsModalVisible={setIsModalVisible} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '90%', height: '95%', backgroundColor: 'white', borderRadius: 10, padding: 10, alignItems: 'center' },
  closeButton: { backgroundColor: '#048404', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  closeButtonText: { color: 'white', fontWeight: 'bold' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
