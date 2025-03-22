import { auth, database } from '../../../firebase.config';
import { ref, set, get, update, remove, serverTimestamp } from "firebase/database";

// Add or update an address
export const addOrUpdateAddress = async (data, user) => {
  try {
    const userRef = ref(database, `users/${user.uid}/address`);
    await set(userRef, {
      ...data,
      lastUpdate: serverTimestamp(),
    });

    return {
      status: 200,
      success: true,
      message: "Address added/updated successfully! Changes will be reflected soon",
      data: data,
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      status: 400,
      success: false,
      message: "Unable to add/update the address!",
      error: error.message,
    };
  }
};

// Get the address for a user
export const getAddress = async (user) => {
  const id =  user?.uid;
  try {
    const addressRef = ref(database, `users/${id}/address`);
    const snapshot = await get(addressRef);
    
    if (snapshot.exists()) {
      const address = snapshot.val();
      return {
        status: 200,
        success: true,
        message: "Address fetched successfully",
        data: address
      };
    }
    
    return {
      status: 200,
      success: true,
      message: "No address found",
      data: null
    };
  } catch (error) {
    return {
      status: 400,
      success: false,
      message: "Failed to fetch address",
      error: error.message,
      data: null
    };
  }
};

// Delete the address
export const deleteAddress = async (user) => {
  const id = user?.uid;
  try {
    const addressRef = ref(database, `users/${id}/address`);
    await remove(addressRef);

    return {
      status: 200,
      success: true,
      message: "Address deleted successfully",
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Failed to delete address",
      error: error.message
    };
  }
};