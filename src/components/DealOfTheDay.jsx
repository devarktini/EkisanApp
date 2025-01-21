import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { ScrollView } from 'react-native-gesture-handler';
import {Ionicons} from '@expo/vector-icons';
const dealOfTheDay = [
    {
      id: 1,
      name: 'Women Fitness Outfit',
      description: 'High quality gym wear',
      price: 79.99,
      image: 'https://media.istockphoto.com/id/493687446/photo/fresh-garden-vegetablesin-vintage-metal-basket.jpg?s=612x612&w=0&k=20&c=Q1w0PUL-ddnEyWwEnal7hfwQaq1QQXzrpTvNsHIrITc=',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://media.istockphoto.com/id/160356158/photo/fruits-and-veggies-in-wood-box-with-white-backdrop.jpg?s=612x612&w=0&k=20&c=WMWJuSBYbXtk7gfGCb3FkI2Eycd_2TkwQv8W34rUAQY=',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://media.istockphoto.com/id/522803894/photo/healthy-food-in-basket.jpg?s=612x612&w=0&k=20&c=8EGuahS2SisV4aIzIPca_KHOT-8nUIRzZfC2T-uFMh4=',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://media.istockphoto.com/id/1051343392/photo/pine-box-full-of-colorful-fresh-vegetables-and-fruits-on-a-white-background.jpg?s=612x612&w=0&k=20&c=JS94KsyZGV3_qEMUw-DZlN6kM5oklTJWQs8Rzbz3vS4=',
      rating: 4.9
    }
  ];
const DealOfTheDay = () => {
  return (
    <View className="mt-4">
              <View className="flex-row justify-between items-center px-4">
            <View>
              <Text className="text-xl  font-bold text-[#048404] ">Deal of the Day</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={14} color="#048404" />
                <Text className="text-xs  ml-1 text-red-500">22h 35m 25s remaining</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text className="text-[#048404]">View all →</Text>
            </TouchableOpacity>
          </View>
             <ScrollView 
               horizontal 
               showsHorizontalScrollIndicator={false} 
               className="px-4 py-2"
             >
               {dealOfTheDay.map((product) => (
                 <ProductCard key={product.id} item={product} />
               ))}
             </ScrollView>
           </View>
  )
}

export default DealOfTheDay