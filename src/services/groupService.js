import { database } from '../../firebase.config';
import { onValue, ref, query, limitToFirst, remove, set, get } from 'firebase/database';


export const addUserToGroupInFirebase = async (userId, groupId, groupData) => {
  try {
    const userGroupsRef = ref(database, `users/${userId}/groups-test`);
    const userGroupsSnapshot = await get(userGroupsRef);
    const userGroupsData = userGroupsSnapshot.exists() ? userGroupsSnapshot.val() : {};
    await set(userGroupsRef, {
      ...userGroupsData,
      [groupId]: groupData
    });
  } catch (error) {
    console.error("Error adding user to group:", error);
    throw error;
  }
};
