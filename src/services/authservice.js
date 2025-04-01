import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut, getIdToken, onIdTokenChanged, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, firestore } from 'firebase/firestore';
import { auth, database } from '../../firebase.config';
import { ref, set, get, query, orderByChild, push, equalTo, onValue, update } from "firebase/database";
import { saveAuthToken, saveUserData, getAuthToken, removeAuthToken, removeUserData, getRefreshToken } from '../asyncStorege/authStorage';
import { Alert } from 'react-native';

// export const signupAuthService = async (email, password, userData) => {

//     try {
//         // Validate required fields
//         if (!email || !password || !userData.fullName) {
//             throw new Error('Please fill in all required fields.');
//         }

//         // Validate password length
//         if (password.length < 6) {
//             throw new Error('Password must be at least 6 characters long.');
//         }

//         // Check if email already exists
//         const existingMethods = await fetchSignInMethodsForEmail(auth, email);
//         if (existingMethods.length > 0) {
//             return {
//                 success: false,
//                 error: 'Email already in use. Please log in instead.',
//             };
//         }

//         // Create user in Firebase Authentication
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         // Store user in Realtime Database
//         const userRef = ref(database, `users/${user.uid}`);
//         await set(userRef, {
//             uid: user.uid,
//             email: email,
//             fullName: userData.fullName,
//             phoneNumber: userData.phoneNumber || '',
//             createdAt: Date.now(),
//             updatedAt: Date.now(),
//             isActive: true,
//         });

//         // Fetch and return saved user data
//         const userSnapshot = await get(userRef);
//         const savedUserData = userSnapshot.exists() ? userSnapshot.val() : null;

//         return {
//             success: true,
//             user: user,
//             userData: savedUserData,
//             message: 'User registered successfully!',
//         };
//     } catch (error) {
//         console.error("Signup Error:", error);

//         // Error handling
//         let errorMessage = 'An error occurred during registration.';
//         if (error.code) {
//             switch (error.code) {
//                 case 'auth/email-already-in-use':
//                     errorMessage = 'This email is already registered. Please log in.';
//                     break;
//                 case 'auth/invalid-email':
//                     errorMessage = 'Invalid email address.';
//                     break;
//                 case 'auth/operation-not-allowed':
//                     errorMessage = 'Email/password accounts are not enabled.';
//                     break;
//                 case 'auth/weak-password':
//                     errorMessage = 'Password is too weak.';
//                     break;
//             }
//         } else if (error.message.includes('Email already in use')) {
//             errorMessage = 'This email is already registered. Please log in.';
//         }

//         return {
//             success: false,
//             error: errorMessage,
//         };
//     }
// };

// export const signinAuthService = async (email, password) => {
//     try {
//         // Validate required fields
//         if (!email || !password) {
//             throw new Error('Please enter email and password.');
//         }

//         // Check if the email exists
//         const existingMethods = await fetchSignInMethodsForEmail(auth, email);
//         if (existingMethods.length === 0) {
//             return {
//                 success: false,
//                 error: 'Email not found. Please sign up first.',
//             };
//         }

//         // Authenticate user
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;
//         const token = await getIdToken(user, true); // Get the ID token
//         const refreshToken = user.refreshToken; // Get the refresh token

//         // Fetch user details from Realtime Database
//         const userRef = ref(database, `users/${user.uid}`);
//         const userSnapshot = await get(userRef);
//         const userData = userSnapshot.exists() ? userSnapshot.val() : null;

//         // Save tokens and user data to AsyncStorage
//         await saveAuthToken(token);
//         await saveUserData(JSON.stringify(userData));

//         return {
//             success: true,
//             tokenResponse: userCredential._tokenResponse,
//             user: user,
//             userData: userData,
//             message: 'Login successful!',
//         };
//     } catch (error) {
//         console.error("Login Error:", error);

//         // Error handling
//         let errorMessage = 'An error occurred during login.';
//         if (error.code) {
//             switch (error.code) {
//                 case 'auth/user-not-found':
//                     errorMessage = 'No user found with this email. Please sign up.';
//                     break;
//                 case 'auth/wrong-password':
//                     errorMessage = 'Incorrect password. Please try again.';
//                     break;
//                 case 'auth/invalid-email':
//                     errorMessage = 'Invalid email format.';
//                     break;
//                 case 'auth/too-many-requests':
//                     errorMessage = 'Too many failed attempts. Try again later.';
//                     break;
//             }
//         }

//         return {
//             success: false,
//             error: errorMessage,
//         };
//     }
// };

export const signoutAuthService = async () => {
    try {
        await signOut(auth);
        await removeAuthToken();
        await removeUserData();
        console.log("User successfully logged out");
        return { success: true, message: "Logout successful!" };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error: "Failed to log out. Please try again." };
    }
};

export const refreshAuthToken = async (number) => {
  
    try {
      const user = await getUserByPhoneNumber(number);
      console.log("bbbbbbbbbbbbb", user)
        if (user) {
          console.log("vvvvvvvvvvv", user)
            const token = 'ddcdcdffcdcdcdcd'; // Replace with actual token retrieval logic
            await saveAuthToken(token);
            return token;
        }
        return null;
    } catch (error) {
        console.error("Token Refresh Error:", error);
        return null;
    }
};

export const autoLogin = async (number) => {
    try {
        const token = await getAuthToken();
        if (token) {
          const user = await getUserByPhoneNumber(number);
            if (user) {
                const userRef = ref(database, `users/${user.uid}`);
                const userSnapshot = await get(userRef);
                const userData = userSnapshot.exists() ? userSnapshot.val() : null;
                return { user, userData};
            }
        }
        return null;
    } catch (error) {
        console.error("Auto Login Error:", error);
        return null;
    }
};


export const fetchUser = ({ user }) => {

    const userRef = ref(database, `users/${user.uid}`);
    return new Promise(resolve => {
        onValue(userRef, (snapshot) => {
            const snapVal = snapshot.val();
            resolve({ ...snapVal, uid: user.uid, phone: user.phoneNumber })
        });
    })
}

export const getCurrentUser = async (number) => {
    try {
      const user = await getUserByPhoneNumber(number);
        if (!user) {
            return { success: false, error: 'No user is currently logged in' };
        }
      console.log("userid ", user)
      
        const userRef = ref(database, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.exists() ? userSnapshot.val() : null;

        return {
            success: true,
            user,
            userData,
        };
    } catch (error) {
        console.error("Error getting current user:", error);
        return {
            success: false,
            error: 'Failed to fetch current user data'
        };
    }
};


export const signInAnonymouslyToFirebase = async (number) => {
  try {
    const existingUser = await getUserByPhoneNumber(number);
    console.log("EXISTING USER", existingUser);
    
    if (existingUser) {
      var loggedInUser = await loginUser(number,  existingUser['uid']);
      console.log("Logged In User", loggedInUser);
      if (loggedInUser['message'] === "Invalid credentials") {
        console.log("Invalid username or password")
        const registerData = await registerUser(number, existingUser['uid'], existingUser);
        console.log("Register Data", registerData);
        if (registerData.status === "success") {
          console.log("Registered successfully");
          loggedInUser = await loginUser(number,  existingUser['uid']);
          console.log("login ", loggedInUser);
          console.log("+++++++++++++++++++++++++++++++++++++++++++")
          return {
            success: true,
            user: existingUser,
            token : loggedInUser["accessToken"],
            refreshToken : loggedInUser["refreshToken"],
            userData: existingUser,
            isFirstTimeUser: existingUser.isFirstTimeUser === false ? existingUser.isFirstTimeUser : true,
            message: "New anonymous user created!",
          };
        }
      }
      console.log("User already exists, signing in with existing user...", existingUser);
      return {
        success: true,
        user:existingUser,
        token : loggedInUser["accessToken"],
        refreshToken : loggedInUser["refreshToken"],
        userData:existingUser,
        isFirstTimeUser: existingUser.isFirstTimeUser === false ? existingUser.isFirstTimeUser : true,
        message: "New anonymous user created!",
      };
    } else {
      console.log("stoppeddd")
      return await createNewAnonymousUser(number);
    }
  } catch (error) {
    console.error("Error handling authentication:", error);
    return { success: false, message: "Login failed!", error };
  }
};

// const getUserByPhoneNumber = async (phoneNumber) => {
//   try {
//     const usersRef = ref(database, 'users');
    
//     const phoneNumberQuery = query(
//         usersRef,
//         orderByChild('phoneNumber'),
//         equalTo(phoneNumber)
//     );
//     const snapshot = await get(phoneNumberQuery);
//     const data = snapshot.val();
//     console.log("Data", data);
//     if (data) {
//         return  data[Object.keys(data)[0]];
//     }

//     return null;
//   } catch (error) {
//     console.error("Error fetching user by phone number:", error);
//     return null;
//   }
// };

const getUserByPhoneNumber = async (phoneValue) => {
  try {
    const usersRef = ref(database, 'users');

    // Query for phoneNumber
    const phoneNumberQuery = query(usersRef, orderByChild('phoneNumber'), equalTo(phoneValue));
    const snapshot1 = await get(phoneNumberQuery);
    const data1 = snapshot1.val();

    // Query for phone
    const phoneQuery = query(usersRef, orderByChild('phone'), equalTo(phoneValue));
    const snapshot2 = await get(phoneQuery);
    const data2 = snapshot2.val();

    // Merge results: Return first non-null match
    if (data1) return data1[Object.keys(data1)[0]];
    if (data2) return data2[Object.keys(data2)[0]];

    return null;
  } catch (error) {
    console.error("Error fetching user by phone number or phone:", error);
    return null;
  }
};
const signInWithExistingUser = async (userData) => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    const token = await getIdToken(user, true);
    return {
      success: true,
      user,
      token,
      userData,
      isFirstTimeUser: false,
      message: "Reauthenticated successfully!",
    };
  } catch (error) {
    console.error("Error signing in with existing user:", error);
    return { success: false, message: "Login failed!", error };
  }
};

const loginUser = async (number, userId) => {
  try {
    const loginResponse = await fetch('https://sd.arktini.com/ekishan/api/auth/login', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: number,
        password: userId
      }),
    });
    
    const loginData = await loginResponse.json();

    return loginData;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

 export const verifyAuthToken = async (token) => {
  try {
    const response = await fetch('https://sd.arktini.com/ekishan/api/auth/verify-token', {
      method: 'POST',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify token');
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    return {
      success: false,
      error: 'Token verification failed',
    };
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch('https://sd.arktini.com/ekishan/api/auth/refresh-token', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return {
      success: true,
      token: data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return {
      success: false,
      error: 'Token refresh failed',
    };
  }
};



  const registerUser = async (number, userId, otherData) => {
    try {
      const response = await fetch('https://sd.arktini.com/ekishan/api/auth/register', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: number,
          password: userId,
          other: otherData
        }),
      });
      const registerData = await response.json();
      return registerData;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

const createNewAnonymousUser = async (number) => {
  try {
    // Reference to the 'users' node
    const userRef = ref(database, 'users');
   
    const newUserRef = push(userRef);
    const key = newUserRef.key;
    const user = await set(newUserRef, {
      uid: newUserRef.key,
      phoneNumber: number,
      createdAt: new Date().toISOString(),
      // isAnonymous: true,
      isProfileComplete: false,
      isFirstTimeUser: true,
    });
    const userSnapshot = await get(ref(database, `users/${key}`));
    const userData = userSnapshot.val();
    console.log("User", userData);

    const registerData = await registerUser(number, key, userData);
    if (registerData.status === "success") {
      console.log("Registered successfully");
      const loggedInUser = await loginUser(number,  key);
      console.log("login ", loggedInUser);
      return {
        success: true,
        user:userData,
        token : loggedInUser["accessToken"],
        refreshToken : loggedInUser["refreshToken"],
        userData: userData,
        isFirstTimeUser: userData.isFirstTimeUser ===false ? userData.isFirstTimeUser : true,
        message: "New anonymous user created!",
      };
    }

    console.log("===========================================")
    return {
      success: false,
      message: "User not created Successfully!",
    };
  } catch (error) {
    console.error("Error signing in anonymously:", error);
    return { success: false, message: "Login failed!", error };
  }
};

export const getUserData = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const userSnapshot = await get(userRef);
    return userSnapshot.exists() ? userSnapshot.val() : null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const saveUserInDatabase = async (uid, phoneNumber) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const userSnapshot = await get(userRef);
    const existingData = userSnapshot.exists() ? userSnapshot.val() : {};

    await set(userRef, {
      ...existingData, // Preserve existing data
      uid,
      phoneNumber,
      updatedAt: new Date().toISOString(),
    });

    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const updateUserProfile = async (userData) => {
  console.log("first,", userData)

  try {
    const userRef = ref(database, `users/${userData.uid}`);
    
    await update(userRef, {
      ...userData,
      updatedAt: new Date().toISOString(),
    });

    return {
      success: true,
      userData,
      message: 'Profile updated successfully!'
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: 'Failed to update profile'
    };
  }
};