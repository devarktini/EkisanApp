import React, { createContext, useContext, useState } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ setLoading, loading }}>
      {children}
      <Modal transparent visible={loading}>
        <View 
          className="flex-1 justify-center items-center bg-black/50"
        >
          <View className="bg-white p-4 rounded-lg">
            <ActivityIndicator size="large" color="#00C853" />
          </View>
        </View>
      </Modal>
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within LoaderProvider');
  }
  return context;
};
