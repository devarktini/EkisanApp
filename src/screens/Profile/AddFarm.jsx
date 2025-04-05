import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  RadioButton,
  Provider as PaperProvider,
  Divider,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FarmContext } from "../../context/FarmContext"; // Import FarmContext
import { AppContext } from "../../context/AppContext";
import { getFarms } from "../../services/farmer/FarmerFarmProfile";
import fetchCrops from "../../services/fetchCrops";
import fetchCategories from "../../services/fetchCategories";

const AddFarm = ({ navigation }) => {
  const {
    farms,
    editingFarm,
    setEditingFarm,
    addFarm,
    updateFarm,
    deleteFarm,
    fetchFarms,
  } = useContext(FarmContext);
  const { userData } = useContext(AppContext);
  const [crops, setCrops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null); // State to track the selected farm for viewing
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Form states
  const [cropType, setCropType] = useState("");
  const [cropGrown, setCropGrown] = useState("");
  const [sowingDate, setSowingDate] = useState(new Date());
  const [farmArea, setFarmArea] = useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("acre");
  const [irrigationFacility, setIrrigationFacility] = useState("no");
  const [storageFacility, setStorageFacility] = useState("no");
  const [chemicalFertilizer, setChemicalFertilizer] = useState("no");
  const [soilTested, setSoilTested] = useState("no");
  const [animalHusbandry, setAnimalHusbandry] = useState("no");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Dropdown options
  // Handle form submission
  const handleSubmit = () => {
    const farmData = {
      cropType,
      cropName: cropGrown,
      dateOfSowing: sowingDate.toDateString(),
      fieldArea: farmArea,
      fieldSizeUnit: unitOfMeasurement,
      irrigation: irrigationFacility,
      storage: storageFacility,
      chemicalFertilizer,
      soilTested,
      animalHusbandry,
    };

    if (editingFarm) {
      updateFarm(userData, selectedIndex, farmData); // Update existing farm
    } else {
      addFarm(farmData, userData); // Add new farm
    }

    // Reset form and close modal
    setIsModalVisible(false);
    setEditingFarm(null);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setCropType("");
    setCropGrown("");
    setSowingDate(new Date());
    setFarmArea("");
    setUnitOfMeasurement("acre");
    setIrrigationFacility("no");
    setStorageFacility("no");
    setChemicalFertilizer("no");
    setSoilTested("no");
    setAnimalHusbandry("no");
  };

  // Handle edit farm
  const handleEditFarm = (farm, index) => {
    setSelectedIndex(index);
    setEditingFarm(farm);
    setCropType(farm.cropType);
    setCropGrown(farm.cropGrown);
    setSowingDate(new Date(farm.sowingDate));
    setFarmArea(farm.farmArea);
    setUnitOfMeasurement(farm.unitOfMeasurement);
    setIrrigationFacility(farm.irrigationFacility);
    setStorageFacility(farm.storageFacility);
    setChemicalFertilizer(farm.chemicalFertilizer);
    setSoilTested(farm.soilTested);
    setAnimalHusbandry(farm.animalHusbandry);
    setIsModalVisible(true);
  };

  // Function to handle the "View" button click
  const handleViewFarm = (farm, index) => {
    setSelectedFarm(farm);
    setIsViewModalVisible(true);
  };

  useEffect(() => {
    fetchFarms(userData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cropsData = await fetchCrops();
        const categoriesData = await fetchCategories({});
        setCrops(cropsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filter crops based on selected category
  const filteredCrops = crops.filter((crop) => crop.category === cropType);

  // Function to get crops for selected category
  const getCropsForCategory = () => {
    if (!cropType) return [];
    return filteredCrops.map((crop) => ({
      label: crop.cropName,
      value: crop.cropName,
      unit: crop.unit,
    }));
  };

  // Update cropGrown when category changes
  useEffect(() => {
    setCropGrown(""); // Reset crop selection when category changes
  }, [cropType]);

  return (
    <PaperProvider>
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="flex-row items-center px-4 py-3 bg-white shadow-md">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#048404" />
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-gray-800 text-center">
            My Farms
          </Text>
          <View>
            
          </View>
        </View>

        {/* Farm Cards */}
        <ScrollView className="px-3 py-2">
          {farms &&
            Array.isArray(farms) &&
            farms.map((farm, index) => (
              <View
                key={index + 1}
                className="bg-white rounded-xl shadow-md mb-3 overflow-hidden border-l-4 border-green-500"
              >
                {/* Header */}
                <View className="flex-row justify-between items-center p-3 bg-gray-50">
                  <View className="flex-row items-center">
                    <Ionicons name="leaf" size={20} color="#22c55e" />
                    <Text className="text-lg font-bold ml-2 text-gray-800">
                      Farm {index + 1}
                    </Text>
                  </View>
                  <Text className="text-sm text-gray-500">{farm.dateOfSowing}</Text>
                </View>

                {/* Farm Info */}
                <View className="p-3">
                  <View className="flex-row justify-between mb-2">
                    <View className="flex-1 mr-2">
                      <Text className="text-xs text-gray-500">Crop Type</Text>
                      <Text className="text-sm font-semibold text-gray-800">
                        {farm.cropType}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-gray-500">Crop Name</Text>
                      <Text className="text-sm font-semibold text-gray-800">
                        {farm.cropName}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center">
                    <View className="flex-row items-center bg-green-50 px-2 py-1 rounded-full">
                      <Ionicons name="resize" size={12} color="#22c55e" />
                      <Text className="text-xs ml-1 text-green-700">
                        {farm.fieldArea} {farm.fieldSizeUnit}
                      </Text>
                    </View>
                    {farm.irrigation === "yes" && (
                      <View className="flex-row items-center bg-blue-50 px-2 py-1 rounded-full ml-2">
                        <Ionicons name="water" size={12} color="#3b82f6" />
                        <Text className="text-xs ml-1 text-blue-700">Irrigated</Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row border-t border-gray-100">
                  <TouchableOpacity
                    onPress={() => handleViewFarm(farm, index)}
                    className="flex-1 flex-row justify-center items-center p-2 border-r border-gray-100"
                  >
                    <Ionicons name="eye-outline" size={16} color="#3b82f6" />
                    <Text className="text-blue-500 text-sm font-medium ml-1">
                      View
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => handleEditFarm(farm, index)}
                    className="flex-1 flex-row justify-center items-center p-2 border-r border-gray-100"
                  >
                    <Ionicons name="pencil-outline" size={16} color="#eab308" />
                    <Text className="text-yellow-500 text-sm font-medium ml-1">
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => deleteFarm(farm, index)}
                    className="flex-1 flex-row justify-center items-center p-2"
                  >
                    <Ionicons name="trash-outline" size={16} color="#ef4444" />
                    <Text className="text-red-500 text-sm font-medium ml-1">
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          {/* Modal to Display All Farm Information */}
          <Modal visible={isViewModalVisible} animationType="slide" transparent>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-60">
              <View className="bg-white rounded-2xl w-11/12 max-h-[85%] shadow-xl">
                {/* Header */}
                <View className="bg-green-500 p-4 rounded-t-2xl">
                  <Text className="text-2xl font-bold text-white text-center">
                    Farm Details
                  </Text>
                </View>

                {/* Content */}
                {selectedFarm && (
                  <View className="space-y-4">
                    {/* Basic Info Section */}
                    <View className="bg-green-50 p-4 rounded-xl">
                      <Text className="text-xl font-bold text-green-800 mb-3">
                        Basic Information
                      </Text>
                      <View className="space-y-2">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Crop Type:
                          </Text>
                          <Text className="text-base text-gray-800">
                            {selectedFarm.cropType}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Crop Grown:
                          </Text>
                          <Text className="text-base text-gray-800">
                            {selectedFarm.cropName}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Sowing Date:
                          </Text>
                          <Text className="text-base text-gray-800">
                            {selectedFarm.dateOfSowing}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Farm Area:
                          </Text>
                          <Text className="text-base text-gray-800">
                            {selectedFarm.fieldArea} {selectedFarm.fieldSizeUnit}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Facilities Section */}
                    <View className="bg-blue-50 p-4 rounded-xl">
                      <Text className="text-xl font-bold text-blue-800 mb-3">
                        Facilities
                      </Text>
                      <View className="space-y-2">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Irrigation:
                          </Text>
                          <Text className="text-base text-gray-800 capitalize">
                            {selectedFarm.irrigation}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Storage:
                          </Text>
                          <Text className="text-base text-gray-800 capitalize">
                            {selectedFarm.storage}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Additional Info Section */}
                    <View className="bg-purple-50 p-4 rounded-xl">
                      <Text className="text-xl font-bold text-purple-800 mb-3">
                        Additional Details
                      </Text>
                      <View className="space-y-2">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Chemical Fertilizer:
                          </Text>
                          <Text className="text-base text-gray-800 capitalize">
                            {selectedFarm.chemicalFertilizer}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Soil Tested:
                          </Text>
                          <Text className="text-base text-gray-800 capitalize">
                            {selectedFarm.soilTested}
                          </Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                          <Text className="text-base font-medium text-gray-600">
                            Animal Husbandry:
                          </Text>
                          <Text className="text-base text-gray-800 capitalize">
                            {selectedFarm.animalHusbandry}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}

                {/* Close Button */}
                <TouchableOpacity
                  onPress={() => setIsViewModalVisible(false)}
                  className="bg-green-500 m-4 p-3 rounded-xl"
                >
                  <Text className="text-white text-center text-lg font-semibold">
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity
          onPress={() => {
            setEditingFarm(null);
            setIsModalVisible(true);
          }}
          className="absolute bottom-6 right-6 bg-green-500 w-14 h-14 rounded-full shadow-xl items-center justify-center elevation-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        {/* Add/Edit Farm Modal */}
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View className="flex-1 justify-center items-center bg-black bg-opacity-60">
            <View className="bg-white p-6 rounded-2xl w-11/12 max-h-[90%] shadow-xl">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-2xl font-bold text-gray-800">
                  {editingFarm ? "Edit Farm Details" : "Add New Farm"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    setEditingFarm(null);
                    resetForm();
                  }}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <ScrollView showsVerticalScrollIndicator={false} className="">
                <View>
                  {/* 1. What kind of crop you grow? (Dropdown) */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-2 text-gray-700">
                      What kind of crop do you grow?
                    </Text>
                    <View className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <Picker
                        selectedValue={cropType}
                        onValueChange={(itemValue) => setCropType(itemValue)}
                        className="bg-gray-50"
                      >
                        <Picker.Item label="Select Crop Type" value="" />
                        {categories.map((type, index) => (
                          <Picker.Item
                            key={index}
                            label={type.categorieName}
                            value={type.categorieName}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  {/* 2. Crop you grow in this farm (Dropdown) */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-2 text-gray-700">
                      Specific crop grown in this farm
                    </Text>
                    <View className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <Picker
                        selectedValue={cropGrown}
                        onValueChange={(itemValue) => setCropGrown(itemValue)}
                        className="bg-gray-50"
                      >
                        <Picker.Item label="Select Crop Grown" value="" />
                        {getCropsForCategory().map((crop, index) => (
                          <Picker.Item
                            key={index}
                            label={crop.label}
                            value={crop.label}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  {/* 3. Date of Sowing (Date Picker) */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-2 text-gray-700">
                      Date of Sowing
                    </Text>
                    <TouchableOpacity
                      onPress={() => setDatePickerVisible(true)}
                      className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50"
                    >
                      <Text className="text-gray-700">
                        {sowingDate.toDateString()}
                      </Text>
                    </TouchableOpacity>

                    {/* Date Picker Modal */}
                    <Modal
                      visible={isDatePickerVisible}
                      transparent
                      animationType="fade"
                    >
                      <View className="flex-1 justify-center items-center bg-black bg-opacity-60">
                        <View className="bg-white p-4 rounded-2xl w-11/12">
                          <DateTimePicker
                            value={sowingDate}
                            mode="date"
                            display="spinner"
                            onChange={(event, selectedDate) => {
                              if (event.type === "set" && selectedDate) {
                                setSowingDate(selectedDate);
                              }
                              setDatePickerVisible(false);
                            }}
                          />
                        </View>
                      </View>
                    </Modal>
                  </View>

                  {/* 4. Area of Farm */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-2 text-gray-700">
                      Area of Farm
                    </Text>
                    <TextInput
                      placeholder="Enter area"
                      value={farmArea}
                      onChangeText={setFarmArea}
                      keyboardType="numeric"
                      className="border-2 border-gray-200 p-4 rounded-xl bg-gray-50"
                    />
                  </View>

                  {/* 5. Unit of Measurement (Radio Buttons) */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-3 text-gray-700">
                      Unit of Measurement
                    </Text>
                    <View className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      <RadioButton.Group
                        onValueChange={(value) => setUnitOfMeasurement(value)}
                        value={unitOfMeasurement}
                      >
                        <View className="flex-row flex-wrap justify-between">
                          {["acre", "hectare", "Bigha", "Kattha"].map((unit) => (
                            <View
                              key={unit}
                              className="flex-row items-center w-[45%] mb-2"
                            >
                              <RadioButton value={unit} />
                              <Text className="text-gray-700 capitalize">
                                {unit}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </RadioButton.Group>
                    </View>
                  </View>

                  {/* Radio Button Questions */}
                  <View className="mb-6">
                    <Text className="text-lg font-semibold mb-3 text-gray-700">
                      Additional Information
                    </Text>
                    <View className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                      {[
                        {
                          label: "Irrigation Facility",
                          value: irrigationFacility,
                          setter: setIrrigationFacility,
                        },
                        {
                          label: "Storage Facility",
                          value: storageFacility,
                          setter: setStorageFacility,
                        },
                        {
                          label: "Chemical Fertilizer",
                          value: chemicalFertilizer,
                          setter: setChemicalFertilizer,
                        },
                        { label: "Soil Tested", value: soilTested, setter: setSoilTested },
                        {
                          label: "Animal Husbandry",
                          value: animalHusbandry,
                          setter: setAnimalHusbandry,
                        },
                      ].map((item, index) => (
                        <View key={index} className="mb-4">
                          <Text className="text-gray-700 font-medium mb-2">
                            {index + 1}. {item.label}
                          </Text>
                          <RadioButton.Group
                            onValueChange={item.setter}
                            value={item.value}
                          >
                            <View className="flex-row justify-start space-x-8">
                              <View className="flex-row items-center">
                                <RadioButton value="yes" />
                                <Text>Yes</Text>
                              </View>
                              <View className="flex-row items-center">
                                <RadioButton value="no" />
                                <Text>No</Text>
                              </View>
                            </View>
                          </RadioButton.Group>
                          {index < 4 && <Divider className="mt-4" />}
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View className="flex-row justify-end mt-6 space-x-3">
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    setEditingFarm(null);
                    resetForm();
                  }}
                  className="bg-gray-200 px-6 py-3 rounded-xl"
                >
                  <Text className="text-gray-700 font-semibold">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-green-500 ml-4 px-6 py-3 rounded-xl"
                >
                  <Text className="text-white font-semibold">
                    {editingFarm ? "Update Farm" : "Add Farm"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

export default AddFarm;
