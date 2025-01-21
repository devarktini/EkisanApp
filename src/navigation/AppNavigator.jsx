import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from "../screens/OnboardingScreen ";
import OnLandingScreen from "../screens/OnLandingScreen"; // Ensure this is imported
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

const Stack = createStackNavigator();

const AppNavigator = ({ isFirstLaunch }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
        <React.Fragment>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Landing" component={OnLandingScreen} />
          <Stack.Screen name="Main" component={DrawerNavigator} />
        </React.Fragment>
      ) : (
        <React.Fragment>
           <Stack.Screen name="Landing" component={OnLandingScreen} /> 
          <Stack.Screen name="Main"   component={DrawerNavigator} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Category" component={CategoryProduct} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="OtpScreen" component={OTPScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalDetails} />
          <Stack.Screen name="Product" component={ProductAddress} />
          <Stack.Screen name="ShoppingBag" component={ShoppingBag} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
        </React.Fragment>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;