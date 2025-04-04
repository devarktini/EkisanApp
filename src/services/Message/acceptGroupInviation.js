import { database } from "../../../firebase.config";
import { ref, push, serverTimestamp, update } from "firebase/database";
import { fetchGroupById } from "./fetchGroupById";

export const acceptGroupInvitation = async (groupData, user) => {
  try {
    // Update existing group
   
    const groupsRef = ref(database, `groups/${groupData.groupId}`);
    const groupInfo = await fetchGroupById(groupData.groupId);
    const updates = {
      updatedAt: serverTimestamp(),
      members: {
        ...groupData.members,
        [user.uid]: {
          role: 'member',
          joinedAt: serverTimestamp(),
          uid: user.uid,
          name: user.name,
          phone: user.phone,
          district: user.district,
          state: user.state,
          photoURL: user.photoURL || null
        },
        ...groupInfo.members
      }
    };

    await update(groupsRef, updates);

    // Update user's groups array
    const userGroupsRef = ref(database, `users/${user.uid}/groups`);
    const groupName = groupData.groupName || '';
    await update(userGroupsRef, {
      [groupData.groupId]: {
        role: 'member',
        joinedAt: serverTimestamp(),
        name: groupName
      }
    });

    return {
      groupId: groupData.groupId,
      name: groupData.name,
    };
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}; 