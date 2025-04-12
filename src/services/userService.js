import { database } from '../../firebase.config';
import { onValue, ref, query, limitToFirst, remove, update, get } from 'firebase/database';
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

const fetchAllUsers = () => {
  const usersRef = query(ref(database, 'users'));
   
  return new Promise(resolve => {
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();

      const usersArray = users ? Object.entries(users).map(([uid, userData]) => ({
        uid,
        ...userData
      })) : [];

      resolve(usersArray);
    });
  });
}

export default fetchAllUsers;

export const fetchUserCounts = () => {
  const usersRef = query(ref(database, 'users'));

  return new Promise(resolve => {
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();

      let totalUsers = 0;
      let farmersCount = 0;
      let corporateCount = 0;

      if (users) {
        Object.values(users).forEach(user => {
          totalUsers++;
          if (user.userType === 'farmer') {
            farmersCount++;
          } else if (user.userType === 'corporate') {
            corporateCount++;
          }
        });
      }

      resolve({
        totalUsers,
        farmersCount,
        corporateCount
      });
    });
  });
};


export const findUserByMobile = (mobileNumber) => {
 
  const usersRef = query(ref(database, 'users'));
  
  return new Promise((resolve, reject) => {
    onValue(usersRef, (snapshot) => {
      const users = snapshot.val();
      if (!users) {
        resolve(null);
        return;
      }

      const user = Object.entries(users).find(([_, userData]) => 
        userData.phoneNumber === mobileNumber || userData.phone === mobileNumber
      );
      resolve(user ? { uid: user[0], ...user[1] } : null);
    }, {
      onlyOnce: true
    });
  });
};

export const deleteUserByMobile = async (mobileNumber) => {
  try {
    const user = await findUserByMobile(mobileNumber);
    if (!user) {
      throw new Error('User not found');
    }
    
    const userRef = ref(database, `users/${user.uid}`);
    await remove(userRef);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export const getUserNotifications = (userId) => {
  const notificationsRef = ref(database, `users/${userId}/notifications`);
  
  return new Promise((resolve, reject) => {
    onValue(notificationsRef, (snapshot) => {
      const notifications = snapshot.val() || {};
      const convertedNotifications = Object.entries(notifications).map(([notificationId, notification]) => ({
        id: notificationId,
        ...notification
      }));
      resolve(convertedNotifications);
    }, {
      onlyOnce: true
    });
  });
};

export const removeUserNotification = async (userId, notificationId) => {
  try {
    const notificationRef = ref(database, `users/${userId}/notifications/${notificationId}`);
    await remove(notificationRef);
    return true;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};



export const fetchSeller = ({ sellerId }) => {
  const itemsRef = ref(database, `users/${sellerId}`);
  return new Promise(resolve => {
      onValue(itemsRef, (snapshot) => {
          const snapVal = snapshot.val();
          const sellerData = {
            sellerDetails: snapVal,
              // location: productLocation({ product: snapVal, short: false }),
              name: snapVal.userType == "corporate" ? snapVal.corporateData.name
                  : snapVal.name,
              id: sellerId,
              userType: snapVal.userType,
              pfp:snapVal.pfp
          }
          resolve(sellerData)
      });
  })
}

export const getReviews = async (userId) => {
  console.log("first", userId)
  try {
    if (!userId) {
      showToast({ icon: "error", title: "No reviews available for this profile!" });
      return [];
    }
    const reviewsRef = ref(database, `users/${userId}/reviews`);
    const snapshot = await get(reviewsRef);

    if (snapshot.exists()) {
      const reviews = [];
      snapshot.forEach((childSnapshot) => {
        reviews.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      return reviews;
    } else {
      showToast({ icon: "error", title: "No reviews available for this profile!" });
      return []; 
    }
  } catch (error) {
    console.error("Error retrieving reviews:", error.message);
    throw error;
  }
};