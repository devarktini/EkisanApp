// Add this import at the top with other imports
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, database } from '../../firebase.config'
import { ref, set, get } from "firebase/database";


export const signupAuthService = async (email, password, userData) => {

    try {
        // Validate required fields
        if (!email || !password || !userData.fullName) {
            throw new Error('Please fill in all required fields.');
        }

        // Validate password length
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }

        // Check if email already exists
        const existingMethods = await fetchSignInMethodsForEmail(auth, email);
        if (existingMethods.length > 0) {
            return {
                success: false,
                error: 'Email already in use. Please log in instead.',
            };
        }

        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user in Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        await set(userRef, {
            uid: user.uid,
            email: email,
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber || '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
            isActive: true,
        });

        // Fetch and return saved user data
        const userSnapshot = await get(userRef);
        const savedUserData = userSnapshot.exists() ? userSnapshot.val() : null;

        return {
            success: true,
            user: user,
            userData: savedUserData,
            message: 'User registered successfully!',
        };
    } catch (error) {
        console.error("Signup Error:", error);

        // Error handling
        let errorMessage = 'An error occurred during registration.';
        if (error.code) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'This email is already registered. Please log in.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address.';
                    break;
                case 'auth/operation-not-allowed':
                    errorMessage = 'Email/password accounts are not enabled.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak.';
                    break;
            }
        } else if (error.message.includes('Email already in use')) {
            errorMessage = 'This email is already registered. Please log in.';
        }

        return {
            success: false,
            error: errorMessage,
        };
    }
};

export const signinAuthService = async (email, password) => {

    try {
        // Validate required fields
        if (!email || !password) {
            throw new Error('Please enter email and password.');
        }

        // Check if the email exists
        const existingMethods = await fetchSignInMethodsForEmail(auth, email);
        if (existingMethods.length === 0) {
            return {
                success: false,
                error: 'Email not found. Please sign up first.',
            };
        }

        // Authenticate user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Fetch user details from Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.exists() ? userSnapshot.val() : null;

        return {
            success: true,
            tokenResponse:userCredential._tokenResponse,
            user: user,
            userData: userData,
            message: 'Login successful!',
        };
    } catch (error) {
        console.error("Login Error:", error);

        // Error handling
        let errorMessage = 'An error occurred during login.';
        if (error.code) {
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email. Please sign up.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password. Please try again.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email format.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Try again later.';
                    break;
            }
        }

        return {
            success: false,
            error: errorMessage,
        };
    }
};

export const signoutAuthService = async () => {
    try {
        await signOut(auth);
        console.log("User successfully logged out");
        return { success: true, message: "Logout successful!" };
    } catch (error) {
        console.error("Logout Error:", error);
        return { success: false, error: "Failed to log out. Please try again." };
    }
};