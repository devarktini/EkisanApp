import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { styled } from 'nativewind';

const veges = [
    {
        name: "Tomatoes",
        rating: "4.5",
        discount: "02:48:26 20%",
        price: "$2.99/lb",
        img: "image" // Add your image URL or source here
    },
    {
        name: "Carrots",
        rating: "4.5",
        discount: "02:48:26 20%",
        price: "$2.99/lb",
        img: "image"
    },
    {
        name: "Broccoli",
        rating: "4.5",
        discount: "02:48:26 20%",
        price: "$2.99/lb",
        img: "image"
    },
    {
        name: "Potatoes",
        rating: "4.5",
        discount: "02:48:26 20%",
        price: "$2.99/lb",
        img: "image"
    }
];

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const VegetableCard = ({ item }) => (
    <StyledView className="bg-white rounded-lg p-4 mr-4 w-40 items-center shadow-md">
        {/* Add your image source to the Image component */}
        <StyledImage className="w-24 h-24 rounded-full mb-4" source={{ uri: item.img }} />
        <StyledText className="text-lg font-bold mb-2">{item.name}</StyledText>
        <StyledText className="text-gray-500 mb-1">{item.price}</StyledText>
        <StyledText className="text-red-500 text-sm mb-2">{item.discount}</StyledText>
        <StyledText className="text-gray-600 text-sm">Rating: {item.rating}</StyledText>
    </StyledView>
);

const VegetableList = () => {
    return (
        <FlatList
            data={veges}
            renderItem={({ item }) => <VegetableCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 20 }}
        />
    );
};

export default VegetableList;