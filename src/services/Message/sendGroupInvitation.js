import { database } from "../../../firebase.config";
import { ref, push, serverTimestamp, get, update } from "firebase/database";
import { Alert } from "react-native";

export const sendGroupInvitation = async (groupId, invitedUserId, invitedBy) => {
console.log("group id", groupId)
console.log("invited user id", invitedUserId)
console.log("invitedby", invitedBy.fullName)
  try {
    // Get invited user's data
    const userRef = ref(database, `users/${invitedUserId}`);
    const userSnapshot = await get(userRef);
    const invitedUserData = userSnapshot.val();

    if (!invitedUserData) {
      throw new Error('User not found');
    }

    // Get group details
    const groupRef = ref(database, `groups/${groupId}`);
    const groupSnapshot = await get(groupRef);
    const groupData = groupSnapshot.val();
    // console.log("first", groupData)
    if (!groupData) {
      throw new Error('Group not found');
    }

    // Check if user is already a member
    if (groupData.members && groupData.members[invitedUserId]) {
      throw new Error('User is already a member of this group');
    }

    // Check if there's already a pending invitation
    const invitationsRef = ref(database, 'invitations');
    const invitationsSnapshot = await get(invitationsRef);
    let existingInvitation = false;

    if (invitationsSnapshot.exists()) {
      invitationsSnapshot.forEach((inviteSnapshot) => {
        const invite = inviteSnapshot.val();
        if (invite.groupId === groupId && 
            invite.invitedUserId === invitedUserId && 
            invite.status === 'pending') {
          existingInvitation = true;
        }
      });
    }

    if (existingInvitation) {
      throw new Error('An invitation is already pending for this user');
    }

    // Create invitation data
    const invitationData = {
      groupId,
      groupName: groupData.name,
      invitedUserId,
      invitedUserName: invitedUserData.name,
      invitedBy: {
        uid: invitedBy.uid || invitedBy.userId,
        name: invitedBy.name || invitedBy.fullName,
        photoURL: invitedBy.photoURL || null
      },
      status: 'pending',
      createdAt: serverTimestamp(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days expiry
    };

    // Create multi-path update
    const updates = {};
    
    // Add to invitations collection
    const newInvitationRef = push(ref(database, 'invitations'));
    const invitationId = newInvitationRef.key;
    
    updates[`invitations/${invitationId}`] = invitationData;
    //  console.log("groupdata", groupData)
    // Add to user's notifications
    updates[`users/${invitedUserId}/notifications/${invitationId}`] = {
      type: 'group_invitation',
      groupId,
      groupName: groupData.name,
      invitedBy: invitedBy.name  || invitedBy.fullName,
      status: 'unread',
      createdAt: serverTimestamp()
    };

    // Add to group's pending invitations
    updates[`groups/${groupId}/pendingInvitations/${invitationId}`] = {
      invitedUserId,
      invitedUserName: invitedUserData.name,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    // Add to inviter's sent invitations
    updates[`users/${invitedBy.uid || invitedBy.userId}/sentInvitations/${invitationId}`] = {
      groupId,
      groupName: groupData.name,
      invitedUserId,
      invitedUserName: invitedUserData.name,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    // Perform the update
    await update(ref(database), updates);
    Alert.alert('Group Invitation Sent!');
    return {
      success: true,
      invitationId,
      message: `Invitation sent to ${invitedUserData.name}`,
      invitationData
    };

  } catch (error) {
    Alert.alert(error.message)
    console.error("Error sending invitation:", error);
    throw error;
  }
}; 

export const removeGroupMember = async (groupId, userId) => {
  try {
    // Get group details
    const groupRef = ref(database, `groups/${groupId}`);
    const groupSnapshot = await get(groupRef);
    const groupData = groupSnapshot.val();

    // Check if user is actually a member
    if (!groupData.members || !groupData.members[userId]) {
      Alert.alert('User is not a member of the group!');
      return;
    }

    // Prepare updates to remove the user from group members and any related data
    const updates = {};
    updates[`groups/${groupId}/members/${userId}`] = null; // Remove from group's members list
    updates[`users/${userId}/groups/${groupId}`] = null; // Remove group reference from user's list, if any

    // Optionally, remove pending invitations or notifications related to this group for the user
    updates[`users/${userId}/notifications`] = null; // Clear notifications for simplicity
    updates[`groups/${groupId}/pendingInvitations`] = null; // Clear pending invitations if required

    // Perform the update
    await update(ref(database), updates);

    Alert.alert('Member Removed from Group!');
    return {
      success: true,
      message: `User ${userId} removed from group ${groupId}`
    };

  } catch (error) {
    console.error("Error removing member:", error);
    throw error;
  }
};