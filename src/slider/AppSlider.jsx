import React, { useState, useCallback, useMemo } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images.freeimages.com/images/large-previews/536/fruits-vegitables-2-1237881.jpg",
    "https://images.freeimages.com/images/large-previews/9c4/fruits-vegitables-1321500.jpg",
    "https://images.freeimages.com/images/large-previews/b38/fruits-vegitables-1321539.jpg",
    "https://images.freeimages.com/images/large-previews/6d9/fruits-vegitables-1-1237885.jpg",
    "https://images.freeimages.com/images/large-previews/0c2/vegitables-15-1321491.jpg",
  ];

  const handleSnapToItem = useMemo((index) => {
    setCurrentIndex(index);
  }, []);

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={width / 2.5} // Adjust height for your needs
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        mode="normal"
        loop={true}
        autoPlay={true}
        autoPlayInterval={3000}
        onSnapToItem={handleSnapToItem}
        style={styles.carousel}
      />
      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  paddingHorizontal: 10,
  marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    
  },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc", // Inactive color
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007BFF", // Active color
  },
  carousel: {
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;