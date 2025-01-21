import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeTab from "../screens/Home/HomeTab";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ShoppingBag from "../screens/ShoppingBag";
import ProductDetails from "../screens/ProductDetails";
import Wishlist from "../screens/Wishlist";
import CategoryProduct from "../screens/CategoryProduct";
import CheckoutScreen from "../screens/CheckoutScreen";
import ShoppingCart from "../screens/ShoppingCart";
import CartScreen from "../screens/CartScreen";
import { useCart } from '../context/CartContext'; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { getCartItemCount,  getWishlistItemCount } = useCart(); // Get the cart item count
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "white", borderTopWidth: 2, borderTopColor: "#10B981" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "HomeTab") iconName = "home";
          else if (route.name === "Profile") iconName = "user";
          else if (route.name === "Cart") iconName = "shopping-cart";
          else if (route.name === "Wishlist") iconName = "heart";
          else if (route.name === "Settings") iconName = "settings";
          else if (route.name === "Search") iconName = "category";
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#10B981",
        tabBarInactiveTintColor: "#6B7280",
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen}  />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Search" component={CategoryProduct} options={{ title: "Categories" }}/>
      <Tab.Screen name="Wishlist" component={Wishlist} 
        options={{
        title: 'Wishlist',
        tabBarBadge: getWishlistItemCount() > 0 ? getWishlistItemCount() : null, // Dynamic badge
      }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarBadge: getCartItemCount() > 0 ? getCartItemCount() : null, // Dynamic badge
        }}
      />
      {/* <Tab.Screen name="ShoppingBag" component={ShoppingBag} /> */}

      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    
    </Tab.Navigator>
  );
};

export default TabNavigator;
