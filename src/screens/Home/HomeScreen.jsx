import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import AppSlider from '../../slider/AppSlider';
import ProductCard from '../../components/ProductCard';
import DealOfTheDay from '../../components/DealOfTheDay';
import FertilizersPesticide from '../../components/FertilizersPesticide';
import Pulses from '../../components/Pulses';
import IrrigationEquipment from '../../components/IrrigationEquipment';
import AdScrollView from '../../components/AdScrollView';
import { fetchCategories, fetchProducts } from '../../services/productService';
import { AppContext } from '../../context/AppContext';
import SearchOverlay from '../../components/SearchOverlay';



const CategoryCircle = ({coverUrl, coverImage, categorieName }) => {
  const navigation = useNavigation();
  
    const route = useRoute();
    const user = route.params?.user || {};

  const handleCategoryPress = () => {
    if (categorieName) {
      navigation.navigate('ProductList', { searchQuery: categorieName })
    } else {
      console.log('Category name is undefined');
    }
  };

  return (
    <TouchableOpacity 
      className="items-center mx-2"
      onPress={handleCategoryPress}
      style={{ shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5 }}
    >
      <Image
        source={{ uri: coverUrl }}
        style={{ width: 48, height: 48, borderRadius: 24 }}
        resizeMode="cover"
      />
      <Text className="text-xs mt-1 text-gray-600" style={{ fontWeight: 'bold' }}>{categorieName}</Text>
    </TouchableOpacity>
  );
};


const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const user = route?.params?.user;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const[fullProducts, setFullProducts]= useState([])
  const [vegetables, setVegetables]= useState([])
  const [fertilizers, setFertilizers] = useState([]);
  const [pulses, setPulses] = useState([]);
  const [Irrigation, setIrrigation]= useState([])
   const {  setCategoryList, categoryList } = useContext(AppContext);
   const [isSearchVisible, setIsSearchVisible] = useState(false);
const [recentSearches, setRecentSearches] = useState([
  'Vegetables',
  'Fruits',
  'Seeds',
  'Fertilizers',
  'Tools'
]);
  useEffect(() => {
    fetchCategories({ user }).then(setCategories);
    fetchCategories({ user }).then(setCategoryList);

    fetchProducts({ sortType: "newest", limit: 10 }).then(setProducts);
    fetchProducts({ sortType: "newest", limit: 10, search:"Vegetables" }).then(setVegetables);
    fetchProducts({ sortType: "newest", limit: 10, search: "Fertilizers & Pesticides" }).then(setFertilizers);
    fetchProducts({ sortType: "newest", limit: 10, search: "Pulses" }).then(setPulses);
    fetchProducts({ sortType: "newest", limit: 10, search: "Irrigation Equipment" }).then(setIrrigation);
  }, [user]);

  const ViewAllProductList = (searchQuery) => {
   
    navigation.navigate("ProductList", { searchQuery: searchQuery });
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      {/* Header */}
   
      <Header/>

      {/* Search Bar */}
      <View className="bg-white px-4 py-2 border-b border-gray-100">
        <TouchableOpacity
          className="flex-row items-center bg-[#F5F5F5] rounded-full px-4 py-1 border-2 border-[#048404]"
          onPress={() => setIsSearchVisible(true)}
        >
          <Ionicons name="search-outline" size={20} color="#048404" />
          <Text  className="flex-1 ml-2 py-2 text-base font-medium text-gray-700">
            Search any Product..
          </Text>
          <Ionicons name="mic-outline" size={20} color="#048404" />
        </TouchableOpacity>
      </View>

      {/* Search Overlay */}
      <SearchOverlay
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
        onSearch={(query) => {
          navigation.navigate("ProductList", { searchQuery: query });
          setIsSearchVisible(false);
        }}
        recentSearches={recentSearches}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* All Featured - Now Horizontal */}
        <View className="py-1">
          <View className="flex-row justify-between items-center px-4 mb-3">
            <Text className="text-xl font-bold text-[#048404]">All Featured</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text className="text-[#048404]">View all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="px-4"
          >
            {categories.map((category) => (
              <CategoryCircle key={category.id} {...category} />
            ))}
          </ScrollView>
        </View>

        {/* Sale Banners */}
        {/* <AppSlider/> */}

        {/* Special Offers */}
        <View className="mt-4 px-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-xl font-bold text-[#048404]">Special Offers</Text>
            <TouchableOpacity>
              <Text className="text-[#048404]">View all</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-yellow-100 rounded-xl p-4 flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-lg font-bold">10% Cashback</Text>
              <Text className="text-sm text-gray-600 mt-1">On first order</Text>
            </View>
            <Image 
              source={{ uri: 'https://i.imgur.com/cashback.png' }}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Trending Products - Now Horizontal */}
        <View className="mt-4">
          <View className="flex-row justify-between items-center px-4 mb-3 ">
            <Text className="text-xl font-bold text-[#048404]">Trending Products</Text>
            <TouchableOpacity onPress={()=>ViewAllProductList()}>
              <Text className="text-[#048404]">View all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="px-4 py-2 flex-1"
          >
            {products.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </ScrollView>
        </View>

        {/* Hot Summer Sale Banner */}
        <View className="mt-4 px-4">
          <Image 
            source={{ uri: 'https://as1.ftcdn.net/v2/jpg/02/69/28/44/1000_F_269284421_STKJdiyneJ13aN5xsUcol0cUQ1Jz5n9O.jpg' }}
            className="w-full h-32 rounded-xl"
            resizeMode="cover"
          />
        </View>

        {/* New Arrivals */}
        <View className="mt-4 px-4 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold">New Arrivals</Text>
            <TouchableOpacity>
              <Text className="text-blue-500">View all →</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-gray-900 rounded-xl p-4">
            <Text className="text-white text-lg font-bold">UP TO 50% OFF</Text>
            <Text className="text-white text-sm mt-1">Summer '23 Collections</Text>
          </TouchableOpacity>
        </View>

        {/* Deal of the Day - Now Horizontal */}
        <DealOfTheDay vegetables={vegetables} ViewAllProductList={ViewAllProductList}/>
      {/* Fertilizers and Pesticides */}
        <FertilizersPesticide fertilizers={fertilizers} ViewAllProductList={ViewAllProductList}/>
        {/* Pulses */}
        <Pulses pulses={pulses} ViewAllProductList={ViewAllProductList}/>
   {/* Irrigation Equipment */}
        <IrrigationEquipment Irrigation={Irrigation} ViewAllProductList={ViewAllProductList}/>
    {/* sponsors */}  
    <AdScrollView/>      

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
