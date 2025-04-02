import { database } from "../../../firebase.config";
import { ref, get, push, serverTimestamp, update } from "firebase/database";

export const sendMessage = async (groupId, message, sender) => {
  try {
    const messageData = {
      text: message,
      sender: {
        uid: sender.uid || sender.userId,
        name: sender.name,
        photoURL: sender.photoURL || null
      },
      createdAt: serverTimestamp(),
      status: 'sent'
    };
    // Create reference for new message
    const messagesRef = ref(database, `groups/${groupId}/messages`);
    const newMessageRef = await push(messagesRef, messageData);
    const messageId = newMessageRef.key;
    // Update group's lastMessage
    const updates = {};
    updates[`groups/${groupId}/lastMessage`] = {
      text: message,
      senderId: sender.uid || sender.userId,
      senderName: sender.name,
      createdAt: serverTimestamp()
    };
    updates[`groups/${groupId}/updatedAt`] = serverTimestamp();

    await update(ref(database), updates);

    return {
      id: messageId,
      ...messageData
    };
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}; 



export const sendAdminMessage = async (userId, message, sender) => {
  try {
    const messageData = {
      text: message,
      senderName: sender,
      createdAt: serverTimestamp(),
    };

    const adminMessagesRef = ref(database, `users/${userId}/adminMessages`);
    const newMessageRef = await push(adminMessagesRef, messageData);

    return {
      id: newMessageRef.key,
      ...messageData,
    };
  } catch (error) {
    console.error("Error sending admin message:", error);
    throw error;
  }
};


export const getAdminMessages = async (userId) => {
  try {
    // Reference to the direct_messages field for the user
    const adminMessagesRef = ref(database, `users/${userId}/adminMessages`);
    
    // Fetch data from the database
    const snapshot = await get(adminMessagesRef);
    
    if (snapshot.exists()) {
      // Convert the data into an array of messages
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      return messages;
    } else {
      // If no messages exist, return an empty array
      return [];
    }
  } catch (error) {
    console.error("Error retrieving admin messages:", error);
    throw error;
  }
};