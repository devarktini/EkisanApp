
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, FAB } from "react-native-paper";
import image from "../assets/userProfile.png";
import { AppContext } from "../context/AppContext";
import { sendGroupInvitation } from "../services/Message/sendGroupInvitation";

const AddMemberUI = ({ setPopupVisible, tempAllUsers, selectedGroup }) => {
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { userData } = useContext(AppContext);

  const toggleSelectContact = async (contact) => {
    if (selectedContacts.some((item) => item.uid === contact.uid)) {
      setSelectedContacts(selectedContacts.filter((item) => item.uid !== contact.uid));
    } else {
      setSelectedContacts([...selectedContacts, contact]);

      // Send Invitation
      await sendGroupInvitation(selectedGroup.id, contact.userId || contact.uid, userData);
    }
  };

  const removeSelectedContact = (uid) => {
    setSelectedContacts(selectedContacts.filter((item) => item.uid !== uid));
  };

  const filteredContacts = tempAllUsers.filter(
    (contact) =>
      contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.phoneNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.phone?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 2, backgroundColor: "#f5f5f5", width: "100%",  height:'97%', }}>
      
      {/* Search Bar */}
      <View style={{ flexDirection: "row", backgroundColor: "#ddd", padding: 8, borderRadius: 20, alignItems: "center" }}>
        <Ionicons name="search" size={20} color="#555" style={{ marginHorizontal: 2 }} />
        <TextInput
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
          style={{ flex: 1, fontSize: 16 }}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Ionicons name="close-circle" size={20} color="#555" style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Selected Contacts */}
      {/* {selectedContacts.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 4, marginTop: 10 }}>
          {selectedContacts.map((contact) => (
            <View key={contact.uid} style={{ alignItems: "center", marginRight: 10 }}>
              <Avatar.Image size={50} source={contact.image} />
              <Text style={{ fontSize: 12 }}>{contact?.name?.split(" ")[0] || contact?.fullName?.split(" ")[0]}</Text>
              <TouchableOpacity
                onPress={() => removeSelectedContact(contact.uid)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "red",
                  borderRadius: 12,
                  padding: 3,
                }}
              >
                <Ionicons name="arrow-forward-circle" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )} */}

      {/* Contact List */}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item?.uid.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelectContact(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 8,
              backgroundColor: "#fff",
              marginVertical: 4,
              borderRadius: 8,
              
            }}
          >
            <Avatar.Image size={50} source={item?.image} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.fullName || item?.name}</Text>
              <Text style={{ fontSize: 14, color: "#555" }}>{item?.phone || item.phoneNumber}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleSelectContact(item)}>
              <Ionicons name="send-outline" size={20} color="green" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <FAB
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          backgroundColor: "orange",
        }}
        icon="close"
        onPress={() => setPopupVisible(false)}
      />
    </View>
  );
};

export default AddMemberUI;
