import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
} from "react-native";
import { addOrUpdateAddress, getAddress, deleteAddress } from '../services/address/AddressService';

const AddressManager = ({
  user,
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
    address_line_1: "",
    contact: "",
    pincode: "",
    localarea: "",
  });

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await getAddress(user);
      if (response.success && response.data) {
        setAddresses([response.data]);
      }
    };
    fetchAddress();
  }, [user]);

  const handleAddOrUpdateAddress = async () => {
    if (
      newAddress.name &&
      newAddress.address_line_1 &&
      newAddress.contact &&
      newAddress.pincode &&
      newAddress.localarea
    ) {
      const response = await addOrUpdateAddress(newAddress, user);
      if (response.success) {
        setAddresses([newAddress]);
        setIsModalVisible(false);
      } else {
        Alert.alert("Error", response.message);
      }
    } else {
      Alert.alert("Validation Error", "Please fill out all required fields.");
    }
  };

  const handleDeleteAddress = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const response = await deleteAddress(user);
            if (response.success) {
              setAddresses([]);
              setSelectedAddressIndex(null);
            } else {
              Alert.alert("Error", response.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={16} color="black" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setNewAddress({
            name: "",
            address_line_1: "",
            contact: "",
            pincode: "",
            localarea: "",
          });
          setIsModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Address</Text>
      </TouchableOpacity>

      <View style={styles.addressList}>
        <Text style={styles.addressListTitle}>Saved Address:</Text>
        {addresses.map((address, index) => (
          <TouchableOpacity
          className="relative"
            key={index}
            style={[
              styles.addressItem,
              selectedAddressIndex === index && styles.selectedAddressItem,
            ]}
            onPress={() => setSelectedAddressIndex(index)}
          >
            <View>
              <Text style={styles.addressName}>{address.name}</Text>
              <Text style={styles.addressText}>{address.address_line_1}</Text>
              <Text style={styles.addressText}>Contact: {address.contact}</Text>
              <Text style={styles.addressText}>PIN: {address.pincode}</Text>
              <Text style={styles.addressText}>Area: {address.localarea}</Text>
            </View>
            <View className=" absolute right-0 top-0" style={styles.addressButtons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => {
                  setNewAddress(address);
                  setEditIndex(index);
                    setIsModalVisible(true);
                  }}
                  >
                  <Ionicons name="pencil" size={16} color="#004085" />
                  {/* <Text style={styles.editButtonText}>Edit</Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                  className=" pl-2"
                  style={styles.deleteButton}
                  onPress={handleDeleteAddress}
                  >
                    <Ionicons name="trash" size={16} color="#721c24" />
                  {/* <Text style={styles.deleteButtonText}>Delete</Text> */}
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[
                  styles.selectButton,
                  selectedAddressIndex === index && styles.selectedSelectButton,
                  ]}
                  onPress={() => setSelectedAddressIndex(index)}
                >
                  <Text
                  style={[
                    styles.selectButtonText,
                    selectedAddressIndex === index && styles.selectedSelectButtonText,
                  ]}
                  >
                  {selectedAddressIndex === index ? "Selected" : "Select"}
                  </Text>
                </TouchableOpacity>
                </TouchableOpacity>
              ))}
              </View>

              <Modal visible={isModalVisible} transparent={true} animationType="slide">
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {editIndex !== null ? "Edit Address" : "Add New Address"}
                </Text>
                <ScrollView>
                  <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={newAddress.name}
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, name: text })
                  }
                  />
                  <TextInput
                  style={styles.input}
                  placeholder="Address Line 1"
                  value={newAddress.address_line_1}
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, address_line_1: text })
                  }
                  multiline
                  />
                  <TextInput
                  style={styles.input}
                  placeholder="Contact Number"
                  value={newAddress.contact}
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, contact: text })
                  }
                  keyboardType="numeric"
                  />
                  <TextInput
                  style={styles.input}
                  placeholder="PIN Code"
                  value={newAddress.pincode}
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, pincode: text })
                  }
                  keyboardType="numeric"
                  />
                  <TextInput
                  style={styles.input}
                  placeholder="Local Area"
                  value={newAddress.localarea}
                  onChangeText={(text) =>
                    setNewAddress({ ...newAddress, localarea: text })
                  }
                  multiline
                  />
                </ScrollView>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                  setIsModalVisible(false);
                  setEditIndex(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddOrUpdateAddress}
              >
                <Text style={styles.saveButtonText}>
                  {editIndex !== null ? "Update" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    marginLeft: 8,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#048404",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#f8f8f8",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#f8d7da",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  cancelButtonText: {
    color: "#721c24",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#048404",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addressList: {
    marginTop: 16,
  },
  addressListTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  addressItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedAddressItem: {
    borderColor: "#048404",
  },
  addressName: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  addressText: {
    marginBottom: 4,
  },
  addressButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  editButton: {
    backgroundColor: "#cce5ff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  editButtonText: {
    color: "#004085",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f8d7da",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  deleteButtonText: {
    color: "#721c24",
    fontWeight: "bold",
  },
  selectButton: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  selectedSelectButton: {
    backgroundColor: "#048404",
  },
  selectButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  selectedSelectButtonText: {
    color: "#fff",
  },
});

export default AddressManager;
