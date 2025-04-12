import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { DrawerActions, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/splashscreen_logo.png';
import { AppContext } from '../context/AppContext';
import farmerImage from '../assets/farmer.png';

const Header = () => {
  const { userData } = useContext(AppContext);
  const [notificationCount, setNotificationCount] = useState(0);
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    // Check if userData and notifications exist before accessing them
    if (userData && userData.notifications) {
      setNotificationCount(Object.keys(userData.notifications).length);
    } else {
      setNotificationCount(0); // Default to 0 if notifications are undefined
    }

    // Show or hide elements based on the current route
    if (route.name === 'HomeTab' || route.name === 'Search') {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [route.name, userData]);

  const imageSource = userData?.pfp?.profilePic
  ? { uri: userData.pfp.profilePic }
  : farmerImage;
  return (
    <View className="bg-white px-4 py-2 flex-row items-center justify-between">
      {show ? (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Ionicons name="menu" size={35} color="#048404" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Search')} className="">
          <Ionicons name="search-outline" size={30} color="#048404" />
        </TouchableOpacity>
      )}

      <View className="flex-row items-center">
        <Image 
          source={logo}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="text-[15px] font-semibold text-[#048404] ml-1">eKisan Darshan</Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('notification')} style={{ position: 'relative' }}>
          <Ionicons name="notifications-outline" size={24} color="#048404" style={{ marginLeft: 10 }} />
          {notificationCount > 0 && (
            <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 12 }}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {show && (
        <TouchableOpacity>
          <Image 
          // source={farmerImage}
          source = {
    userData?.pfp?.profilePic
      ? { uri: userData.pfp.profilePic } // For remote image
      : farmerImage                      // For local image
  }
            className="w-12 h-12 rounded-full border-2 border-[#048404]"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

    </View>
  );
};

export default Header;