import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

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

const VegetableCard = ({ item }) => (
    <View style={styles.card}>
        {/* Add your image source to the Image component */}
        <Image style={styles.image} source={{ uri: item.img }} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.discount}>{item.discount}</Text>
        <Text style={styles.rating}>Rating: {item.rating}</Text>
    </View>
);

const VegetableList = () => {
    return (
        <FlatList
            data={veges}
            renderItem={({ item }) => <VegetableCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        paddingVertical: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
        width: 150,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    discount: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
    },
    rating: {
        fontSize: 12,
        color: '#666',
    }
});

export default VegetableList;
