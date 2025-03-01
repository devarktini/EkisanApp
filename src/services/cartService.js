import { database, auth } from "../../firebase.config";
import { push, ref } from "firebase/database";
import Toast from "react-native-toast-message";

export const addToCarts = async (userData, item) => {
    try {
        const user = auth.currentUser;
        if (!user) {
            Toast.show({
                type: 'error',
                text1: 'Please login first'
            });
            return false;
        }

        const cartRef = ref(database, 'carts');
        const cartItem = {
            userId: userData.uid,
            itemId: item.itemId,
            quantity: 1,
            timestamp: Date.now()
        };

        await push(cartRef, cartItem);
        Toast.show({
            type: 'success',
            text1: 'Item added to cart'
        });
        return true;
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Failed to add item',
            text2: error.message
        });
        return false;
    }
};