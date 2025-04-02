import React, { useEffect, useState, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { autoLogin, refreshAuthToken } from '../services/authservice';
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
import { AppContext } from '../context/AppContext';
import ProductsListingPage from "../screens/ProductsListingPage";
import PhoneAuthScreen from "../screens/PhoneAuthScreen";
import AuthOtpScreen from "../screens/AuthOtpScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import MyAccount from "../screens/Account/MyAccount";
import OrderScreen from "../screens/OrderScreen";
import MessageGroup from "../screens/MessageGroup";
import TalkToExpert from "../screens/TalkToExpert";
import MyStore from "../screens/MyStore";
import NotificationScreen from "../screens/NotificationScreen";
import FQScreen from "../screens/FQScreen";
import ContactSupport from "../screens/Contact/ContactSupport";
import PrivicyPolicy from "../screens/PrivicyPolicy";
import RentProductScreen from "../screens/RentProductScreen";
import { getAuthToken, getUserData } from "../asyncStorege/authStorage";
import FarmerViewDetails from "../screens/FarmerViewDetails";

const Stack = createStackNavigator();

const AppNavigator = ({ isFirstLaunch }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);
 
  useEffect(() => {
    const checkAuth = async () => {
       const token = await getAuthToken()
      const userList = JSON.parse(await getUserData());
      console.log("first, userListdddd", token)
      const result = await autoLogin(userList.phoneNumber !== undefined ? userList.phoneNumber : userList.phone);
      console.log("first, result", result)
      if (result) {
        setIsAuthenticated(true);
        // await refreshAuthToken(userList.phoneNumber);
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
          <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
          <Stack.Screen name="OtpVerify" component={AuthOtpScreen} />
          <Stack.Screen 
            name="UpdateProfile" 
            component={UpdateProfileScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
          <Stack.Screen name="Main" component={DrawerNavigator} />
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
          <Stack.Screen name='MyAccount' component={MyAccount} />
          <Stack.Screen name ='order' component={OrderScreen} />
          <Stack.Screen name ='groupList' component={MessageGroup} />
          <Stack.Screen name ='TalkToExpert' component={TalkToExpert} />
          <Stack.Screen name="myStore" component={MyStore} />
          <Stack.Screen name="notification" component={NotificationScreen} />
          <Stack.Screen name="f&q" component={FQScreen} />
          <Stack.Screen name="contactSupport" component={ContactSupport} />
          <Stack.Screen name="privicyPolicy" component={PrivicyPolicy} />
          <Stack.Screen name="rentProduct" component={RentProductScreen} />
          <Stack.Screen name="FarmerViewDetails" component={FarmerViewDetails} />
          <Stack.Screen 
            name="UpdateProfile" 
            component={UpdateProfileScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
        </>
      ) : (
        <>
        <Stack.Screen name="PhoneAuth" component={PhoneAuthScreen} />
        <Stack.Screen name="OtpVerify" component={AuthOtpScreen} />
        <Stack.Screen 
            name="UpdateProfile" 
            component={UpdateProfileScreen}
            options={{
              presentation: 'modal',
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'vertical',
            }}
          />
        
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;