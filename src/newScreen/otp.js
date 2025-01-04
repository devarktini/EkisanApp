/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import  Svg,{Path}  from 'react-native-svg';
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

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)
const StyledImage=styled(Image)

import {  PanGestureHandler,State } from 'react-native-gesture-handler';
//import Crossword from '@jaredreisinger/react-crossword';
function App() {
  const TxtInp=({txt,ph,btnTxt,dis})=>{
    return(<StyledView style={styles.font} className='p-4'>
      <StyledText  className='text-base 
      font-normal text-black'>{txt}</StyledText>
      <StyledView className='flex-row bg-slate-200 rounded-lg p-2 items-center'>
      <StyledView className='flex-auto'>
      <StyledTextInput 
      className='font-normal text-base  text-black'
      placeholder={ph}
      />
      </StyledView>
      <StyledView className='items-end'>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          transform="matrix(1 0 0 1 3.49805 3.49805)"
          d="M15.9434 17.0039C14.0566 17.0039 12.1621 16.5664 10.2598 15.6914C8.36133 14.8125 6.61523 13.5742 5.02148 11.9766C3.42773 10.3828 2.19141 8.63672 1.3125 6.73828C0.4375 4.83984 0 2.94727 0 1.06055C0 0.759766 0.0996094 0.507812 0.298828 0.304688C0.501953 0.101562 0.753906 0 1.05469 0L4.3125 0C4.56641 0 4.78906 0.0839844 4.98047 0.251953C5.17578 0.416016 5.29883 0.619141 5.34961 0.861328L5.92383 3.80273C5.96289 4.07617 5.95312 4.31055 5.89453 4.50586C5.83984 4.70117 5.74023 4.86523 5.5957 4.99805L3.28711 7.24805C3.6582 7.92773 4.08203 8.57227 4.55859 9.18164C5.03516 9.78711 5.55273 10.3672 6.11133 10.9219C6.6582 11.4688 7.24023 11.9785 7.85742 12.4512C8.47852 12.9199 9.14648 13.3574 9.86133 13.7637L12.1055 11.4961C12.2617 11.3359 12.4512 11.2227 12.6738 11.1562C12.8965 11.0898 13.127 11.0742 13.3652 11.1094L16.1426 11.6719C16.3965 11.7383 16.6035 11.8672 16.7637 12.0586C16.9238 12.25 17.0039 12.4668 17.0039 12.709L17.0039 15.9492C17.0039 16.25 16.9023 16.502 16.6992 16.7051C16.4961 16.9043 16.2441 17.0039 15.9434 17.0039ZM2.57227 5.83008L4.35938 4.11914C4.39062 4.0957 4.41016 4.0625 4.41797 4.01953C4.42969 3.97266 4.42969 3.92969 4.41797 3.89062L3.98438 1.6582C3.96875 1.60352 3.94531 1.56445 3.91406 1.54102C3.88281 1.51367 3.8418 1.5 3.79102 1.5L1.65234 1.5C1.61328 1.5 1.58008 1.51367 1.55273 1.54102C1.5293 1.56445 1.51758 1.5957 1.51758 1.63477C1.56836 2.31836 1.67969 3.01367 1.85156 3.7207C2.02344 4.42383 2.26367 5.12695 2.57227 5.83008ZM11.2734 14.4727C11.9375 14.7812 12.6289 15.0176 13.3477 15.1816C14.0703 15.3457 14.7441 15.4414 15.3691 15.4688C15.4082 15.4688 15.4395 15.457 15.4629 15.4336C15.4902 15.4062 15.5039 15.373 15.5039 15.334L15.5039 13.2305C15.5039 13.1797 15.4902 13.1387 15.4629 13.1074C15.4395 13.0762 15.4004 13.0547 15.3457 13.043L13.248 12.6152C13.209 12.5996 13.1738 12.5977 13.1426 12.6094C13.1152 12.6172 13.0859 12.6387 13.0547 12.6738L11.2734 14.4727Z"
          fill-rule="nonzero"
          fill="rgb(126, 138, 140)"
        />
      </Svg>
      </StyledView>
      </StyledView>
      <StyledText className={`${dis} text-sm font-light text-black mt-1`}>Resend OTP</StyledText>
      <StyledButton className='mt-2'>
      <StyledText className='border-slate-200 text-lg border-2 
      rounded-lg text-center p-3 font-normal text-black mb-2 bg-sky-400 text-white '>
      {btnTxt}</StyledText>
      </StyledButton>
      <StyledText className={`${dis} text-sm font-light text-black mt-1`}>Update phone number</StyledText>
      <StyledText className={`${dis} text-sm font-light text-black mt-1`}>Terms & Condition and
        Privacy Policy
        
      </StyledText>
      </StyledView>)
  }
  return (
    <StyledView className='flex-1 bg-zinc-50'>
      <StyledView className='p-4'>
      <StyledText style={styles.font} className='text-lg 
      text-center font-bold text-black'>Welcome Back!</StyledText>
      </StyledView>
      <StyledView className=' p-4'>
      <StyledText style={styles.font} className='text-xl 
      font-bold text-black'>Welcome Back!</StyledText>
      </StyledView>
      <TxtInp txt="Enter your phone number" ph="+1 (555) 123-4567" btnTxt="Send OTP" dis="hidden"/>
      <TxtInp txt="Enter OTP" ph="123456" btnTxt="Log In" dis="block"/>
    </StyledView>
  );
}
const styles = StyleSheet.create({
  font: {
    fontFamily:'Inter-Italic-VariableFont_opsz,wght',
  },
  
})

export default App;
