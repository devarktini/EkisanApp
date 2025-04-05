import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { getUserWishlist } from '../services/wishlistService';
import { fetchProductDatabyId } from '../services/productService';

const WishlistScreen = () => {
  const {
    wishlistItems,
    setWishlistItems,
    removeFromWishlist,
    incrementWishlistQuantity,
    decrementWishlistQuantity,
    getWishlistTotal,
    moveToCart,
  } = useCart();
  const { userData, logout, loading } = useContext(AppContext);

  const navigation = useNavigation();

  const handleMoveToCart = (item) => {
    moveToCart(item);
    removeFromWishlist(item.id);
  };

  const handleBuyNow = () => {
    navigation.navigate('ShoppingBag', { cartItems: wishlistItems });
  };

  // const  wishListData =  getUserWishlist(userData.uid)
 
  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const wishListData = await getUserWishlist(userData.uid);
      
      if (wishListData) {
        const itemIds = Object.values(wishListData).map(item => item.itemId); // Extract itemIds
        
        // Fetch product details for each itemId
        const products = await Promise.all(itemIds.map(id => fetchProductDatabyId(id)));
        setWishlistItems(products)
     
      }
    };
  
    fetchWishlistProducts();
  }, [userData]);
  return (
    <View style={styles.container}>
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <TouchableOpacity
          className="p-2 rounded-full bg-gray-50"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        
        <Text className="flex-1 text-lg font-bold text-gray-800 text-center mx-4">
          Wishlist
        </Text>
        
        
        
      </View>
      {wishlistItems.length === 0 ? (
       <View className="flex-1 justify-center items-center">
          <Text style={styles.emptyText}>Your wishlist is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={wishlistItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={{ uri: item.imgUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.price}>₹{item.price}</Text>
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
                    >
                      <Ionicons name="add" size={20} color="#048404" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.moveToCartButton}
                    onPress={() => handleMoveToCart(item)}
                  >
                    <Text style={styles.moveToCartText}>Move to Cart</Text>
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
            <Text style={styles.totalAmount}>₹{getWishlistTotal()}</Text>
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
    
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    padding: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },
  moveToCartButton: {
    backgroundColor: '#048404',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
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
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#048404',
  },
  buyNowButton: {
    backgroundColor: '#048404',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WishlistScreen;