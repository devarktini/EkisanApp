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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const stack = createNativeStackNavigator();
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
import Profile from './component/profile';
const tab1 = createMaterialTopTabNavigator();
const imgMap={
  image:require('./assets/images/image.png')
}

function App() {
  const Icon=(name,color)=>{
    return(<Font name={name} size={25} color={color} />)
  }
  return(
    <NavigationContainer>
      <tab.Navigator screenOptions={{
        headerLeft:()=><StyledView className='p-2'><Font name="chevron-left" size={25} color="#3B5056" /></StyledView>,
        headerRight:()=><StyledView className='p-2 pr-4'><Font name="shopping-cart" size={25} color="#3B5056" /></StyledView>,
        tabBarLabelStyle:{
          fontSize:12
        }
    }}>
      <tab.Screen name='Home'  component={Home} options={()=>Icon("home")}/>  
       <tab.Screen name='Search' component={Search} options={()=>Icon("smile-o")}/>
       <tab.Screen name='Notification' component={Notification} options={()=>Icon("bell")}/> 
       <tab.Screen name='Profile' component={Profile} options={{tabBarIcon:()=>Icon("user","#17C6ED"),
        headerTitle:"User Profile",
        headerTitleAlign:"center"  
       }}/>
      </tab.Navigator>
    </NavigationContainer>
  )
}

const Search=(props)=>{
return(<View>
  <Text style={{fontSize:30}}>Sign Up Screen</Text>
</View>)
};
const Home=(props)=>{
  return(<View>
    <Text style={{fontSize:30}}>Sign Up Screen</Text>
  </View>)
  };
  const Notification=(props)=>{
    return(<View>
      <Text style={{fontSize:30}}>Sign Up Screen</Text>
    </View>)
    };
    
export default App;
