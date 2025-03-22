import { database } from '../../firebase.config';
import { onValue, ref, query, limitToFirst, remove } from 'firebase/database';

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
  console.log("mobile?", mobileNumber)
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
     console.log("userid", user.uid)
    const userRef = ref(database, `users/${user.uid}`);
    await remove(userRef);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};