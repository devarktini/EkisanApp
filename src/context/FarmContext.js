import React, { createContext, useState } from "react";
import { addFarmerFarms, getFarms, updateFarmByIndex } from "../services/farmer/FarmerFarmProfile";
import Toast from "react-native-toast-message";

export const FarmContext = createContext();

export const FarmProvider = ({ children }) => {
  const [farms, setFarms] = useState([]);
  const [editingFarm, setEditingFarm] = useState(null);

  const addFarm = async(farmData, user ) => {
    setFarms([...farms, farmData]);
    try {
      console.log("13", farmData)
      console.log("14", user)
      const response = await addFarmerFarms(farmData, user);
      if (response.success) {
        // Handle success
        Toast.show({
          type: "success",
          text1: response.message,
          position: "top",
        });
        console.log(response.message);
        console.log(response.data); // Updated farms data
      } else {
        // Handle error
        Toast.show({
          type: "error",
          text1: response.message,
          position: "top",
        });
        console.error(response.message);
        console.error(response.error);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
        position: "top",
      });
      console.error('Unexpected error:', error);
    }
  };

  const updateFarm = async(userData, index, farmData) => {
    const updatedFarms = farms.map((farm) =>
      farm.id === farmData.id ? { ...farm, ...farmData } : farm
    );
    setFarms(updatedFarms);
    try {
      const response = await updateFarmByIndex(userData, index, farmData);
      
      if (response.success) {
        // Update local state on success
        // setFarms(response.data);
        console.log(response.message);
        Toast.show({
          type: "success",
          text1: response.message,
          position: "top",
        });
      } else {
        // Handle different error cases
        switch(response.status) {
          case 404:
            console.error("No farms found to update");
            break;
          case 400: 
            console.error("Invalid farm index");
            break;
          case 500:
            console.error("Server error while updating farm");
            break;
          default:
            console.error(response.message);
        }
        
        // Revert local state changes on error
        const revertedFarms = [...farms];
        setFarms(revertedFarms);
      }
    } catch (error) {
      console.error("Unexpected error updating farm:", error);
      // Revert changes on unexpected error
      Toast.show({
          type: error,
          text1: error.message,
          position: "top",
        });
      const revertedFarms = [...farms];
      setFarms(revertedFarms);
    }
  };

  const deleteFarm = (index) => {
    const updatedFarms = farms.filter((farm) => farm.id !== id);
    setFarms(updatedFarms);
  };
  const fetchFarms = async (userData)=>{
    try {
      const response = await getFarms(userData);
      console.log("first, ", response)
      if (response.success) {
        setFarms(response.data);
      } else {
        console.error("Failed to fetch farms:", response.message);
        // You could add error handling UI feedback here if needed
      }
    } catch (error) {
      console.error("Error fetching farms:", error);
      // You could add error handling UI feedback here if needed
    }
 }

  return (
    <FarmContext.Provider
      value={{
        farms,
        editingFarm,
        setEditingFarm,
        addFarm,
        updateFarm,
        deleteFarm,
        fetchFarms
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};
