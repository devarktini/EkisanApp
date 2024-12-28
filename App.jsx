import 'react-native-gesture-handler'; // Ensure this is at the top of your App.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons"; // For icons
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";

// For NativeWind styles (ensure it's installed and set up correctly)
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeTab = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Home Tab</Text>
      </View>
    </SafeAreaView>
  );
};

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl font-bold">Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
};

const SettingsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-xl font-bold">Settings Screen</Text>
      </View>
    </SafeAreaView>
  );
};

// Drawer Screens
const AboutScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">About Us</Text>
      </View>
    </SafeAreaView>
  );
};

const ContactScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-bold">Contact Us</Text>
      </View>
    </SafeAreaView>
  );
};

// Custom Drawer Content
// const CustomDrawerContent = ({ navigation }) => {
//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <View className="flex-1 p-4">
//         <TouchableOpacity onPress={() => navigation.navigate("HomeTabs")}>
//           <Text className="text-lg font-semibold mb-4">Home</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("About")}>
//           <Text className="text-lg font-semibold mb-4">About</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
//           <Text className="text-lg font-semibold mb-4">Contact</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity
//         className="p-4 bg-red-500 rounded-lg m-4"
//         onPress={() => console.log("Logout pressed")}
//       >
//         <Text className="text-white font-bold text-center">Logout</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

const CustomDrawerContent = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Feather name="user" size={40} color="white" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Laurent Michenaud</Text>
          <Text style={styles.userEmail}>lmichenaud@gmail.com</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("HomeTabs")}>
          <Feather name="home" size={24} color="#10B981" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("About")}>
          <Feather name="info" size={24} color="#3B82F6" />
          <Text style={styles.drawerItemText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Contact")}>
          <Feather name="mail" size={24} color="#F59E0B" />
          <Text style={styles.drawerItemText}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Settings")}>
          <Feather name="settings" size={24} color="#6366F1" />
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => console.log("Rate App")}>
          <Feather name="star" size={24} color="#F97316" />
          <Text style={styles.drawerItemText}>Rate App</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout pressed")}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>

  );
};


const HomeTabs = () => {
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

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ title: "Home" }}
          />
          <Drawer.Screen name="About" component={AboutScreen} />
          <Drawer.Screen name="Contact" component={ContactScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // Light background for better contrast
  },
  header: {
    backgroundColor: "#3B82F6", // Blue gradient header
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 5, // Shadow for depth
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: "#4B5563", // Dark gray for avatar
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    color: "#D1D5DB",
    fontSize: 14,
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    marginBottom: 12,
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB", // Light gray divider
    marginHorizontal: 16,
    marginVertical: 8,
  },
  logoutButton: {
    backgroundColor: "#EF4444", // Red for logout
    margin: 16,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});