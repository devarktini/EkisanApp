import React, { useEffect, useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { autoLogin, refreshAuthToken } from "../services/authservice";
import { AppContext } from "../context/AppContext";
import OnboardingScreen from "../screens/OnboardingScreen";
import OnLandingScreen from "../screens/OnLandingScreen";
import DrawerNavigator from "./DrawerNavigator";
import CheckoutScreen from "../screens/CheckoutScreen";
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
import ProductsListingPage from "../screens/ProductsListingPage";

const Stack = createStackNavigator();

const AppNavigator = ({ isFirstLaunch }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await autoLogin();
      if (result) {
        setIsAuthenticated(true);
        await refreshAuthToken();
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, [setIsAuthenticated]);

  if (loading) return null; // Show a splash screen if needed

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
          <Stack.Screen name="Main" component={DrawerNavigator} />
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
