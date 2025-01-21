import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { DrawerActions, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/splash.png';

const Header = () => {
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  // Use useEffect to update the state based on the route name
  useEffect(() => {
    if (route.name === 'HomeTab') {
      setShow(true);
    } else if (route.name === 'Search') {
      setShow(true);
    }
  }, [route.name]); // Only run this effect when route.name changes

  return (
    <View className="bg-white px-4 py-2 flex-row items-center justify-between">
    

      {show ? (
         <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
         <Ionicons name="menu" size={35} color="#048404" />
       </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Search')} className="">
          <Ionicons name="" size={30} color="#048404" />
        </TouchableOpacity>
      )}

      <View className="flex-row items-center">
        <Image 
          source={logo}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="text-[15px] font-semibold text-[#048404] ml-1">EKrishan Darshan</Text>
      </View>
   {
      <TouchableOpacity>
      <Image 
        source={{ uri: 'https://i.imgur.com/profile.jpg' }}
        
        className={`w-14 h-14 rounded-full border-2 border-[#048404] ${show ? '' : 'hidden'}`}


        resizeMode="cover"
      />
    </TouchableOpacity>
   }
    
    </View>
  );
};

export default Header;