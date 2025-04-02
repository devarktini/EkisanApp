import { database } from "../../../firebase.config";
import { ref, get } from "firebase/database";

export const fetchUserGroups = async (userId) => {
  try {
    const groupsRef = ref(database, 'groups');
    const snapshot = await get(groupsRef);
    
    if (snapshot.exists()) {
      const groups = [];
      snapshot.forEach((childSnapshot) => {
        const group = childSnapshot.val();
        console.log("object", group)
        // Check if user is a member of this group
        if (group.members && group.members[userId]) {
          groups.push({
            id: childSnapshot.key,
            ...group
          });
        }
      });
      return groups;
    }
    return []; // Return empty array if no groups exist
  } catch (error) {
    console.error("Error fetching groups:", error);
    return []; // Return empty array instead of throwing error
  }
}; 