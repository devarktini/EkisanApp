/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
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

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)

const Box = ({ className, ...props }) => (
  <StyledText className={`flex text-center h-14 justify-center items-center text-white bg-fuchsia-500 rounded ${className}`} {...props}/>
)
//import {  PanGestureHandler,State } from 'react-native-gesture-handler';
//import Crossword from '@jaredreisinger/react-crossword';
function App() {
  return (
    <StyledView className="flex-1">
     <StyledView className='p-5 items-center'>
     <StyledText className='text-xl font-black text-black'>Login</StyledText>
     </StyledView>
     <StyledView className='p-5'>
     <StyledText className='text-2xl font-medium text-black'>Welcome Back!</StyledText>
     </StyledView>
     <StyledView className='p-5 py-0'>
     <StyledText className='text-xl font-normal text-black'>Mobile Number</StyledText>
     <StyledTextInput
         className='text-lg font-normal text-black  rounded-lg
         bg-slate-200 p-3'
        placeholder='Enter your mobile number'
     />
     <StyledView className='p-5 items-center'>
     <StyledText className='text-lg  text-black'>Forgot Password?</StyledText>
     </StyledView>
     <StyledButton className=' bg-cyan-300 rounded-lg mb-2'>
      <StyledText className='text-center text-white text-lg p-2'>Login</StyledText>
     </StyledButton>
     <StyledButton className=' bg-slate-200 rounded-lg'>
      <StyledText className='text-center text-black text-lg p-2'>Sign up</StyledText>
     </StyledButton>
     </StyledView>
     <StyledView className=' flex-row p-5 items-center justify-between'>
     <StyledView className='border-t-2 w-5/12	border-slate-200'></StyledView>
     <StyledText className=' px-1'>OR</StyledText>
     <StyledView className='border-t-2 w-5/12 border-slate-200'></StyledView>
     </StyledView>
     <StyledView  className='px-5'>
      <StyledButton>
      <StyledText className='border-slate-200 text-lg border-2 
      rounded-lg text-center p-1 font-light text-black mb-2 '>
       <StyledIcon name="envelope" size={20} color="red" /> Login with Email</StyledText>
      </StyledButton>
      <StyledButton>
      <StyledText className='border-slate-200 text-lg border-2 
      rounded-lg text-center p-1 font-light text-black mb-2'>
        <StyledIcon name="apple" size={20} color="red" />Login with Apple</StyledText>
      </StyledButton>
      <StyledButton>
      <StyledText className='border-slate-200 text-lg border-2 
      rounded-lg text-center p-1 font-light text-black mb-2'>
        <StyledIcon name="google" size={20} color="red" />Login with Google</StyledText>
      </StyledButton>
      <StyledButton>
      <StyledText className='border-slate-200 text-lg border-2 
      rounded-lg text-center p-1 font-light text-black mb-2'>
        <StyledIcon name="mobile" size={20} color="red" />Login with Phone</StyledText>
      </StyledButton>
     </StyledView>
    </StyledView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
     alignItems:"center"
  },
  
})

export default App;
