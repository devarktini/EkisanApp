import { database } from '@/firebase';
import { ref, push, get, query, orderByChild, onValue, equalTo , remove} from 'firebase/database';
import Swal from 'sweetalert2';

// export const AddTowishList = async (itemData, user) => {
//     if(!user){
//         showToast({ icon: "error", title: "You are not Registerd" });
//     }
//     return new Promise(async (resolve, reject) => {
//         const TIMESTAMP = Date.now();
//         if(!user){
//             showToast({ icon: "error", title: "You are not Registerd" });
//         }
//         try {
//             const wishlistRef = ref(database, "wishlist");

//             await push(wishlistRef, {
//                 itemId:itemData?.id || 'null',
//                 userId:user?.userId || user?.uid,
//                 TIMESTAMP:TIMESTAMP
//             });

//             resolve(true);
//             showToast({ icon: "success", title: "Product added to wishlist" });
//         } catch (error) {
//             console.error("Error sending item to verification:", error);
//             reject(error); // Rejecting the promise with the error
//         }
//     });
// };


export const AddTowishList = async (itemData, user) => {
    if (!user) {
        showToast({ icon: "error", title: "You are not Registered" });
        return;
    }

    return new Promise(async (resolve, reject) => {
        const TIMESTAMP = Date.now();
        const wishlistRef = ref(database, "new-wishlist");

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
                    showToast({ icon: "info", title: "Item already in wishlist" });
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
            showToast({ icon: "success", title: "Product added to wishlist" });

        } catch (error) {
            console.error("Error adding item to wishlist:", error);
            reject(error); // Rejecting the promise with the error
        }
    });
};

export const getUserWishlist = async (userId) => {
    if (!userId) {

    }
    try {
        const wishlistRef = ref(database, "new-wishlist");
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


export const deleteWishlistItem = (userId, productId) => {
    if (!userId) {
        showToast({ icon: "error", title: "User is not authenticated!" });
        return;
    }

    // Reference to the wishlists collection
    const wishlistsRef = ref(database, 'new-wishlist/');

    // Fetch all wishlists
    onValue(
        wishlistsRef,
        (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                
                showToast({ icon: "error", title: "Wishlist not found!" });
                return;
            }

            // Iterate through wishlists and find the matching entry
            for (const wishlistId in data) {
                const wishlist = data[wishlistId];

                // Check if userId and productId match
                if (wishlist.userId === userId && wishlist.itemId === productId) {
                    // Remove the matching wishlist item
                    const itemRef = ref(database, `new-wishlist/${wishlistId}`);
                    remove(itemRef)
                        .then(() => {
                           
                            showToast({ icon: "success", title: "Item removed from wishlist!" });
                        })
                        .catch((error) => {
                            console.error("Error removing wishlist item:", error);
                            showToast({ icon: "error", title: "Failed to remove item!" });
                        });
                    return; // Stop further iterations
                }
            }

           
            showToast({ icon: "info", title: "No matching item found in wishlist!" });
        },
        (error) => {
            console.error("Error fetching wishlist data:", error);
            showToast({ icon: "error", title: 'permission denied ' });
        }
    );
};

const showToast = ({ icon = "", title = "" }) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    Toast.fire({
        icon: icon,
        title: title,
    });
};
