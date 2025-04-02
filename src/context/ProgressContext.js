import React, { createContext, useState, useContext } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const startProgress = () => {
    setVisible(true);
  };

  const stopProgress = () => {
    setVisible(false);
    setProgress(0); // Reset progress after stopping
  };

  const updateProgress = (value) => {
    setProgress(value);
  };

  return (
    <ProgressContext.Provider value={{ progress, visible, startProgress, stopProgress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
