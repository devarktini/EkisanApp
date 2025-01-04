/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  useColorScheme,
  View,
} from 'react-native';
import { styled } from 'nativewind';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './component/home';
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
//const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)
const StyledImage=styled(Image)
const tab=createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <tab.Navigator>
        <tab.Screen name='Home' 
        component={Home}
        />
        <tab.Screen name='Search' component={Search}/>
        <tab.Screen name='Cart' component={Cart}/>
      </tab.Navigator>
    </NavigationContainer>
    
  );
}

const Cart=()=>{
  return(<StyledView className='flex-1 items-center'>
    <StyledText className='text-xl'>Cart</StyledText>
    </StyledView>)
}
const Search=()=>{
  return(<StyledView className='flex-1 items-center'>
    <StyledText className='text-xl'>Search</StyledText>
    </StyledView>)
}
const styles = StyleSheet.create({
  font: {
    fontFamily:'Inter-Italic-VariableFont_opsz,wght',
  },
  
})

export default App;
