import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { database } from "../../firebase.config"; // Firebase configuration
import { ref, onValue } from "firebase/database";
import { Ionicons } from "@expo/vector-icons"; // Back icon

const FarmerViewDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { seller } = route.params || {}; // Get sellerUID from route params
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!seller) {
      console.error("❌ Seller ID is missing!");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const userRef = ref(database, `users/${seller}`);
        onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setFarmerData(data);
            } else {
              console.warn("⚠️ No farmer data found!");
            }
          },
          { onlyOnce: true }
        );
      } catch (error) {
        console.error("🔥 Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seller]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#00C853" />
        <Text className="mt-2 text-gray-700 font-semibold">Loading farmer details...</Text>
      </View>
    );
  }

  if (!farmerData) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg font-bold text-gray-700">No Farmer Data Found</Text>
      </View>
    );
  }

  // Extract products from farmerData
  const products = farmerData.item_rejected
    ? Object.values(farmerData.item_rejected)
    : [];

  return (
    <View className="flex-1 bg-white">
      {/* ✅ Custom Header with Back Button */}
      <View className="flex-row items-center p-4 bg-green-500 shadow-md">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold ml-2">
          Farmer Details
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* ✅ Farmer Profile Section */}
        <View className="items-center p-6 bg-gray-50 rounded-b-3xl shadow-md">
          {farmerData.pfp?.profilePic ? (
            <Image
              source={{ uri: farmerData.pfp.profilePic }}
              className="w-28 h-28 rounded-full border-4 border-gray-300"
            />
          ) : (
            <Text className="text-gray-500">No Image</Text>
          )}
          <Text className="text-2xl font-bold mt-2 text-gray-800">
            {farmerData.name || "Unknown Farmer"}
          </Text>
          <Text className="text-gray-600 text-lg">{farmerData.userType || "Not Available"}</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {farmerData.address
              ? `${farmerData.address.address_line_1 || ""}, ${
                  farmerData.address.address_line_2 || ""
                }, ${farmerData.address.pincode || ""}`
              : "No Address Available"}
          </Text>
        </View>

        {/* ✅ Product List Section */}
        <Text className="text-xl font-bold ml-6 mt-6 text-gray-800">
          Farmer's Products
        </Text>
        {products.length > 0 ? (
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="m-3 p-4 bg-white rounded-lg shadow-lg border border-gray-200 w-40">
                <Image
                  source={{ uri: item.imgUrl }}
                  className="w-32 h-32 rounded-lg"
                />
                <Text className="text-lg font-semibold mt-2 text-gray-800">
                  {item.name}
                </Text>
                <Text className="text-gray-600">₹{item.price}/{item.unit}</Text>
                {item.isRented && (
                  <Text className="text-green-500 font-semibold mt-1">
                    Rent: ₹{item.rentPrice}/{item.rentTime}
                  </Text>
                )}
              </View>
            )}
          />
        ) : (
          <Text className="ml-6 mt-2 text-gray-500">No products available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FarmerViewDetails;
