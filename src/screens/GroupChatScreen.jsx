import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import image from '../assets/userProfile.png'

const messages = [
  { id: '1', sender: 'Pete Martell', text: 'I do not think you could find a mammoth. They have long been extinct.', timestamp: '12:09 AM', senderType: 'other' },
  { id: '2', sender: 'Misha Kazancev', text: 'I think she can.', timestamp: '12:09 AM', senderType: 'self' },
  // Add more messages here
];

const GroupChatScreen = ({ route }) => {
  const navigation = useNavigation();
  const { groupId } = route.params;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Image source={image} style={styles.groupAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.groupName}>Group Name</Text>
          <Text style={styles.members}>Members: John Doe, Jane Smith, Bob Johnson</Text>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageItem, item.senderType === 'self' ? styles.selfMessage : styles.otherMessage]}>
            <View style={styles.messageHeader}>
              <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
              <Text style={styles.sender}>{item.sender}</Text>
            </View>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Enter message..." />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f7e6', // Light green background color
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
  messageList: {
    paddingVertical: 10,
  },
  messageItem: {
    padding: 10,
    marginVertical: 8,
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
    backgroundColor: '#c8e6c9', // Lighter green for self messages
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a5d6a7', // Green border
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2e7d32', // Dark green color for sender name
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    marginTop: 5,
    fontSize: 12,
    color: '#689f38', // Olive green for timestamp
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
    backgroundColor: '#4caf50', // Fresh green color
    borderRadius: 25,
    padding: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    transform: [{ scale: 1.02 }], // Slightly larger button
  },
});

export default GroupChatScreen;