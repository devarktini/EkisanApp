import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeTab = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Home Tab</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeTab;
