import React, { createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { AddToWishlist } from "../services/wishlistService";
import { addToCarts } from "../services/cartService";
// Create Context
const CartContext = createContext();
 
export const CartProvider = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add item to cart
  const addToCart = async(item, userData) => {
    if (!item) return; // Guard clause for undefined items
    
    const existingItem = cartItems.find((cartItem) => cartItem?.id === item?.id);
    if (existingItem) {
      updateCartItem(item?.id, existingItem?.quantity + 1);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }

    try {
      const cartData = await addToCarts(userData, item);
      Toast.show({
        type: "success",
        text1: "Added to cart successfully!",
        position: "top",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to add to cart",
        position: "top",
      });
    }
  };

  // Update cart item quantity
  const updateCartItem = (id, quantity) => {
    if (!id) return; // Guard clause for undefined id
    
    setCartItems((prevItems) =>
      prevItems.map((item) => 
        item?.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item?.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Add item to wishlist
  const addToWishlist = async(item, userData) => {
    if (!wishlistItems.find((wishlistItem) => wishlistItem.id === item?.id)) {
      setWishlistItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
   
     const wishListResponse = await  AddToWishlist(item, userData )
   
    }
    // Show toast message
    Toast.show({
      type: "success",
      text1: "Success!",
      position: "top",
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item?.id !== id));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Check if an item is in the wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item?.id === id);
  };

  // Calculate total cart amount
  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => 
        total + (item?.price || 0) * (item?.quantity || 0), 0)
      .toFixed(2);
  };

  console.log("wwwwwww", wishlistItems)
  // Calculate total wishlist amount
  const getWishlistTotal = () => {
    console.log("wwwwwww", wishlistItems)
    return wishlistItems
      .reduce((total, item) => total + item?.price * item?.quantity, 0)
      .toFixed(2);
  };

  // Increment quantity for wishlist items
  const incrementWishlistQuantity = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) =>
        item?.id === id ? { ...item, quantity: item?.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity for wishlist items
  const decrementWishlistQuantity = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) =>
        item?.id === id && item.quantity > 1
          ? { ...item, quantity: item?.quantity - 1 }
          : item
      )
    );
  };

  // Buy now
  const buyNow = () => {
    setWishlistItems([]); // Clear wishlist after purchase
  };

  // Increment quantity for cart items
  const incrementCartQuantity = (id) => {
    if (!id) return; // Guard clause for undefined id
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item?.id === id ? { ...item, quantity: (item?.quantity || 0) + 1 } : item
      )
    );
  };

  // Decrement quantity for cart items
  const decrementCartQuantity = (id) => {
    if (!id) return; // Guard clause for undefined id
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item?.id === id && item.quantity > 1
          ? { ...item, quantity: item?.quantity - 1 }
          : item
      )
    );
  };

  // Buy now
  const buyNowCart = () => {
    clearCart(); // Clear cart after purchase
  };
  // getCartItemCount
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item?.quantity, 0);
  };
  // getwishlistItemCount
  const getWishlistItemCount = () => {
    return wishlistItems.reduce((count, item) => count + item?.quantity, 0);
  };
  const moveToCart = (item) => {
    if (!item?.id) return; // Guard clause for undefined item
    
    const existingItem = cartItems.find((cartItem) => cartItem?.id === item?.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem?.id === item?.id
            ? { ...cartItem, quantity: (cartItem?.quantity || 0) + (item?.quantity || 1) }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: item?.quantity || 1 }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartTotal,
        wishlistItems,
        setWishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistTotal,
        incrementWishlistQuantity,
        decrementWishlistQuantity,
        buyNow,
        buyNowCart,
        incrementCartQuantity,
        decrementCartQuantity,
        getCartTotal,
        buyNowCart,
        getCartItemCount,
        getWishlistItemCount,
        moveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
