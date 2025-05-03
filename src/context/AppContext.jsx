import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/userApi';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshUserData = async () => {
    try {
      const currentUser = await getCurrentUser(userData?.phoneNumber || userData?.phone);
      if (currentUser.success) {
        setUserData(currentUser.userData);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const logout = (navigation) => {
    setUserData(null);
    navigation.navigate('Login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const currentUser = await getCurrentUser();
        if (currentUser.success) {
          setUserData(currentUser.userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AppContext.Provider value={{
      userData,
      setUserData,
      loading,
      logout,
      refreshUserData,
    }}>
      {children}
    </AppContext.Provider>
  );
};