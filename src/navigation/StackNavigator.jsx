import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../components/ProductList';
import ProductDetails from '../screens/ProductDetails';
import HomeTab from '../screens/Home/HomeTab';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Landing" component={HomeTab} />
    </Stack.Navigator>
  );
};

export default StackNavigator; 