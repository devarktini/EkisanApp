import React, { useContext, useEffect, useState } from 'react';
import { 
  View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, 
  KeyboardAvoidingView, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import logo from "../assets/icon.png";
import { fetchGroupById } from '../services/Message/fetchGroupById';
import { sendMessage } from '../services/Message/sendMessage';
import { AppContext } from '../context/AppContext';

const GroupChatScreen = ({ route }) => {
  const { userData } = useContext(AppContext);
  const [groupChatData, setGroupChatData] = useState([]);
  const [admin, setAdmin] = useState({});
  const [messageText, setMessageText] = useState('');

  const navigation = useNavigation();

  // Fetch group chat data
  const fetchGroupData = async (groupId) => {
    try {
      const groupDetails = await fetchGroupById(groupId);
      setAdmin(groupDetails.createdBy);
      setGroupChatData(groupDetails);
    } catch (error) {
      console.error("Error fetching group data:", error);
    }
  };

  useEffect(() => {
    if (route.params && route.params.groupId) {
      const { groupId } = route.params;
      fetchGroupData(groupId);
      const interval = setInterval(() => {
        fetchGroupData(groupId);
      }, 1000); // Fetch messages every 5 seconds

      return () => clearInterval(interval);
    } else {
      console.warn("No groupId found in route params");
    }
  }, [route.params]);

  // Handle sending message (Dummy function for now)
  const handleSendMessage = async () => {
    if (messageText.trim()) {
      await sendMessage(groupChatData.id, messageText, userData);
      setMessageText('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={logo} style={styles.groupAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.groupName}>{groupChatData.name}</Text>
          <Text style={styles.members}>{groupChatData.description}</Text>
        </View>
      </View>

      {/* Message List */}
      <FlatList
        data={groupChatData.messages ? Object.entries(groupChatData.messages) : []}
        keyExtractor={([messageId]) => messageId}
        renderItem={({ item }) => {
          const [messageId, message] = item;
          return (
            <View 
              key={messageId} 
              style={[
                styles.messageItem, 
                message.sender.uid === admin.uid ?styles.selfMessage : styles.otherMessage
              ]}
            >
              <View style={styles.messageHeader}>
                <Text style={styles.sender}>{message.sender.name}</Text>
              </View>
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestamp}>{new Date(message.createdAt).toLocaleString()}</Text>
            </View>
          );
        }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} 
      />

      {/* Input Field (Fixed at Bottom) */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter message..." 
          value={messageText} 
          onChangeText={setMessageText} 
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7e6', // Light green background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#4caf50', // Green color
    borderBottomWidth: 1,
    borderBottomColor: '#a5d6a7',
  },
  backButton: {
    marginRight: 10,
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  members: {
    fontSize: 14,
    color: '#fff',
    marginTop: 2,
  },
  messageItem: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 8,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selfMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#c8e6c9', // Light green for self messages
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a5d6a7',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2e7d32',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    marginTop: 5,
    fontSize: 12,
    color: '#689f38',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#a5d6a7',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#81c784',
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#4caf50',
    borderRadius: 25,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default GroupChatScreen;
