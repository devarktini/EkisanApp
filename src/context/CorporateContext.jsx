import React, { createContext, useContext, useState } from 'react';

const CorporateContext = createContext();

export const CorporateProvider = ({ children }) => {
  const [corporateProfile, setCorporateProfile] = useState(null);

  const updateProfile = (data) => {
    setCorporateProfile(data);
  };

  return (
    <CorporateContext.Provider value={{ corporateProfile,setCorporateProfile,  updateProfile }}>
      {children}
    </CorporateContext.Provider>
  );
};

export const useCorporate = () => useContext(CorporateContext);
