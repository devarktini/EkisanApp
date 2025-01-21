import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard';
import { ScrollView } from 'react-native-gesture-handler';

const Pulsess  = [
    {
      id: 1,
      name: 'Women Fitness Outfit',
      description: 'High quality gym wear',
      price: 79.99,
      image: 'https://media.istockphoto.com/id/976513256/photo/close-up-seed-for-bird-food-birdseed-background.jpg?s=612x612&w=0&k=20&c=Of7RWyl6P2QqkbYv8ktggUV4tVq58miNfNPvAfVOmI0=',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://media.istockphoto.com/id/1316675881/photo/hand-holding-agriculture-fertilizer-or-fertiliser-granules-with-background-of-farm-or-field.webp?a=1&b=1&s=612x612&w=0&k=20&c=T_5PQUtt17of0xwacggtZJF22l7pzQtkGGVPHQBa4EE=',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://plus.unsplash.com/premium_photo-1670135171026-37ce1cdb5502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Nike Air Jordan Special',
      description: 'Limited edition sneakers',
      price: 129.99,
      image: 'https://plus.unsplash.com/premium_photo-1678548904724-8a7d6ef79eb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8',
      rating: 4.9
    }
  ];
const Pulses= () => {
  return (
    <View className="mt-4">
              <View className="flex-row justify-between items-center px-4">
            <View>
              <Text className="text-xl  font-bold text-[#048404] py-2 ">Pulses</Text>
             
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
               {Pulsess.map((product) => (
                 <ProductCard key={product.id} item={product} />
               ))}
             </ScrollView>
           </View>
  )
}

export default Pulses