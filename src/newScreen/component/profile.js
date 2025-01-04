import React, { useEffect, useState, useRef, memo } from 'react';
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
import vegetable from '../vegetable.json'
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
//const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)
const StyledImage = styled(Image)
const StyledScrollView = styled(ScrollView);
const Font = styled(FontAwesome);
const tab = createBottomTabNavigator();
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const tab1 = createMaterialTopTabNavigator();
const imgMap = {
    image: require("../assets/images/image.png")
}
const Items = ({ arr }) => {
    return (
        <StyledScrollView>
            {
                arr.map((i) => {
                    return (
                        <StyledView className='p-2 flex-row bg-white m-2 rounded-2xl items-center'>
                            <StyledView className=''>
                                <StyledImage className='w-20 h-20 rounded-xl' source={imgMap[i.img]} />
                            </StyledView>
                            <StyledView className='flex-1 pl-2'>
                                <StyledText className='text-black  font-bold'>{i.name}</StyledText>
                                <StyledText>{i.price}</StyledText>
                            </StyledView>
                            <StyledView className='pr-4'>
                                <StyledText className='text-cyan-500 text-lg'>{i.price}</StyledText>
                            </StyledView>
                        </StyledView>
                    )
                })
            }
        </StyledScrollView>
    )
}
const Sp_text=({bold,norm})=>{
    return(
        <StyledView className='items-center p-2'>
            <StyledText className='text-base text-black font-bold'>{bold}</StyledText>
            <StyledText className=''>{norm}</StyledText>
        </StyledView>
    )
}
const Btn=({name,color,text,font})=>{
    let flex=text=='text-black'?"flex-1 items-center p-4":null;
    return(
        <StyledButton className={`rounded-lg items-center ml-1 ${color} ${flex}`}>
            <StyledText className={`p-2 py-3 space-x-1.5  ${text}`}>
            <Font name={font} size={15} color={"grey"} />
            {name}
            </StyledText>
        </StyledButton>
    )
}
export default Profile = () => {
    return (
        <StyledView className='flex-1'>
            <StyledView className='p-2'>
                <StyledView className='flex-row '>
                    <StyledImage className='w-20 h-20 rounded-full' source={require("../assets/images/image.png")} />
                    <StyledView className='ml-4'>
                    <StyledText className='text-2xl text-black font-bold'>Jane Doe</StyledText>
                    <StyledText className=''>@jane_doe</StyledText>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-row' >
                    <StyledView className='flex-row flex-1'>
                    <Sp_text bold="1.2K" norm="Followers"/>
                    <Sp_text bold="300" norm="Following"/>
                    <Sp_text bold="45" norm="Post"/>
                    </StyledView>
                    <StyledView className='flex-row  items-center justify-center'>
                        <Btn name="+ Follow" color="bg-cyan-400" text="text-white"/>
                        <Btn color="bg-slate-300" font="comments"/>
                    </StyledView>
                </StyledView>
                <StyledView className='flex-row mb-2'>
                    <Btn name="Post" color="bg-white" text="text-black" font="sticky-note"/>
                    <Btn name="Followeres" color="bg-white" text="text-black" />
                </StyledView>
                <Btn name="Edit Profile" color="bg-cyan-400" text="text-white"/>
                <StyledText className='p-2 text-2xl text-black font-black'>Wishlist</StyledText>
            </StyledView>
            <Items arr={vegetable.electonics} />
        </StyledView>
    )
}