/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
import data from './data.json'
import Inbox from './component/inbox';
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
//const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)
const StyledImage=styled(Image)
const StyledScrollView=styled(ScrollView);
const Font=styled(FontAwesome);
const tab=createBottomTabNavigator();
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home1 from './component/home1';
//import Home1 from './component/home1';
//import home1 from './component/home1';
const tab1 = createMaterialTopTabNavigator();
const imgMap={
  image:require('./assets/images/image.png')
}
function TopTab()
{
    return(
      <StyledView className='flex-1'>
        <Home />
        <tab1.Navigator
        screenOptions={{
          tabBarActiveTintColor:"black",
          tabBarInactiveTintColor:"grey",
          tabBarLabelStyle:{
            fontSize:18
          },
          tabBarIndicatorStyle:{
            backgroundColor:"black"
          }
        }}>
      <tab1.Screen name='Home'  component={Home1}/>  
       <tab1.Screen name='Deals' component={Deals}/>
       <tab1.Screen name='Cart'  component={Cart}/> 
       <tab1.Screen name='Profile' component={Profile}/>
     </tab1.Navigator>
      </StyledView>  
    )
}
function App() {
  const Icon=(name,color)=>{
    return{tabBarIcon:()=>{
      return (
        <Font name={name} size={25} color={color} />
      )
    }
    }
  }
  return(
    <NavigationContainer>
    <tab.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:"#07C158",
    tabBarInactiveTintColor:"grey",
      tabBarLabelStyle:{
        fontSize:12
      }
    }}>
     <tab.Screen  
      name='Home'  component={TopTab} options={()=>Icon("home","#07C158")}/>  
     <tab.Screen name='Deals' component={TopTab} options={()=>Icon("smile-o")}/>
     <tab.Screen name='Cart'  component={TopTab} options={()=>Icon("shopping-cart")}/> 
     <tab.Screen name='Profile' component={TopTab} options={()=>Icon("user")}/>  
    </tab.Navigator>   
  </NavigationContainer>
  )
}
const Deals=(props)=>{
  return(<View>
  <Text style={{fontSize:30}}>Login Screen</Text>
</View>)
};
const Cart=(props)=>{
return(<View>
  <Text style={{fontSize:30}}>Sign Up Screen</Text>
</View>)
};
const Home=()=>{
  return(
    <StyledView className=''>
            <StyledView className='bg-white p-2'>
                <StyledText className='text-xl text-center text-black font-bold'>E Kishaan...</StyledText>
                <StyledView className='px-4 mt-2 bg-gray-200 rounded-lg flex-row items-center'>
                <StyledTextInput
                placeholder='Search for Vegetable and groceries' 
                className='flex-1 text-lg '
                />
                <Font name="microphone" size={25} color="black" />
                </StyledView>
            </StyledView>
        </StyledView>
  )
};
const Profile=(props)=>{
  return(<View>
  <Text style={{fontSize:30}}>Login Screen</Text>
</View>)
};
export default App;
