import React, { createContext, useState, useEffect } from 'react';
import { getAuthToken, getUserData, saveAuthToken, saveUserData, removeAuthToken, removeUserData, removeAllData, saveRefreshToken, getRefreshToken } from '../asyncStorege/authStorage';
import { refreshAuthToken, autoLogin } from '../services/authservice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findUserByMobile } from '../services/userService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigation = useNavigation()
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [groups, setGroups] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile]= useState(false)
    const [categoryList, setCategoryList]= useState([])
    

    useEffect(() => {
        const initializeAuth = async () => {
            const userList = JSON.parse(await getUserData());
            const token = await getAuthToken()
            const { user, userData } = await autoLogin(userList.phoneNumber !== undefined ? userList.phoneNumber : userList.phone);
            if (token && user) {
                if(userData.isFirstTimeUser){
                    setShowUpdateProfile(true);
                    navigation.navigate("UpdateProfile", { user: userData });
                }else{
                    const refreshToken =  await getRefreshToken()
                   
                    navigation.navigate("Main",{user: userData })
                }
                // navigation.navigate("Main",{user: userData })
                setAuthToken(token);
                setUserData(user);
                setIsAuthenticated(true);
                // await refreshAuthToken(userList.phoneNumber);
            } else {
                setIsAuthenticated(false);
            }
        };
        initializeAuth();
    }, []);

    useEffect(() => {
        
        const interval = setInterval(async () => {
            const userList = JSON.parse(await getUserData());
            if (isAuthenticated) {
                // const newToken = await refreshAuthToken(userList.phoneNumber);
                // if (!newToken) {
                //     await logout();
                // }
            }
        }, 15 * 60 * 1000); // Refresh token every 15 minutes

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const login = async (token, user, userData, refreshToken) => {
        if (!token) {
            console.error('Token or is missing');
            return;
        }
        try {
            await saveAuthToken(token);
            await saveUserData(JSON.stringify(user));
            await saveRefreshToken(refreshToken)
            setAuthToken(token);
            setUserData(user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = async (navigation) => {
        setLoading(true);
        await removeAllData()
        // await removeAuthToken();
        // await removeUserData();
        // setAuthToken(null);
        // setUserData(null);
        setIsAuthenticated(false);
        setLoading(false);
        if (navigation) {
            navigation.navigate('PhoneAuth');
        } // Navigate to SignIn screen
    };

    return (
        <AppContext.Provider value={{ authToken, userData, setUserData, isAuthenticated, login, logout, loading, setIsAuthenticated, showUpdateProfile, setShowUpdateProfile
           , setCategoryList, categoryList
         }}>
            {children}
        </AppContext.Provider>
    );
};
