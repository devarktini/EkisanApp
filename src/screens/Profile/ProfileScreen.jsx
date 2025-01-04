import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  useEffect(() => {
     AsyncStorage.clear()
  }, [])
  
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
