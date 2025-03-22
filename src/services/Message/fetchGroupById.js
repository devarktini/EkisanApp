import { database } from "../../../firebase.config";
import { ref, get } from "firebase/database";

export const fetchGroupById = async (groupId) => {
  try {
    const groupRef = ref(database, `groups/${groupId}`);
    const snapshot = await get(groupRef);
    
    if (snapshot.exists()) {
      return { id: snapshot.key, ...snapshot.val() };
    }
    return null; // Return null if no group exists
  } catch (error) {
    console.error("Error fetching group:", error);
    return null; // Return null instead of throwing error
  }
};
