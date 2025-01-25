import React, { useState, useContext } from "react";
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

const AddFarm = ({ navigation }) => {
  const {
    farms,
    editingFarm,
    setEditingFarm,
    addFarm,
    updateFarm,
    deleteFarm,
  } = useContext(FarmContext);

  const [selectedFarm, setSelectedFarm] = useState(null); // State to track the selected farm for viewing
  const [isViewModalVisible, setIsViewModalVisible] = useState(false); //
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  const cropTypes = ["Wheat", "Rice", "Corn", "Soybean", "Cotton"];
  const cropsGrown = ["Vegetables", "Fruits", "Grains", "Pulses", "Oilseeds"];

  // Handle form submission
  const handleSubmit = () => {
    const farmData = {
      id: editingFarm ? editingFarm.id : Math.random().toString(),
      cropType,
      cropGrown,
      sowingDate: sowingDate.toDateString(),
      farmArea,
      unitOfMeasurement,
      irrigationFacility,
      storageFacility,
      chemicalFertilizer,
      soilTested,
      animalHusbandry,
    };

    if (editingFarm) {
      updateFarm(farmData); // Update existing farm
    } else {
      addFarm(farmData); // Add new farm
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
  const handleEditFarm = (farm) => {
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
  const handleViewFarm = (farm) => {
    setSelectedFarm(farm);
    setIsViewModalVisible(true);
  };

  return (
    <PaperProvider>
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-3 bg-white shadow-md">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={16} color="black" />
            <Text className="text-black ml-1">Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEditingFarm(null);
              setIsModalVisible(true);
            }}
            className="bg-green-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white">Add Farm</Text>
          </TouchableOpacity>
        </View>

        {/* Farm Cards */}
      

        {/* Add/Edit Farm Modal */}
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-6 rounded-lg w-11/12 max-h-[90%]">
              <Text className="text-xl font-bold mb-4">
                {editingFarm ? "Edit Farm" : "Add Farm"}
              </Text>

              {/* Form Fields */}
              <ScrollView>
                {/* 1. What kind of crop you grow? (Dropdown) */}
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    What kind of crop you grow?
                  </Text>
                  <View className="border border-gray-300 p-2 rounded-lg">
                    <Picker
                      selectedValue={cropType}
                      onValueChange={(itemValue) => setCropType(itemValue)}
                    >
                      <Picker.Item label="Select Crop Type" value="" />
                      {cropTypes.map((type, index) => (
                        <Picker.Item key={index} label={type} value={type} />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* 2. Crop you grow in this farm (Dropdown) */}
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    Crop you grow in this farm
                  </Text>
                  <View className="border border-gray-300 p-2 rounded-lg">
                    <Picker
                      selectedValue={cropGrown}
                      onValueChange={(itemValue) => setCropGrown(itemValue)}
                    >
                      <Picker.Item label="Select Crop Grown" value="" />
                      {cropsGrown.map((crop, index) => (
                        <Picker.Item key={index} label={crop} value={crop} />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* 3. Date of Sowing (Date Picker) */}
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    Date of Sowing
                  </Text>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisible(true)}
                    className="border border-gray-300 p-2 rounded-lg"
                  >
                    <Text>{sowingDate.toDateString()}</Text>
                  </TouchableOpacity>

                  {/* Date Picker Modal */}
                  <Modal
                    visible={isDatePickerVisible}
                    transparent
                    animationType="slide"
                  >
                    <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                      <View className="bg-white  rounded-lg w-11/12">
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
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    Area of Farm
                  </Text>
                  <TextInput
                    placeholder="Enter area"
                    value={farmArea}
                    onChangeText={setFarmArea}
                    keyboardType="numeric"
                    className="border border-gray-300 p-2 rounded-lg"
                  />
                </View>

                {/* 5. Unit of Measurement (Radio Buttons) */}
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    Unit of Measurement
                  </Text>
                  <RadioButton.Group
                    onValueChange={(value) => setUnitOfMeasurement(value)}
                    value={unitOfMeasurement}
                  >
                    <View className="flex-row items-center">
                      <RadioButton value="acre" />
                      <Text>Acre</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="hectare" />
                      <Text>Hectare</Text>
                    </View>
                  </RadioButton.Group>
                </View>

                {/* Radio Button Questions */}
                <View className="mb-4">
                  <Text className="text-lg font-semibold mb-2">
                    Additional Information
                  </Text>
                  <RadioButton.Group
                    onValueChange={(value) => setIrrigationFacility(value)}
                    value={irrigationFacility}
                  >
                    <Text className="text-gray-700">
                      1. Irrigation Facility
                    </Text>
                    <View className="flex-row items-center">
                      <RadioButton value="yes" />
                      <Text>Yes</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="no" />
                      <Text>No</Text>
                    </View>
                  </RadioButton.Group>

                  <Divider className="my-2" />

                  <RadioButton.Group
                    onValueChange={(value) => setStorageFacility(value)}
                    value={storageFacility}
                  >
                    <Text className="text-gray-700">2. Storage Facility</Text>
                    <View className="flex-row items-center">
                      <RadioButton value="yes" />
                      <Text>Yes</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="no" />
                      <Text>No</Text>
                    </View>
                  </RadioButton.Group>

                  <Divider className="my-2" />

                  <RadioButton.Group
                    onValueChange={(value) => setChemicalFertilizer(value)}
                    value={chemicalFertilizer}
                  >
                    <Text className="text-gray-700">
                      3. Chemical Fertilizer
                    </Text>
                    <View className="flex-row items-center">
                      <RadioButton value="yes" />
                      <Text>Yes</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="no" />
                      <Text>No</Text>
                    </View>
                  </RadioButton.Group>

                  <Divider className="my-2" />

                  <RadioButton.Group
                    onValueChange={(value) => setSoilTested(value)}
                    value={soilTested}
                  >
                    <Text className="text-gray-700">4. Soil Tested</Text>
                    <View className="flex-row items-center">
                      <RadioButton value="yes" />
                      <Text>Yes</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="no" />
                      <Text>No</Text>
                    </View>
                  </RadioButton.Group>

                  <Divider className="my-2" />

                  <RadioButton.Group
                    onValueChange={(value) => setAnimalHusbandry(value)}
                    value={animalHusbandry}
                  >
                    <Text className="text-gray-700">5. Animal Husbandry</Text>
                    <View className="flex-row items-center">
                      <RadioButton value="yes" />
                      <Text>Yes</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value="no" />
                      <Text>No</Text>
                    </View>
                  </RadioButton.Group>
                </View>
              </ScrollView>

              {/* Buttons */}
              <View className="flex-row justify-end mt-4">
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false);
                    setEditingFarm(null);
                    resetForm();
                  }}
                  className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-green-500 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white">
                    {editingFarm ? "Update" : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView className="p-4">
          {farms.map((farm, index) => (
            <View
              key={farm.id}
              className="bg-white p-4 rounded-lg shadow-md mb-4"
            >
              {/* Farm Label (Farm1, Farm2, etc.) */}
              <Text className="text-lg font-semibold">Farm {index + 1}</Text>

              {/* Basic Farm Information */}
              <Text className="text-gray-600">Crop Type: {farm.cropType}</Text>
              <Text className="text-gray-600">
                Crop Grown: {farm.cropGrown}
              </Text>
              <Text className="text-gray-600">
                Sowing Date: {farm.sowingDate}
              </Text>
              <Text className="text-gray-600">
                Farm Area: {farm.farmArea} {farm.unitOfMeasurement}
              </Text>

              {/* View, Edit, and Delete Buttons */}
              <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                  onPress={() => handleViewFarm(farm)}
                  className="bg-blue-500 px-3 py-1 rounded-lg mr-2"
                >
                  <Text className="text-white">View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleEditFarm(farm)}
                  className="bg-yellow-500 px-3 py-1 rounded-lg mr-2"
                >
                  <Text className="text-white">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteFarm(farm.id)}
                  className="bg-red-500 px-3 py-1 rounded-lg"
                >
                  <Text className="text-white">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Modal to Display All Farm Information */}
          <Modal visible={isViewModalVisible} animationType="slide" transparent>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="bg-white p-6 rounded-lg w-11/12 max-h-[90%]">
                <Text className="text-xl font-bold mb-4">Farm Details</Text>

                {/* Display All Farm Information */}
                {selectedFarm && (
                  <ScrollView>
                    <Text className="text-lg font-semibold mb-2">
                      Crop Type: {selectedFarm.cropType}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Crop Grown: {selectedFarm.cropGrown}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Sowing Date: {selectedFarm.sowingDate}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Farm Area: {selectedFarm.farmArea}{" "}
                      {selectedFarm.unitOfMeasurement}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Irrigation Facility: {selectedFarm.irrigationFacility}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Storage Facility: {selectedFarm.storageFacility}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Chemical Fertilizer: {selectedFarm.chemicalFertilizer}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Soil Tested: {selectedFarm.soilTested}
                    </Text>
                    <Text className="text-lg font-semibold mb-2">
                      Animal Husbandry: {selectedFarm.animalHusbandry}
                    </Text>
                  </ScrollView>
                )}

                {/* Close Button */}
                <TouchableOpacity
                  onPress={() => setIsViewModalVisible(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg mt-4"
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

export default AddFarm;
