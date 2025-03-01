import React, { createContext, useState, useEffect } from 'react';
import { getAuthToken, getUserData, saveAuthToken, saveUserData, removeAuthToken, removeUserData, removeAllData } from '../asyncStorege/authStorage';
import { refreshAuthToken, autoLogin } from '../services/authservice';
import { useNavigation } from '@react-navigation/native';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigation = useNavigation()
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile]= useState(false)
    const [categoryList, setCategoryList]= useState([])

    useEffect(() => {
        const initializeAuth = async () => {
            const token = await getAuthToken()
            // const user = await getUserData();
            const { user, userData } = await autoLogin()
            if (token && user) {
                if(userData.isFirstTimeUser){
                    setShowUpdateProfile(true);
                    navigation.navigate("UpdateProfile", { user: userData });
                }else{
                    navigation.navigate("Main",{user: userData })
                }
                setAuthToken(token);
                setUserData(userData);
                setIsAuthenticated(true);
                await refreshAuthToken();
            } else {
                setIsAuthenticated(false);
            }
        };
        initializeAuth();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isAuthenticated) {
                const newToken = await refreshAuthToken();
                if (!newToken) {
                    await logout();
                }
            }
        }, 15 * 60 * 1000); // Refresh token every 15 minutes

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    const login = async (token, user, userData) => {
        console.log("auto login ", userData)
        if (!token) {
            console.error('Token or is missing');
            return;
        }
        try {
            await saveAuthToken(token);
            await saveUserData(JSON.stringify(user));
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
