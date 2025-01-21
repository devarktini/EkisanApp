import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const WishlistScreen = () => {
  const {
    wishlistItems,
    removeFromWishlist,
    incrementWishlistQuantity,
    decrementWishlistQuantity,
    getWishlistTotal,
    moveToCart, // Add this function to your CartContext
  } = useCart();

  const navigation = useNavigation(); // Initialize navigation

  const handleMoveToCart = (item) => {
    moveToCart(item); // Move the item to the cart
    removeFromWishlist(item.id); // Remove the item from the wishlist
  };

  const handleBuyNow = () => {
    navigation.navigate('ShoppingBag', { cartItems: wishlistItems }); // Navigate to ShoppingBag with wishlist items
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wishlist</Text>
      {wishlistItems.length === 0 ? (
        <Text style={styles.emptyText}>Your wishlist is empty.</Text>
      ) : (
        <>
          <FlatList
            data={wishlistItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => decrementWishlistQuantity(item.id)}
                      style={styles.quantityButton}
                    >
                      <Ionicons name="remove" size={20} color="#048404" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => incrementWishlistQuantity(item.id)}
                      style={styles.quantityButton}
                      // className= "rounded-full"
                    >
                      <Ionicons name="add" size={20} color="#048404" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.moveToCartButton}
                    onPress={() => handleMoveToCart(item)}
                  >
                    <Text className="rounded-full" style={styles.moveToCartText}>Move to Cart</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromWishlist(item.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalAmount}>${getWishlistTotal()}</Text>
          </View>
          <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 5,
    fontWeight: '100',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    padding: 4,
  
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  deleteButton: {
    padding: 8,
  },
  moveToCartButton: {
    backgroundColor: '#048404',
    padding: 8,
    borderRadius: 100,
    marginTop: 8,
    alignItems: 'center',
  },
  moveToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#048404',
  },
  buyNowButton: {
    backgroundColor: '#048404',
    padding: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 16,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;