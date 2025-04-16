import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import filterProduct from "../services/filterProduct";
import { fetchProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

const ProductDetails = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params || {};
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product?.availableSizes?.[0] || "N/A"
  );
  const [cartItems, setCartItems] = useState([]);
  const [mainImage, setMainImage] = useState(product?.imgUrl);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const allProducts = await fetchProducts({});
        const filtered = filterProduct({
          products: allProducts,
          filterBy: "category",
          category: product.category
        }).filter(item => item.id !== product.id).slice(0, 6);
        setSimilarProducts(filtered);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    if (product?.category) {
      fetchSimilarProducts();
    }
  }, [product]);

  if (!product) {
    return <Text>No product data available.</Text>;
  }

  const handleAddToCart = () => {
    const updatedProduct = {
      ...product,
      selectedSize,
      quantity: 1,
    };

    addToCart(updatedProduct);
    // Navigate to the CartScreen
    navigation.navigate("Cart");
  };

  const handleAddToCheckout = () => {
    const updatedProduct = {
      ...product,
      selectedSize,
      quantity: 1,
    };

    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    const updatedCartItems =
      existingProductIndex !== -1
        ? cartItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cartItems, updatedProduct];

    setCartItems(updatedCartItems);

    navigation.navigate("ShoppingBag", { cartItems: updatedCartItems });
  };

  const handleImagePress = (url) => {
    setMainImage(url);
    const pr = filterProduct({products:product, url})
  };

  const handleLocationPress = (key ,location) => {
    console.log("first", key)
    navigation.navigate("ProductList", {filterKey: key, filterValue:location });
// fetchProducts({})
//   .then((products) => {
//     console.log("Fetched products:", products.length);
//     const pr = filterProduct({products:products, filterBy:"district", district:location})
//     console.log("first", pr.length)
//   })
//   .catch((error) => {
//     console.error("Error fetching products:", error);
//   });

    // Handle location press (e.g., navigate to a map or details scree
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <TouchableOpacity
          className="p-2 rounded-full bg-gray-50"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        
        <Text className="flex-1 text-lg font-bold text-gray-800 text-center mx-4">
          Product Details
        </Text>
        
        
        <TouchableOpacity
          className="p-2 rounded-full bg-gray-50 relative"
          onPress={() => handleAddToCart()}
        >
          <Ionicons name="cart-outline" size={24} color="#048404" />
          {/* Add a badge if you have cart items */}
          {cartItems.length > 0 && (
            <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {cartItems.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <ScrollView>
          <Image
            source={{ uri: mainImage }}
            className="w-full h-72"
            resizeMode="cover"
          />
        </ScrollView>

        {/* Image Thumbnails */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-2"
        >
          {product.productImages?.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(image.url)}
            >
              <Image
                source={{ uri: image.url }}
                className="w-20 rounded-lg border border-green-400 h-20 mr-2"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Size Selection */}
        <View className="px-4 py-3">
          <View className=" flex flex-wrap flex-col items-start justify-start">
           <View className="flex-row items-center">
           <Text className="text-base mb-2">{product.userType === 'corporate'? 'Company/Organisation':product.userType}: </Text>
            
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("FarmerViewDetails", {
                  seller: product.sellerUID,
                })
              }
            >
              <View className="border rounded-full text-center my-auto bg-green-300 border-gray-400">
                <Text className="px-3 text-center text-sm">
                  {product.sellerName}
                </Text>
              </View>
            </TouchableOpacity>
           </View>

            {/* Location Details */}
            <View className="flex-row items-center mt-2">
              <Ionicons name="location-outline" size={16} color="#048404" />
              <TouchableOpacity onPress={() => handleLocationPress("district", product?.district)}>
                <Text className="ml-2 text-gray-700 underline">
                  {product?.district}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleLocationPress("state",product?.state)}>
                <Text className="ml-2 text-gray-700 underline">
                  {product?.state}
                </Text>
              </TouchableOpacity>
            </View>

            {/* <Text className="mr-2 px-2 border rounded-full text-center my-auto bg-green-300 border-gray-400">
              Farmer
            </Text> */}

            <View className="flex-row">
              {product.availableSizes?.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  className={`mr-3 px-6 py-2 rounded-full border ${
                    selectedSize === size ? "bg-black" : "bg-white"
                  }`}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    className={
                      selectedSize === size ? "text-white" : "text-black"
                    }
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View className="px-4 py-3 border-t border-gray-200">
          <Text className="text-base font-semibold">
            Category: {product.category || "N/A"}
          </Text>
        </View>
        {/* Product Details */}
        <View className="px-4">
          <Text className="text-xl font-semibold">{product.name}</Text>
          <Text className="text-gray-500 text-base">
            {product.description || "No description available."}
          </Text>

          {/* <View className="flex-row items-center mt-2">
            {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
              <Text key={i}>★</Text>
            ))}
            <Text className="ml-2 text-gray-500 text-sm">
              {product.reviews || "0"} Reviews
            </Text>
          </View> */}

          <View className="flex-row items-center mt-2">
            <Text className="text-xl font-bold">₹{product.price}</Text>
            <Text> /{product.unit}</Text>
            {product.originalPrice && (
              <Text className="ml-2 line-through text-gray-500">
                ${product.originalPrice}
              </Text>
            )}
            {product.discount && (
              <Text className="ml-2 text-green-600">
                {product.discount}% OFF
              </Text>
            )}
          </View>

          {/* <View className="mt-3">
            <Text className="text-gray-600 text-sm">
              {product.longDescription || "No detailed description available."}
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 text-sm mt-1">Read more</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* Delivery Info */}
        {/* <View className="px-4 py-3 mt-3 border-t border-gray-200">
          <Text className="text-base">Delivery in</Text>
          <Text className="text-lg font-bold">
            {product.deliveryTime || "N/A"}
          </Text>
        </View> */}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <View className="px-4 py-3 border-t border-gray-200">
            <Text className="text-lg font-bold mb-4">Similar Products</Text>
            <View className="flex-row flex-wrap justify-between">
              {similarProducts.map((item, index) => (
                <ProductCard key={index} item={item} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View className="absolute bottom-0 left-0 right-0 bg-white">
        <View className="flex-row p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 mr-2 bg-white border-[2px] border-[#048404] rounded-full py-3"
          >
            <Text className="text-center font-semibold">Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddToCheckout}
            className="flex-1 ml-2 bg-[#048404] rounded-full py-3"
          >
            <Text className="text-center text-white font-semibold">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;
