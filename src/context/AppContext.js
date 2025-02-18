import React, { createContext, useState, useEffect } from 'react';
import { getAuthToken, getUserData, saveAuthToken, saveUserData, removeAuthToken, removeUserData } from '../asyncStorege/authStorage';
import { refreshAuthToken, autoLogin } from '../services/authservice';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList]= useState([])

    useEffect(() => {
        const initializeAuth = async () => {
            const token = await getAuthToken();
            const user = await getUserData();
            if (token && user) {
                setAuthToken(token);
                setUserData(JSON.parse(user));
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

    const login = async (token, user) => {
        await saveAuthToken(token);
        await saveUserData(JSON.stringify(user));
        setAuthToken(token);
        setUserData(user);
        setIsAuthenticated(true);
    };

    const logout = async (navigation) => {
        setLoading(true);
        await removeAuthToken();
        await removeUserData();
        setAuthToken(null);
        setUserData(null);
        setIsAuthenticated(false);
        setLoading(false);
        if (navigation) {
            navigation.replace("SignIn");
        } // Navigate to SignIn screen
    };

    return (
        <AppContext.Provider value={{ authToken, userData, isAuthenticated, login, logout, loading, setIsAuthenticated,
            setCategoryList, categoryList
         }}>
            {children}
        </AppContext.Provider>
    );
};
