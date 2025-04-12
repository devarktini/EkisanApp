import { auth, database } from '../../../firebase.config';
import { ref, set, get, update, serverTimestamp } from "firebase/database";

export const addFarmerFarms = async (data, user) => {
  try {
    if (!data || !user?.uid) {
      throw new Error('Invalid input parameters');
    }

    const userRef = ref(database, `users/${user.uid}/farmerData`);
    const farmsRef = ref(database, `users/${user.uid}/farmerData/farms`);
  
    const snapshot = await get(farmsRef);
    let existingFarms = snapshot.exists() ? snapshot.val() : [];

    // Validate that existingFarms is always an array
    if (!Array.isArray(existingFarms)) {
      existingFarms = [];
    }

    // Ensure `data` is wrapped inside an array and validate farm data
    const newFarm = Array.isArray(data) ? data : [data];
    newFarm.forEach(farm => {
      if (!farm.name || !farm.location) {
        throw new Error('Farm must have name and location');
      }
    });

    const updatedFarms = [...existingFarms, ...newFarm];

    await update(userRef, {
      farms: updatedFarms,
      lastUpdate: serverTimestamp(),
    });

    return {
      status: 200,
      success: true,
      message: "Farm edited successfully! Changes will be reflected soon",
      data: updatedFarms,
    };
  } catch (error) {
    console.error("Error in addFarmerFarms:", error.message);
    return {
      status: 400,
      success: false,
      message: error.message || "Unable to update the farm!",
      error: error.message,
    };
  }
};

export const getFarms = async (user) => {
  const id = user?.userId || user?.uid;
  try {
    const farmsRef = ref(database, `users/${id}/farmerData/farms`);
    const snapshot = await get(farmsRef);
    
    if (snapshot.exists()) {
      const farms = Object.values(snapshot.val());
      return {
        status: 200,
        success: true,
        message: "Farms fetched successfully",
        data: farms
      };
    }
    
    return {
      status: 200,
      success: true,
      message: "No farms found",
      data: []
    };
  } catch (error) {
    return {
      status: 400,
      success: false,
      message: "Failed to fetch farms",
      error: error.message,
      data: []
    };
  }
};

export const updateFarmByIndex = async (user, index, updatedFarmData) => {
  try {
    if (!user?.uid || index === undefined || !updatedFarmData) {
      throw new Error('Missing required parameters');
    }

    const id = user?.userId || user?.uid;
    const farmsRef = ref(database, `users/${id}/farmerData/farms`);
    const snapshot = await get(farmsRef);

    if (!snapshot.exists() || !Array.isArray(snapshot.val())) {
      return {
        status: 404,
        success: false,
        message: "No farms data found or invalid format",
        error: "Farms data is missing or not an array",
      };
    }

    let farms = snapshot.val();

    if (index < 0 || index >= farms.length) {
      return {
        status: 400,
        success: false,
        message: "Invalid farm index",
        error: "Index out of bounds",
      };
    }

    // 🔹 Update only the specific farm object
    const farmRef = ref(database, `users/${id}/farmerData/farms/${index}`);
    await update(farmRef, updatedFarmData);

    // 🔹 Update last modified timestamp separately
    await update(ref(database, `users/${id}/farmerData`), {
      lastUpdate: serverTimestamp(),
    });

    return {
      status: 200,
      success: true,
      message: "Farm updated successfully",
    };
  } catch (error) {
    console.error("Error updating farm:", error.message);
    return {
      status: 500,
      success: false,
      message: "Failed to update farm",
      error: error.message,
    };
  }
};

export const deleteFarmByIndex = async (user, index) => {
  const id = user?.userId || user?.uid;
  try {
    const farmsRef = ref(database, `users/${id}/farmerData/farms`);
    const snapshot = await get(farmsRef);

    if (!snapshot.exists()) {
      return {
        status: 404,
        success: false,
        message: "No farms data found",
        error: "Farms data not found"
      };
    }

    const farms = snapshot.val();
    if (index < 0 || index >= farms.length) {
      return {
        status: 400,
        success: false,
        message: "Invalid farm index",
        error: "Index out of bounds"
      };
    }

    farms.splice(index, 1);
    await update(ref(database, `users/${id}/farmerData`), {
      farms,
      lastUpdate: serverTimestamp(),
    });

    return {
      status: 200,
      success: true,
      message: "Farm deleted successfully",
      data: farms
    };

  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "Failed to delete farm",
      error: error.message
    };
  }
};
