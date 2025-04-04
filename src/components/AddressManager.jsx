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
import { addOrUpdateAddress, getAddress, deleteAddress } from "../services/address/AddressService";

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        <View>
        <Text style={styles.headerTitle}>Manage Addresses</Text>
        </View>
        <View></View>
        
      </View>

      {/* Add Address Button */}
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
        <Ionicons name="add-circle-outline" size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      {/* Address List */}
      <View style={styles.addressList}>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.addressItem,
                selectedAddressIndex === index && styles.selectedAddressItem,
              ]}
              onPress={() => setSelectedAddressIndex(index)}
            >
              <View style={styles.addressContent}>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressName}>{address.name}</Text>
                  <Text style={styles.addressText}>{address.address_line_1}</Text>
                  <Text style={styles.addressText}>Contact: {address.contact}</Text>
                  <Text style={styles.addressText}>PIN: {address.pincode}</Text>
                  <Text style={styles.addressText}>Area: {address.localarea}</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setNewAddress(address);
                      setEditIndex(index);
                      setIsModalVisible(true);
                    }}
                  >
                    <Ionicons name="pencil" size={18} color="#048404" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteAddress}
                  >
                    <Ionicons name="trash" size={18} color="#dc2626" />
                  </TouchableOpacity>
                </View>
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
                  {selectedAddressIndex === index ? "Selected" : "Select Address"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={48} color="#9ca3af" />
            <Text style={styles.emptyStateText}>No addresses found</Text>
          </View>
        )}
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
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#048404",
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  addressList: {
    paddingHorizontal: 16,
  },
  addressItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedAddressItem: {
    borderWidth: 2,
    borderColor: "#048404",
  },
  addressContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  addressText: {
    color: "#4b5563",
    marginBottom: 2,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  selectButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  },
  selectedSelectButton: {
    backgroundColor: "#048404",
  },
  selectButtonText: {
    fontWeight: "600",
    color: "#4b5563",
  },
  selectedSelectButtonText: {
    color: "#fff",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 16,
    color: "#9ca3af",
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
});

export default AddressManager;
