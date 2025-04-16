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
import { ref, onValue, off } from "firebase/database";
import { Ionicons } from "@expo/vector-icons"; // Back icon
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchSeller, getReviews } from "../services/userService";
import filterProduct from "../services/filterProduct";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/productService";
import { AirbnbRating } from 'react-native-ratings'; // You'll need to install this package
import { getFarms } from "../services/farmer/FarmerFarmProfile";
import CustomRating from '../components/CustomRating';

const FarmerViewDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { seller } = route.params || {}; // Get sellerUID from route params
  const [farmerData, setFarmerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [totalRating, setTotalRating] = useState()
  const [reviews, setReviews] = useState([]);
  const [sellers, setSellers] = useState(null);
  const [sellerFarmsData, setSellerFarmsData] = useState([]);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (!seller) {
      setError("Seller ID is missing!");
      setLoading(false);
      return;
    }

    const getAllFarms = async () => {
      const CurrentUser = {
          userId: seller
      }
      const data = await getFarms(CurrentUser);
      setSellerFarmsData(data)
  };
  getAllFarms();

   
    const fetchData = async (retryCount = 0) => {
      try {
        setLoading(true);
        setError(null);
        const sellerData = await fetchSeller({ sellerId: seller.userId || seller.uid });
      
        const userRef = ref(database, `users/${seller}`);  
        const unsubscribe = onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              // Validate required fields
              if (!data.name || !data.userType) {
                setError("Invalid farmer data format");
                return;
              }
              
              // Transform and sanitize data if needed
              const sanitizedData = {
                ...data,
                name: data.name.trim(),
                userType: data.userType.trim(),
                address: data.address || {},
                item_rejected: data.item_rejected || []
              };
              
              setFarmerData(sanitizedData);
            } else {
              // Retry logic for empty data
              if (retryCount < MAX_RETRIES) {
                console.warn(`Retry attempt ${retryCount + 1}`);
                setTimeout(() => fetchData(retryCount + 1), 1000 * (retryCount + 1));
                return;
              }
              setError("No farmer data available");
            }
          },
          (error) => {
            console.error("Database error:", error);
            setError(`Failed to fetch data: ${error.message}`);
          },
          { onlyOnce: true }
        );

        // Cleanup function
        return () => {
          off(userRef);
          unsubscribe();
        };

      } catch (error) {
        console.error("🔥 Error:", error);
        setError(`An unexpected error occurred: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [seller]);

  
  const fetchAllReviews = async () => {
    const data = await getReviews(seller);
    const totalRating = data.reduce((sum, review) => sum + (review.selectedRating || 0), 0);
    setTotalRating(totalRating)
    setReviews(data)
}

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const productsList = await fetchProducts({});
        setProducts(productsList);
        
        // Fix: Use seller from route.params instead of params
        if (seller) {
          const sellerData = await fetchSeller({ sellerId: seller });
          setSellers(sellerData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch seller data");
      }
    };

    fetchDatas();
    fetchAllReviews();
  }, [seller]); // Add seller as dependency

  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    return (totalRating / reviews.length).toFixed(1);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderFarmIcon = (type) => {
    const iconMap = {
      animalHusbandry: "paw",
      irrigation: "water",
      storage: "cube",
      soilTested: "leaf",
      chemicalFertilizer: "flask",
    };
    return iconMap[type] || "checkbox";
  };

  const renderProductGrid = () => {
    const filteredProducts = filterProduct({
      products,
      filterBy: "seller",
      sellerUID: seller,
    });

    return (
      <View className="px-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-gray-800">
            Farmer's Products
          </Text>
          <Text className="text-green-600 text-sm">
            {filteredProducts.length} items
          </Text>
        </View>

        {filteredProducts.length > 0 ? (
          <View className="flex-row flex-wrap justify-between">
            {filteredProducts.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] mb-4 bg-white rounded-xl shadow-md overflow-hidden"
                onPress={() => navigation.navigate('ProductDetails', { product : item })}
              >
                <Image
                  source={{ uri: item.imgUrl }}
                  className="w-full h-32 rounded-t-xl"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-lg font-bold text-gray-800 mb-1" numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-2" numberOfLines={1}>
                    {item.description}
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-green-600 font-bold">
                      ₹{item.price}
                    </Text>
                    {item.inStock ? (
                      <View className="bg-green-100 px-2 py-1 rounded-full">
                        <Text className="text-xs text-green-700">In Stock</Text>
                      </View>
                    ) : (
                      <View className="bg-red-100 px-2 py-1 rounded-full">
                        <Text className="text-xs text-red-700">Out of Stock</Text>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="items-center py-8">
            <Ionicons name="basket-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2">No products available</Text>
          </View>
        )}
      </View>
    );
  };

  // Add error UI
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Ionicons name="warning" size={48} color="#FF6B6B" />
        <Text className="text-lg font-bold text-red-500 mt-4">{error}</Text>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mt-4 bg-green-500 px-6 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  // const products = farmerData.item_rejected
  //   ? Object.values(farmerData.item_rejected)
  //   : [];

  return (
    <View className="flex-1 bg-white">
<StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Enhanced Header Section */}
      <LinearGradient
        colors={['#2D723F', '#00C853']}
        className="w-full pt-6"
      >
        <View className="mt-16 pb-6 px-4">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              className="bg-white/20 p-2 rounded-full"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl font-bold">
              Farmer Profile
            </Text>
           <View></View>
          </View>

          <TouchableOpacity className="items-center mt-4">
            <View className="bg-white p-1 rounded-full shadow-lg">
              {farmerData?.pfp?.profilePic ? (
                <Image
                  source={{ uri: farmerData?.pfp?.profilePic }}
                  className="w-24 h-24 rounded-full"
                />
              ) : (
                <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center">
                  <Ionicons name="person" size={40} color="#666" />
                </View>
              )}
            </View>
            <Text className="text-white text-2xl font-bold mt-3">
              {farmerData?.name || "Unknown Farmer"}
            </Text>
            <Text className="text-white/80 text-base">
              {farmerData.userType === 'corporate'? 'Company/Organisation':farmerData.userType || "Not Available"}
            </Text>
             {console.log("first", farmerData)}
            <View className="flex-row items-center mt-2">
              <Ionicons name="location" size={16} color="white" />
              <Text className="text-white/90 text-sm ml-1">
                {farmerData?.address
                  ? `${farmerData.address.address_line_1 || ""}, ${
                      farmerData.address.pincode || ""
                    }`
                  : "No Address Available"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1">
        {renderProductGrid()}
        
        {/* Farms Section */}
        <View className="px-6 py-4">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Farmer's Farms
          </Text>

          {sellerFarmsData?.data?.length > 0 ? (
            sellerFarmsData.data.map((farm, index) => (
              <View key={index} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
                {/* Farm Header */}
                <LinearGradient
                style={{ paddingHorizontal: 16, paddingVertical: 8 }}
                  colors={['#2D723F', '#00C853']}
                  className="px-4 py-3"
                >
                  <Text className="text-lg font-bold text-white">
                    {farm.cropName}
                  </Text>
                  <Text className="text-white/80 text-sm">
                    {farm.cropType}
                  </Text>
                </LinearGradient>

                {/* Farm Details */}
                <View className="p-4">
                  <View className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                      <Ionicons name="calendar" size={20} color="#666" />
                      <Text className="ml-2 text-gray-700">
                        Sowing Date: {farm.dateOfSowing}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="resize" size={20} color="#666" />
                      <Text className="ml-2 text-gray-700">
                        {farm.fieldArea} {farm.fieldSizeUnit}
                      </Text>
                    </View>
                  </View>

                  {/* Farm Features */}
                  <View className="flex-row flex-wrap">
                    {['animalHusbandry', 'irrigation', 'storage', 'soilTested', 'chemicalFertilizer'].map(
                      (feature) => farm[feature] === 'yes' && (
                        <View key={feature} className="flex-row items-center mr-4 mb-2 bg-green-50 px-3 py-1 rounded-full">
                          <Ionicons 
                            name={renderFarmIcon(feature)} 
                            size={16} 
                            color="#2D723F" 
                          />
                          <Text className="ml-1 text-green-800 text-sm capitalize">
                            {feature.replace(/([A-Z])/g, ' $1').trim()}
                          </Text>
                        </View>
                      )
                    )}
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center py-4">
              No farms registered
            </Text>
          )}
        </View>


        {/* Announcements Section */}
        <View className="px-6 py-6 bg-gradient-to-r from-green-50 to-white">
          {/* <View className="flex-row items-center justify-between mb-6">
            <Text className="text-xl font-bold text-gray-800">
              Announcements
            </Text>
            <TouchableOpacity className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-700 text-sm">View All</Text>
            </TouchableOpacity>
          </View> */}

          {/* Announcement Cards */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {/* First Announcement */}
            <View className="bg-white p-4 rounded-xl shadow-sm mr-4 border border-gray-100 w-full">
              <View className="flex-row items-center mb-3">
                <View className="bg-green-100 p-2 rounded-full">
                  <Ionicons name="megaphone" size={20} color="#048404" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-bold text-gray-800">Announcement</Text>
                  {/* <Text className="text-xs text-gray-500">2 hours ago</Text> */}
                </View>
              </View>
              <Text className="text-gray-600 text-sm mb-3">
              To help {farmerData.name} you can give reviews , rating and can talk by adding them to group also
              </Text>
              {/* <TouchableOpacity className="flex-row items-center">
                <Text className="text-green-600 text-sm font-medium">Learn More</Text>
                <Ionicons name="arrow-forward" size={16} color="#048404" style={{ marginLeft: 4 }} />
              </TouchableOpacity> */}
            </View>

            {/* Second Announcement */}
            {/* <View className="bg-white p-4 rounded-xl shadow-sm mr-4 border border-gray-100 w-72">
              <View className="flex-row items-center mb-3">
                <View className="bg-blue-100 p-2 rounded-full">
                  <Ionicons name="notifications" size={20} color="#0066FF" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-bold text-gray-800">Seasonal Update</Text>
                  <Text className="text-xs text-gray-500">1 day ago</Text>
                </View>
              </View>
              <Text className="text-gray-600 text-sm mb-3">
                Get ready for the upcoming harvest season with special offers!
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-green-600 text-sm font-medium">View Details</Text>
                <Ionicons name="arrow-forward" size={16} color="#048404" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </View>

        {/* Reviews Section */}
        <View className="px-6 py-4 bg-white">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Reviews & Ratings
          </Text>

          {/* Rating Summary */}
          <View className="bg-gray-50 p-4 rounded-lg mb-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-3xl font-bold text-gray-900">
                  {calculateAverageRating()}
                </Text>
                <Text className="text-sm text-gray-500">
                  Based on {reviews.length} reviews
                </Text>
              </View>
              <CustomRating rating={calculateAverageRating()} />
            </View>
          </View>

          {/* Individual Reviews */}
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <View 
                key={review.id} 
                className="border-b border-gray-200 py-4"
                style={index === 0 ? {borderTopWidth: 1} : {}}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                      <Text className="text-green-600 font-bold">
                        {review.reviewerName?.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="ml-3">
                      <Text className="font-semibold text-gray-800">
                        {review.reviewerName}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {formatDate(review.createdAt)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-700 mr-2">
                      {review.selectedRating}
                    </Text>
                    <Ionicons 
                      name="star" 
                      size={16} 
                      color="#FFB800"
                    />
                  </View>
                </View>
                {review.text && (
                  <Text className="text-gray-600 mt-2 ml-13">
                    {review.text}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <Text className="text-gray-500 text-center py-4">
              No reviews yet
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FarmerViewDetails;
