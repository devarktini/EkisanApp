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
// import data from './data.json'
// import Inbox from './component/inbox';
import vegetable from '../vegetable.json'
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
const tab1 = createMaterialTopTabNavigator();
const imgMap={
  image:require("../assets/images/image.png")
}
const VegList=({arr,det})=>{
  return(
    <StyledView className='flex-row py-2'>
        <StyledScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        >
          {arr.map((i) => {
            return(<StyledView key={i.name} className='bg-white mr-3 rounded-2xl'>
              <StyledImage className='w-40 h-40 rounded-t-2xl' source={imgMap[i.img]} />
              <StyledView className='p-2'>
              <StyledText className='text-lg text-black font-medium'>{i.name}</StyledText>
              <StyledText>{i.rating}<Font  name="star" size={15} color="grey" /></StyledText>
              {det?<StyledView>
                <StyledView className='text-emerald-500 flex-row'>
              <StyledView className='px-2 bg-emerald-500 rounded-l-lg mr-2'>
                <StyledText className='text-white'>Sale</StyledText>
              </StyledView>
              <StyledText className='text-emerald-500'>{i.discount}</StyledText>
                </StyledView>
              <StyledText className='text-emerald-500'>{i.price}</StyledText>
              </StyledView>:null}
              </StyledView>
            </StyledView>)
        })}
        </StyledScrollView>
      </StyledView>
  )
}
const VegDet=({arr,det})=>{
    return(
      <StyledView className='py-2'>
        <StyledView  className='bg-white mr-3 rounded-2xl'>
                <StyledImage className='w-full h-72 object-fill rounded-t-2xl' source={imgMap[arr.img]} />
                <StyledView className='p-2'>
                <StyledText className='text-lg text-black font-medium'>{arr.name}</StyledText>
                <StyledText>{arr.rating}<Font  name="star" size={15} color="grey" /></StyledText>
                {det?<StyledView>
                  <StyledView className='text-emerald-500 flex-row'>
                <StyledView className='px-2 bg-emerald-500 rounded-l-lg mr-2'>
                  <StyledText className='text-white'>Sale</StyledText>
                </StyledView>
                <StyledText className='text-emerald-500'>{arr.discount}</StyledText>
                  </StyledView>
                <StyledText className='text-emerald-500'>{arr.price}</StyledText>
                </StyledView>:null}
                </StyledView>
              </StyledView>
        </StyledView>
    )
  }
  const Desp=({arr})=>{
    return(
        <StyledView className='p-2'>
            <StyledText className='font-bold text-black text-2xl mb-2'>{arr.name}</StyledText>
            <StyledText className='font-normal text-black text-lg'>{arr.msg}</StyledText>
        </StyledView>
    )
  }
export default Home2=()=>{
    return(
        <StyledView className='flex-1'>
          <StyledScrollView className=''>
          <VegDet arr={vegetable.veges[2]} det="price"/>
          <Desp arr={vegetable.veges[2]}/>  
          <StyledText className='text-2xl text-black font-bold mt-4 mb-2'>Best Deals</StyledText>
          <VegList arr={vegetable.veges} />
          <Desp arr={vegetable.Extra}/>  
          </StyledScrollView>
          <StyledButton className='m-2 bg-cyan-400 p-2 py-4 rounded-lg'>
            <StyledText className='text-center text-white text-xl'>
            <Font  name="shopping-cart" size={25} color="white" />    
            Add to Cart</StyledText>
          </StyledButton>
        </StyledView>
    )
  };
  const Deals=(props)=>{
    return(<View>
    <Text style={{fontSize:30}}>Login Screen</Text>
  </View>)
  };
