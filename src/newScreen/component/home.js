//import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
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
//const StyledIcon = styled(Icon)
const StyledButton = styled(TouchableHighlight)
const StyledImage = styled(Image)


const Home = () => {
    const Item = ({ txt }) => {
        return (<StyledView className='' style={{
            flexDirection: "row", padding: 10,
            borderRadius: 5, backgroundColor: "white", marginVertical:10
        }}>
            <StyledView>
                <StyledImage source={require('../assets/images/image.png')}
                    style={{ width: 72, height: 72, borderRadius: 10 }} />
            </StyledView>
            <StyledView className='' style={{ justifyContent: "center", padding: 7 }}>
                <StyledText className='text-xl'>{txt}</StyledText>
                <StyledText className=''>{txt}</StyledText>
            </StyledView>
        </StyledView>)
    }
    const Menu=({heading,txt,btnTxt})=>{
        return(
<StyledView >
                <StyledText style={{
                    fontSize: 20,
                    fontWeight: "800",
                    color: "black"
                }}>{heading}</StyledText>
                <StyledView className='' style={{
                    flexDirection: "row", marginBottom: 10
                }}>
                    <StyledView>
                        <StyledText className='text-xl'>{txt}</StyledText>
                        <StyledText>{txt}</StyledText>
                    </StyledView>
                    <StyledView className='flex-1' style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                    }}>
                        <StyledView style={{flexDirection:"row"}}>
                        <StyledButton style={{backgroundColor:"rgb(203 213 225)",paddingHorizontal:10,borderRadius:8}}>
                            <StyledText style={{fontSize:20}}>+</StyledText>
                        </StyledButton>
                        <StyledText className='text-xl '>1</StyledText>
                        <StyledButton style={{backgroundColor:"rgb(203 213 225)",paddingHorizontal:10,borderRadius:8}}>
                            <StyledText style={{
                                    fontSize:20
                                }}>-</StyledText>
                        </StyledButton>
                        </StyledView>
                    </StyledView>
                </StyledView>
                <StyledButton style={{backgroundColor:"#07C158",padding:10,borderRadius:8,alignItems:"center"}}>
                            <StyledText style={{
                                    fontSize:15,
                                    color:"white"   
                                }}>{btnTxt}</StyledText>
                </StyledButton>
            </StyledView>
        )
    }
    return (
        <StyledView className='flex-1' style={{ padding: 20,paddingHorizontal:10, backgroundColor: "rgb(241 245 249)" }}>
            <Item txt="Carrot" />
            <Menu heading="Available Vegetables" txt="Carrot" btnTxt="+ Add to Cart"/>
            <StyledView style={{padding:7}}>
                <StyledText className='text-xl'>Cart</StyledText>
                <StyledText>Items in your cart</StyledText>
            </StyledView>
            <Item txt="Brocoli" />
            <Menu heading="Your Cart" txt="Brocoli" btnTxt="Checkout"/>
        </StyledView>
    )
}
export default Home;