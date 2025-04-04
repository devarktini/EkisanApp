import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import image from "../assets/userProfile.png";
import logo from "../assets/icon.png";
import { fetchUserGroups } from "../services/Message/fetchGroups";
import { AppContext } from "../context/AppContext";
import fetchAllUsers, { deleteUserByMobile, findUserByMobile } from "../services/userService";
import AddMemberUI from "./AddMemberUI";
import { fetchGroupById } from "../services/Message/fetchGroupById";
import { set } from "firebase/database";

const GroupListScreen = ({ onCreateGroup }) => {
  const { user, userData } = useContext(AppContext);
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [groups, setGroups] = useState([]);
  const [tempAllUsers, setTempAllUsers] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAllowedToCreateGroup, setIsAllowedToCreateGroup] = useState(false);

  const fetchGroups = async () => {
    const list = await Promise.all(
      Object.entries(userData.groups).map(async ([id, value]) => {
        const groupDetails = await fetchGroupById(id);
        return {
          id,
          ...value,
          ...groupDetails
        };
      })
    );

    setGroups(list);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    fetchGroups();
  }, [userData.uid]);

  const handleCreateGroup = () => {
    onCreateGroup(newGroupName, newGroupDescription, userData);
    setModalVisible(false);
    setNewGroupName("");
    setNewGroupDescription("");
    fetchGroups();
  };

  const handleEllipsisClick = (group) => {
    setSelectedGroup(group);
    setOptionsModalVisible(true);
  };

  const onClickHandlerAddMamber = async (item) => {
    const data = await fetchAllUsers();
    setTempAllUsers(data);
  };

  const handleOptionSelect = async(option) => {
    if (option === "Add mamber") {
      setSelectedOption(option);
      setOptionsModalVisible(false);
      setPopupVisible(true);
      onClickHandlerAddMamber();
    } else if (option === "View mamber") {
      setSelectedOption(option);
      setOptionsModalVisible(false);
      setPopupVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.listContainer, opacity: fadeAnim }}>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.groupItem}
              onPress={() =>
                navigation.navigate("GroupChat", { groupId: item.id })
              }
            >
              <Image source={logo} style={styles.groupImage} />
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{item.name}</Text>
                <Text style={styles.status}>
                  • {item.members ? Object.keys(item.members).length : 0} members •{" "}
                  <Text style={{ color: "red", fontWeight: "bold" }}>
                    {item.pendingInvitations ? Object.keys(item.pendingInvitations).length : 0} Pending
                    members
                  </Text>
                </Text>

                <Text style={styles.date}>
                  Create at {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleEllipsisClick(item)}>
                <Ionicons name="ellipsis-vertical" size={24} color="gray" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
      {isAllowedToCreateGroup && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.blurBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Create New Group</Text>
            <TextInput
              style={styles.input}
              placeholder="Group Name"
              value={newGroupName}
              onChangeText={setNewGroupName}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newGroupDescription}
              onChangeText={setNewGroupDescription}
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateGroup}
            >
              <Text style={styles.createButtonText}>Create Group</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={() => {
          setOptionsModalVisible(!optionsModalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.blurBackground}
          onPress={() => setOptionsModalVisible(false)}
        >
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleOptionSelect("Add mamber")}
            >
              <Ionicons name="person-add" size={24} color="#4caf50" />
              <Text style={styles.optionText}>Add Members</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionItem}
              onPress={() => handleOptionSelect("View mamber")}
            >
              <Ionicons name="people" size={24} color="#2196f3" />
              <Text style={styles.optionText}>View Members</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={popupVisible}
        onRequestClose={() => {
          setPopupVisible(!popupVisible);
        }}
      >
        <View style={styles.blurBackground}>
          <View style={styles.popupView}>
            {selectedOption === "Add mamber" ? (
              <View className=" w-full h-[97%]">
                <AddMemberUI
                  tempAllUsers={tempAllUsers}
                  setPopupVisible={setPopupVisible}
                  selectedGroup={selectedGroup}
                  groups={groups}
                />
              </View>
            ) : selectedOption === "View mamber" ? (
              <View className="w-full max-h-[90%]">
                <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-200">
                  <Text className="text-xl font-bold text-gray-800">
                    Group Members ({selectedGroup?.members ? Object.keys(selectedGroup.members).length : 0})
                  </Text>
                  <TouchableOpacity onPress={() => setPopupVisible(false)}>
                    <Ionicons name="close-circle" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                  {selectedGroup?.members && Object.entries(selectedGroup.members).map(([uid, member]) => (
                    <View 
                      key={uid} 
                      className="flex-row items-center p-3 mb-2 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                        <Text className="text-green-700 font-bold text-lg">
                          {member.name ? member.name[0].toUpperCase() : '?'}
                        </Text>
                      </View>
                      
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-800">{member.name}</Text>
                        <Text className="text-sm text-gray-500">{member.phoneNumber}</Text>
                      </View>

                      <View className="flex-row items-center">
                        {member.role === 'admin' && (
                          <View className="px-2 py-1 bg-green-100 rounded-full">
                            <Text className="text-xs text-green-700 font-medium">Admin</Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                  {selectedGroup?.pendingInvitations && Object.keys(selectedGroup.pendingInvitations).length > 0 && (
                    <View className="mt-4">
                      <Text className="text-lg font-semibold text-gray-700 mb-2">
                        Pending Invitations ({Object.keys(selectedGroup.pendingInvitations).length})
                      </Text>
                      
                      {Object.entries(selectedGroup.pendingInvitations).map(([uid, member]) => (
                        <View 
                          key={uid}
                          className="flex-row items-center p-3 mb-2 bg-yellow-50 rounded-xl border border-yellow-100"
                        >
                          <View className="w-10 h-10 rounded-full bg-yellow-100 items-center justify-center mr-3">
                            <Text className="text-yellow-700 font-bold text-lg">
                              {member.invitedUserName ? member.invitedUserName[0].toUpperCase() : '?'}
                            </Text>
                          </View>
                          
                          <View className="flex-1">
                            <Text className="text-base font-semibold text-gray-800">{member.invitedUserName}</Text>
                            {/* <Text className="text-sm text-gray-500">{member.phoneNumber}</Text> */}
                          </View>

                          <View className="px-2 py-1 bg-yellow-100 rounded-full">
                            <Text className="text-xs text-yellow-700 font-medium">Pending</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}

                  {(!selectedGroup?.members || Object.keys(selectedGroup.members).length === 0) && (
                    <View className="py-8 items-center">
                      <Ionicons name="people-outline" size={48} color="#999" />
                      <Text className="text-gray-500 mt-2">No members found</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9", // Light green background color
  },
  listContainer: {
    flex: 1,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#c8e6c9",
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32", // Dark green color
  },
  groupDetails: {
    fontSize: 14,
    color: "#388e3c", // Medium green color
  },
  status: {
    fontSize: 14,
    marginTop: 4,
    color: "green",
  },
  completed: {
    color: "green",
  },
  cancelled: {
    color: "red",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4caf50", // Green color
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  blurBackground: {
    flex: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  popupView: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    zIndex: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  createButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4caf50",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f44336",
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default GroupListScreen;
