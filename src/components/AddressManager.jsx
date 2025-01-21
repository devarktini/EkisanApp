import { useNavigation } from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";

const AddressManager = ({
  addresses,
  setAddresses,
  selectedAddressIndex,
  setSelectedAddressIndex,
}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    contact: "",
    pinno: "",
    localarea: "",
    extraFields: [],
  });

  const handleAddAddress = () => {
    if (
      newAddress.name &&
      newAddress.address &&
      newAddress.contact &&
      newAddress.pinno &&
      newAddress.localarea
    ) {
      if (editIndex !== null) {
        // Edit existing address
        const updatedAddresses = [...addresses];
        updatedAddresses[editIndex] = { ...newAddress };
        setAddresses(updatedAddresses);
        setEditIndex(null);
      } else {
        // Add new address
        setAddresses([...addresses, newAddress]);
      }
      setNewAddress({
        name: "",
        address: "",
        contact: "",
        pinno: "",
        localarea: "",
        extraFields: [],
      });
      setIsModalVisible(false);
    } else {
      Alert.alert("Validation Error", "Please fill out all required fields.");
    }
  };

  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditIndex(index);
    setIsModalVisible(true);
  };

  const handleDeleteAddress = (index) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(updatedAddresses);
            if (selectedAddressIndex === index) {
              setSelectedAddressIndex(null); // Clear selection if deleted address was selected
            }
          },
        },
      ]
    );
  };

  const handleAddExtraField = () => {
    setNewAddress({
      ...newAddress,
      extraFields: [...newAddress.extraFields, { key: "", value: "" }],
    });
  };

  const handleUpdateExtraField = (index, field, value) => {
    const updatedFields = [...newAddress.extraFields];
    updatedFields[index][field] = value;
    setNewAddress({ ...newAddress, extraFields: updatedFields });
  };

  return (
    <View>
      <View className="flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity
          className=" shadow-md bg-white p-2 rounded-full shadow flex-row items-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color="black" />
          <Text className="text-black ml-1">Back</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("ShoppingBag", { cartItems })}
        >
          <Ionicons name="cart" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        className="bg-[#048404] rounded-full py-4 mt-4"
        onPress={() => {
          setNewAddress({
            name: "",
            address: "",
            contact: "",
            pinno: "",
            localarea: "",
            extraFields: [],
          });
          setIsModalVisible(true);
        }}
      >
        <Text className="text-center text-white font-semibold">
          Add Address
        </Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-[#048404] bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-4/5">
            <Text className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Address" : "Add New Address"}
            </Text>
            <ScrollView>
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Name"
                value={newAddress.name}
                onChangeText={(text) =>
                  setNewAddress({ ...newAddress, name: text })
                }
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Address"
                value={newAddress.address}
                onChangeText={(text) =>
                  setNewAddress({ ...newAddress, address: text })
                }
                multiline
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Contact Number"
                value={newAddress.contact}
                onChangeText={(text) =>
                  setNewAddress({ ...newAddress, contact: text })
                }
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="PIN Code"
                value={newAddress.pinno}
                onChangeText={(text) =>
                  setNewAddress({ ...newAddress, pinno: text })
                }
                keyboardType="numeric"
              />
              <TextInput
                className="border border-gray-300 rounded-lg p-2 mb-2"
                placeholder="Local Area"
                value={newAddress.localarea}
                onChangeText={(text) =>
                  setNewAddress({ ...newAddress, localarea: text })
                }
                multiline
              />
              {newAddress.extraFields.map((field, index) => (
                <View key={index} className="mb-2">
                  <TextInput
                    className="border border-gray-300 rounded-lg p-2 mb-1"
                    placeholder="Field Name"
                    value={field.key}
                    onChangeText={(text) =>
                      handleUpdateExtraField(index, "key", text)
                    }
                  />
                  <TextInput
                    className="border border-gray-300 rounded-lg p-2"
                    placeholder="Field Value"
                    value={field.value}
                    onChangeText={(text) =>
                      handleUpdateExtraField(index, "value", text)
                    }
                  />
                </View>
              ))}
              <TouchableOpacity
                className="bg-gray-200 rounded-full py-2 mb-4"
                onPress={handleAddExtraField}
              >
                <Text className="text-center text-gray-600 font-semibold">
                  Add More Fields
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <View className="flex-row justify-between">
              <TouchableOpacity
                className="bg-red-200 rounded-full py-2 px-4"
                onPress={() => {
                  setIsModalVisible(false);
                  setEditIndex(null);
                }}
              >
                <Text className="text-red-600 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#048404] rounded-full py-2 px-4"
                onPress={handleAddAddress}
              >
                <Text className="text-white font-semibold ">
                  {editIndex !== null ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView className="mt-6">
  <Text className="text-lg font-bold mb-2">Saved Addresses:</Text>
  {addresses.map((address, index) => (
    <TouchableOpacity
      key={index}
      className={`border ${
        selectedAddressIndex === index
          ? "border-blue-500"
          : "border-gray-200"
      } rounded-lg p-4 mb-2`}
      onPress={() => setSelectedAddressIndex(index)}
    >
      <Text className="font-semibold">{address.name}</Text>
      <Text>{address.address}</Text>
      <Text>Contact: {address.contact}</Text>
      <Text>PIN: {address.pinno}</Text>
      <Text>Area: {address.localarea}</Text>
      {address.extraFields.map((field, fieldIndex) => (
        <Text key={fieldIndex}>
          {field.key}: {field.value}
        </Text>
      ))}
      <View className="flex-row justify-between mt-2">
        <TouchableOpacity
          className="bg-blue-200 rounded-full py-2 px-4"
          onPress={() => handleEditAddress(index)}
        >
          <Text className="text-blue-600 font-semibold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-200 rounded-full py-2 px-4"
          onPress={() => handleDeleteAddress(index)}
        >
          <Text className="text-red-600 font-semibold">Delete</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className={`mt-2 py-2 px-4 rounded-full ${
          selectedAddressIndex === index
            ? "bg-[#048404]"
            : "bg-gray-200"
        }`}
        onPress={() => setSelectedAddressIndex(index)}
      >
        <Text
          className={`text-center font-semibold ${
            selectedAddressIndex === index ? "text-white" : "text-gray-600"
          }`}
        >
          {selectedAddressIndex === index ? "Selected" : "Select"}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  ))}
</ScrollView>
    </View>
  );
};

export default AddressManager;
