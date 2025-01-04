import React from 'react';
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
import data from '../data.json'
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTextInput = styled(TextInput)
//const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)
const StyledImage = styled(Image)
const Font = styled(FontAwesome);
const StyledScrollView = styled(ScrollView);

const Send = () => {
    return (
        <StyledView >
            <StyledView className='flex-row items-center'>
            <StyledView className='bg-white rounded-3xl flex-row items-center px-3 flex-1'>
                <Font name="smile-o" size={25} color="black" />
                <StyledView className='flex-1'>
                <StyledTextInput
                    placeholder='Message'
                    className='text-xl ml-2' />
                </StyledView>
                <StyledView className='flex-row space-x-6 '>
                    <Font name="paperclip" size={25} color="black" />
                    <Font name="home" size={25} color="black" />
                    <Font name="camera" size={25} color="black" />
                </StyledView>
            </StyledView>
            <StyledView className='ml-3 p-4 rounded-full bg-green-600'>
                <Font name="microphone" size={25} color="white" />
                </StyledView>
            </StyledView>
        </StyledView>
    )
}
export default Send;