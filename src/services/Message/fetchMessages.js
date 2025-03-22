import { database } from "../../../firebase.config";
import { ref, get, query, orderByChild } from "firebase/database";

export const fetchMessages = async (groupId) => {
  try {
    const messagesRef = ref(database, `groups/${groupId}/messages`);
    const messagesQuery = query(messagesRef, orderByChild('createdAt'));
//    const messagesQuery = query(messagesRef, orderByChild('createdAt'), limitToLast(limit));
    const snapshot = await get(messagesQuery);

    if (snapshot.exists()) {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return messages;
    }
    return [];
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}; 
