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
        
        <tab1.Navigator
        screenOptions={{
          headerShown:false,
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
    return(<Font name={name} size={25} color={color} />)
  }
  return(
    <NavigationContainer>
      <Home/>
    <tab.Navigator screenOptions={{headerShown:false,tabBarActiveTintColor:"#17C6ED",
    tabBarInactiveTintColor:"grey",
      tabBarLabelStyle:{
        fontSize:12
      }
    }}>
     <tab.Screen  
      name='Home'  component={Home1} options={{tabBarIcon:()=>Icon("home")}}/>  
     <tab.Screen name='Deals' component={Deals} options={{tabBarIcon:()=>Icon("smile-o")}}/>
     <tab.Screen name='Cart'  component={Cart} options={{tabBarIcon:()=>Icon("shopping-cart")}}/> 
     <tab.Screen name='Profile' component={TopTab} options={{tabBarIcon:()=>Icon("user","#17C6ED"),
      headerShown:false
     }}/>  
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
  return(<StyledView className=''>
    <StyledView className='bg-white p-2'>
        <StyledText className='text-xl text-center text-black font-bold mb-2'>User Profile</StyledText>
        <StyledView className='px-4 mt-2  rounded-lg flex-row items-center'>
        <StyledView className='flex-row '>
                    <StyledImage className='w-20 h-20 rounded-full' source={require("./assets/images/image.png")} />
                    <StyledView className='ml-4'>
                    <StyledText className='text-2xl text-black font-bold'>Emily Johnson</StyledText>
                    <StyledText className=''>@emilyj</StyledText>
                    </StyledView>
          </StyledView>
        </StyledView>
        <StyledText className='text-base'>Music enthusiast and avid traveler. Sharing my journey through melodies and adventures. Let's connect and explore the world together!</StyledText>
    </StyledView>
    
</StyledView>)
};
const Profile=(props)=>{
  return(
    <StyledView>

    </StyledView>
  )
};
export default App;
