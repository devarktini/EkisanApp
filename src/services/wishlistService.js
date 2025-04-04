import { ref, push, get, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../firebase.config";
import Toast from 'react-native-toast-message';

export const AddToWishlist = async (itemData, user) => {
    if (!user) {
        // showToast({ icon: "error", title: "You are not Registered" });
        Toast.show({
            type: "error",
            text1: 'You are not Registered',
            text2: "Please try again letter",
            position: "top",
        });
        return;
    }

    return new Promise(async (resolve, reject) => {
        const TIMESTAMP = Date.now();
        const wishlistRef = ref(database, "wishlist");

        try {
            // Check if the item is already in the user's wishlist
            const userWishlistQuery = query(
                wishlistRef,
                orderByChild("userId"),
                equalTo(user.userId || user.uid)
            );

            const snapshot = await get(userWishlistQuery);

            if (snapshot.exists()) {
                const wishlistItems = Object.values(snapshot.val());
                const itemAlreadyAdded = wishlistItems.some(
                    item => item.itemId === itemData?.id
                );

                if (itemAlreadyAdded) {
                    Toast.show({
                        type: "info",
                        text1: 'Item already in wishlist',
                        text2: "try to add another products",
                        position: "top",
                    });
                    
                    resolve(false); // Resolve without adding
                    return;
                }
            }

            // If item is not in the wishlist, add it
            await push(wishlistRef, {
                itemId: itemData?.id || 'null',
                userId: user.userId || user.uid,
                TIMESTAMP: TIMESTAMP
            });

            resolve(true);
            // showToast({ icon: "success", title: "Product added to wishlist" });
            Toast.show({
                type: "success",
                text1: 'Product added to wishlist',
                text2: "Congratulations!!",
                position: "top",
            });

        } catch (error) {
            console.error("Error adding item to wishlist:", error);
            reject(error); // Rejecting the promise with the error
        }
    });
};

export const getUserWishlist = async (userId) => {
    if (!userId) {
        Toast.show({
            type: "error",
            text1: 'User ID is required',
            text2: "Please try again letter",
            position: "top",
        });
        // showToast({ icon: "error", title: "User ID is required" });
        return [];
    }

    try {
        const wishlistRef = ref(database, "wishlist");
        const userWishlistQuery = query(wishlistRef, orderByChild("userId"), equalTo(userId));
        
        const snapshot = await get(userWishlistQuery);
        
        if (snapshot.exists()) {
            const wishlistItems = snapshot.val();
            return wishlistItems; // Returns an object with the user's wishlist items
        } else {
            
            return []; // Return an empty array if no items found
        }
    } catch (error) {
        console.error("Error retrieving wishlist:", error);
        throw error;
    }
};
