import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import ProductCard from "../components/ProductCard";
import { useRoute } from "@react-navigation/native";
import { fetchProducts } from "../services/productService";
import { Ionicons } from '@expo/vector-icons';

const ProductsListingPage = () => {
  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const serchText = route.params?.searchQuery || ""

  useEffect(() => {
    fetchProducts({ sortType: "newest", limit: null, search:serchText  }).then(setProducts);
  }, [searchQuery]);

  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product List Page</Text>
      <View className="bg-white px-4 py-2 border-b border-gray-100">
        <View className="flex-row items-center bg-[#F5F5F5] rounded-full px-4 py-1 border-2 border-[#048404]">
          <Ionicons name="search-outline" size={20} color="#048404" />
          <TextInput
            className="flex-1 ml-2 text-base font-medium text-gray-700"
            placeholder="Search any Product.."
            placeholderTextColor="#048404 "
            value={searchQuery}
            onChangeText={setSearchQuery}
            
          />
          <TouchableOpacity>
            <Ionicons name="mic-outline" size={20} color="#048404" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.productsContainer, { paddingVertical: 10 }]}>
        {filteredProducts?.map((product) => (
          <View className="pt-4" key={product.id} style={styles.cardWrapper}>
            <ProductCard item={product} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: 'center',
    justifyContent:'center',
    paddingTop:'10px'
  },
});

export default ProductsListingPage;
