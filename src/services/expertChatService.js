// src/services/expertChatService.js
import { database, storage } from "../../firebase.config";
// import { imgExtRemover } from "@/util/name/imgExtRemover";
import { push, ref, query, orderByChild, equalTo, get } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";

// Fetch user expert messages
export const getUserExpertMessages = async (userId) => {
  if (!userId) return [];
  try {
    const expertMessagesRef = ref(database, "/expert_chats");
    const userMessagesQuery = query(
      expertMessagesRef,
      orderByChild("sellerUID"),
      equalTo(userId)
    );
    const snapshot = await get(userMessagesQuery);
    return snapshot.exists() ? Object.entries(snapshot.val()).map(([id, msg]) => ({ id, ...msg })) : [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};
const imgExtRemover = (uri) => {
  return uri?.split('.').pop(); // Extract file extension from URI
};

// Submit a new user query
export const submitUserQuery = async (user, userQuery, image) => {

  
  
  
    if (!userQuery) return { success: false, message: "Query cannot be empty" };
  
    const expertMessagesRef = ref(database, "/expert_chats");
    let imgUrl = null;
  
    try {
      if (image) {
        const fileExtension = imgExtRemover(image.uri); // Use the URI to extract the file extension
        const expertChatRef = storageRef(
          storage,
          `/expert_chats/${Date.now()}.${fileExtension}`
        );
  
        // Fetch the image as a blob
        const response = await fetch(image.uri);
        const blob = await response.blob();
  
        // Upload the blob to Firebase Storage
        await uploadBytes(expertChatRef, blob);
  
        // Get the download URL for the uploaded image
        imgUrl = await getDownloadURL(expertChatRef);
      }
  
      // Push the query to the database
      await push(expertMessagesRef, {
        message: userQuery,
        timeStamp: Date.now(),
        imgUrl,
        sellerUID: user?.uid,
        userName: user.name || user.fullName,
        userPhone: user.phone || user.phoneNumber,
        read: false,
      });
  
      return { success: true, message: "Query submitted successfully!" };
    } catch (error) {
      console.error("Error submitting query:", error);
      return { success: false, message: "Failed to submit query." };
    }
  };
