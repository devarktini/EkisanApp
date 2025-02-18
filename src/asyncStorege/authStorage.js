import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA = 'user';

/**
 * Save authentication token
 * @param {string} token - The authentication token
 */
export const saveAuthToken = async (token) => {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
        console.error("Error saving auth token:", error);
    }
};

/**
 * Get authentication token
 * @returns {Promise<string | null>} The stored auth token or null
 */
export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error("Error retrieving auth token:", error);
        return null;
    }
};

/**
 * Remove authentication token
 */
export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error("Error removing auth token:", error);
    }
};

/**
 * Save user email
 * @param {string} email - The user's email
 */
export const saveUserData = async (user) => {
    try {
        await AsyncStorage.setItem(USER_DATA, user);
    } catch (error) {
        console.error("Error saving user email:", error);
    }
};

/**
 * Get user email
 * @returns {Promise<string | null>} The stored email or null
 */
export const getUserData = async () => {
    try {
        return await AsyncStorage.getItem(USER_DATA);
    } catch (error) {
        console.error("Error retrieving user email:", error);
        return null;
    }
};

/**
 * Remove user email
 */
export const removeUserData = async () => {
    try {
        await AsyncStorage.removeItem(USER_DATA);
    } catch (error) {
        console.error("Error removing user email:", error);
    }
};

/**
 * Clear all authentication data (logout)
 */
export const clearAuthData = async () => {
    try {
        await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, USER_DATA]);
    } catch (error) {
        console.error("Error clearing auth data:", error);
    }
};
