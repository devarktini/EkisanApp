import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { ScrollView } from 'react-native-gesture-handler';

const IrrigationEquipments  = [
    {
      id: 1,
      name: 'Women Fitness Outfit',
      description: 'High quality gym wear',
      price: 79.99,
      image: 'https://plus.unsplash.com/premium_photo-1661935892279-2420dbda3423?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://plus.unsplash.com/premium_photo-1677756429938-878c04e4e833?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SXJyaWdhdGlvbiUyMEVxdWlwbWVudCUyMGZvciUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1621460248083-6271cc4437a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8SXJyaWdhdGlvbiUyMEVxdWlwbWVudCUyMGZvciUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://plus.unsplash.com/premium_photo-1661825536186-19606cd9a0f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SXJyaWdhdGlvbiUyMEVxdWlwbWVudCUyMGZvciUyMGZhcm1pbmd8ZW58MHx8MHx8fDA%3D',
      rating: 4.9
    }
  ];
const IrrigationEquipment= () => {
  return (
    <View className="mt-4">
              <View className="flex-row justify-between items-center px-4">
            <View>
              <Text className="text-xl  font-bold text-[#048404] py-2 ">Irrigation Equipment</Text>
             
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
               {IrrigationEquipments.map((product) => (
                 <ProductCard key={product.id} item={product} />
               ))}
             </ScrollView>
           </View>
  )
}

export default IrrigationEquipment