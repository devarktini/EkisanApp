import { database } from "../../../firebase.config";
import { ref, push, serverTimestamp, update } from "firebase/database";

export const createGroup = async (groupName, groupDescription, user) => {
  try {
    const creatorInfo = user;
    
    // Create group data structure
    const newGroup = {
      name: groupName,
      description: groupDescription,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: {
        uid: user.uid,
        name: creatorInfo.fullName,
        phone: creatorInfo.phoneNumber,
        // pincode: creatorInfo?.pincode,
        district: creatorInfo.district,
        state: creatorInfo.state,
        photoURL: creatorInfo.photoURL || null
      },
      members: {
        [user.uid]: {
          role: 'admin',
          joinedAt: serverTimestamp(),
          ...creatorInfo
        }
      },
      messages: []
    };

    // Create reference for new group
    const groupsRef = ref(database, 'groups');
    const newGroupRef = await push(groupsRef, newGroup);
    const groupId = newGroupRef.key;

    // Update user's groups array
    const userGroupsRef = ref(database, `users/${user.uid}/groups`);
    const updates = {};
    updates[groupId] = {
      role: 'admin',
      joinedAt: serverTimestamp(),
      name: groupName
    };

    // Update both user's groups and create new group
    const multiUpdate = {};
    multiUpdate[`groups/${groupId}`] = newGroup;
    multiUpdate[`users/${user.uid}/groups/${groupId}`] = {
      role: 'admin',
      joinedAt: serverTimestamp(),
      name: groupName
    };

    await update(ref(database), multiUpdate);

    // Return the created group with its ID
    return {
      id: groupId,
      ...newGroup
    };
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
}; 