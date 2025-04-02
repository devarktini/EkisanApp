import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { DrawerActions, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/splashscreen_logo.png';
import { AppContext } from '../context/AppContext';
import { getUserData } from '../asyncStorege/authStorage';
import { get } from 'firebase/database';

const Header = () => {
  const {userData } = useContext(AppContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (userData !== null) {
      setNotificationCount(Object.keys(userData.notifications).length);
    }
    if (route.name === 'HomeTab') {
      setShow(true);
    } else if (route.name === 'Search') {
      setShow(true);
    }
  }, [route.name]);

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
        <Text className="text-[15px] font-semibold text-[#048404] ml-1">EKishan Darshan</Text>
        

      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('notification')} style={{ position: 'relative' }}>
          <Ionicons name="notifications-outline" size={24} color="#048404" style={{ marginLeft: 10 }} />
          <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{notificationCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
   {
      <TouchableOpacity>
      <Image 
        source={{ uri: 'https://i.imgur.com/profile.jpg' }}
        
        className={`w-12 h-12 rounded-full border-2 border-[#048404] ${show ? '' : 'hidden'}`}


        resizeMode="cover"
      />
    </TouchableOpacity>
   }
    
    </View>
  );
};

export default Header;