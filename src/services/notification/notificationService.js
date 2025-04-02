import { auth, database } from '../../../firebase.config';
import { push, ref, remove } from "firebase/database"

export const deleteNotification = async (userId, notificationId) => {
  const notificationRef = ref(database, `users/${userId}/notifications/${notificationId}`);
  try {
    await remove(notificationRef);
    return {
      status: 200,
      success: true,
      message: "Notification deleted successfully",
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Failed to delete notification",
      error: error.message
    };
  }
};
