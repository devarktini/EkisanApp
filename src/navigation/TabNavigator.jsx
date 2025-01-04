import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeTab from "../screens/Home/HomeTab";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "white", borderTopWidth: 2, borderTopColor: "#10B981" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeTab") iconName = "home";
          else if (route.name === "Profile") iconName = "user";
          else if (route.name === "Settings") iconName = "settings";

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#10B981",
        tabBarInactiveTintColor: "#6B7280",
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeTab} options={{ title: "Home" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
