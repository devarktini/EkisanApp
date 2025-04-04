import React, { useState, useEffect } from "react";
import { 
  Text, View, TextInput, ScrollView, StyleSheet, 
  TouchableOpacity, SafeAreaView 
} from "react-native";
import ProductCard from "../components/ProductCard";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchProducts } from "../services/productService";
import { Ionicons } from '@expo/vector-icons';

const ProductsListingPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const serchText = route.params?.searchQuery || "";

  useEffect(() => {
    fetchProducts({ sortType: "newest", limit: null, search: serchText }).then(setProducts);
  }, [searchQuery]);

  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View className="flex-row items-center mb-2 px-2">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2"
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-gray-800 ml-2">
          Product List
        </Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white py-2">
        <View className="flex-row items-center bg-[#F5F5F5] rounded-full px-3 py-1 mx-2 border-2 border-[#048404]">
          <Ionicons name="search-outline" size={20} color="#048404" />
          <TextInput
            className="flex-1 ml-2 text-base font-medium text-gray-700"
            placeholder="Search any Product.."
            placeholderTextColor="#048404"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={20} color="#048404" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products Grid */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsContainer}
      >
        {filteredProducts?.map((product) => (
          <View key={product.id} style={styles.cardWrapper}>
            <ProductCard item={product} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 8,
  },
});

export default ProductsListingPage;
