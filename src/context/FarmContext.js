import React, { createContext, useState } from "react";

export const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [farms, setFarms] = useState([]);
  const [editingFarm, setEditingFarm] = useState(null);

  const addFarm = (farmData) => {
    setFarms([...farms, farmData]);
  };

  const updateFarm = (farmData) => {
    const updatedFarms = farms.map((farm) =>
      farm.id === farmData.id ? { ...farm, ...farmData } : farm
    );
    setFarms(updatedFarms);
  };

  const deleteFarm = (id) => {
    const updatedFarms = farms.filter((farm) => farm.id !== id);
    setFarms(updatedFarms);
  };

  return (
    <FarmContext.Provider
      value={{
        farms,
        editingFarm,
        setEditingFarm,
        addFarm,
        updateFarm,
        deleteFarm,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};
