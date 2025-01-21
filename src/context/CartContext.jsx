import React, { createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";
// Create Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Wishlist state
  const [wishlistItems, setWishlistItems] = useState([]);

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      updateCartItem(item.id, existingItem.quantity + 1);
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
    // Show toast message
    Toast.show({
      type: "success",
      text1: "Success!",
      props: { productName: item.name },
    });
  };

  // Update cart item quantity
  const updateCartItem = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Add item to wishlist
  const addToWishlist = (item) => {
    if (!wishlistItems.find((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlistItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
    // Show toast message
    Toast.show({
      type: "wishlist",
      text1: "Success!",
      props: { productName: item.name },
    });
  };

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Check if an item is in the wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // Calculate total cart amount
  const getCartTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate total wishlist amount
  const getWishlistTotal = () => {
    return wishlistItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Increment quantity for wishlist items
  const incrementWishlistQuantity = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity for wishlist items
  const decrementWishlistQuantity = (id) => {
    setWishlistItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Buy now
  const buyNow = () => {
    console.log("Proceeding to checkout with items:", wishlistItems);
    setWishlistItems([]); // Clear wishlist after purchase
  };

  // Increment quantity for cart items
  const incrementCartQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrement quantity for cart items
  const decrementCartQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Buy now
  const buyNowCart = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    clearCart(); // Clear cart after purchase
  };
  // getCartItemCount
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  // getwishlistItemCount
  const getWishlistItemCount = () => {
    return wishlistItems.reduce((count, item) => count + item.quantity, 0);
  };
  const moveToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If the item already exists in the cart, increment its quantity
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      // If the item doesn't exist in the cart, add it
      setCartItems((prevItems) => [...prevItems, item]);
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
