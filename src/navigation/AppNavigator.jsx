import React, { useEffect, useState, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { autoLogin, refreshAuthToken } from '../services/authservice';
import OnboardingScreen from "../screens/OnboardingScreen";
import OnLandingScreen from "../screens/OnLandingScreen";
import DrawerNavigator from "../navigation/DrawerNavigator";
import HomeScreen from "../screens/Home/HomeScreen";
import CategoryProduct from "../screens/CategoryProduct";
import CheckoutScreen from "../screens/CheckoutScreen";
import LoginScreen from "../screens/LoginScreen";
import OTPScreen from "../screens/OTPScreen";
import PersonalDetails from "../screens/PersonalDetails";
import ProductAddress from "../screens/ProductAddress";
import ShoppingBag from "../screens/ShoppingBag";
import UserProfile from "../screens/UserProfile";
import ProductDetails from "../screens/ProductDetails";
import CartScreen from "../screens/CartScreen";
import ShoppingCart from "../screens/ShoppingCart";
import SignInScreen from "../screens/SignInScreen";
import SignupScreen from "../screens/SignupScreen";
import AddFarm from "../screens/Profile/AddFarm";
import { AppContext } from '../context/AppContext';
import ProductsListingPage from "../screens/ProductsListingPage";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const MainTabNavigator = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Home" component={HomeScreen} />
//     <Tab.Screen name="Category" component={CategoryProduct} />
//     {/* ...other screens... */}
//   </Tab.Navigator>
// );

const AppNavigator = ({ isFirstLaunch }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await autoLogin();
      if (result) {
        setIsAuthenticated(true);
        await refreshAuthToken();
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Landing" component={OnLandingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
        </>
      ) : isAuthenticated ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalDetails} />
          <Stack.Screen name="ProductList" component={ProductsListingPage} />
          <Stack.Screen name="Product" component={ProductAddress} />
          <Stack.Screen name="ShoppingBag" component={ShoppingBag} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
          <Stack.Screen name="AddFarm" component={AddFarm} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;