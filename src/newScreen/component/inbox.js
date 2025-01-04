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
import Send from './send';
const imgMap = {
    image: require('../assets/images/image.png')
}

const Inbox = (props) => {
    const ChatHist=({end,color,check,msg})=>{
        return(
             <StyledView className={end}>
                        <StyledView  className={color}>
                            <StyledText className='text-lg text-black'>
                                {msg}
                            </StyledText>
                            <StyledView className=' ml-2 items-center justify-end'>
                                <StyledText className=''>{data.chat[props.item.index].time}
                                    <Font name={check} size={20} color="blue" />
                                </StyledText>
                            </StyledView>
                        </StyledView>
                    </StyledView> 
        )
    }
    return (<StyledView className='flex-1  p-2' style={{ backgroundColor: "#EFEAE2" }} >
        <StyledView className='bg-white flex-row items-center  p-2'>
            <StyledView className='mr-4 flex-row items-center'>
                <StyledButton onPress={() => props.item.setshowInbox(false)}>
                    <Font name="arrow-left" size={20} color="black" />
                </StyledButton>
                <StyledImage className='w-10 h-10 ml-1 rounded-full' source={imgMap[data.chat[props.item.index].img]} />
            </StyledView>
            <StyledView className='flex-1'>
                <StyledText className='font-base text-black text-xl'>{data.chat[props.item.index].contacts}</StyledText>
            </StyledView>
            <StyledView className='flex-row space-x-6 items-center'>
                <Font name="video-camera" size={25} color="black" />
                <Font name="phone" size={25} color="black" />
                <Font name="ellipsis-v" size={25} color="black" />
            </StyledView>
        </StyledView>
        <StyledView className='flex-1  p-2' >
            <StyledScrollView>
            <ChatHist end="items-end" color="bg-green-200  p-2 rounded-xl flex-row" 
            check="check" msg={data.chat[props.item.index].msg}/>
            <ChatHist end="items-start" color="bg-white  p-2 rounded-xl flex-row"
            check="" msg={data.chat[props.item.index].reply}/>
            </StyledScrollView>
        </StyledView>
        <Send />
    </StyledView>)
}
export default Inbox;