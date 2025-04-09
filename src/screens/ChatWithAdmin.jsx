import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext } from '../context/AppContext';
import { getAdminMessages, sendAdminMessage } from '../services/Message/sendMessage';

const ChatWithAdmin = ({navigation}) => {
    const { userData } = useContext(AppContext);
   
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hello , Welcome to the eKisan Darshan family! We're here to help you with Agricultural farming and solutions",
      sender: 'receiver',
    },
  ]);

  const scrollRef = useRef();

  const handleSend = async () => {
    if (message.trim() === '') return;
    

    try {
      const newMessage = await sendAdminMessage(userData.uid || userData.userId, message, userData.name || userData.fullName);
      setChatMessages([...chatMessages, { ...newMessage, sender: 'user' }]);
      setMessage('');

      // Optionally scroll to the bottom
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // console.log("sssssssss")
        const messages = await getAdminMessages(userData.uid || userData.userId);
        setChatMessages(messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [userData]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => alert('Back pressed')}>
          <Ionicons name="arrow-back" size={24} color="white" style={styles.backIcon} />
          {/* <Text style={styles.backText}>Back</Text> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>Chat with eKisan Darshan</Text>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{ padding: 16 }}
        ref={scrollRef}
      >
        {chatMessages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'sender' ? styles.leftAlign : styles.rightAlign,
              msg.sender === 'sender' ? styles.senderBubble : styles.receiverBubble,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatWithAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  header: {
    backgroundColor: '#3979F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 10,
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
    marginVertical: 4,
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  rightAlign: {
    alignSelf: 'flex-end',
  },
  senderBubble: {
    backgroundColor: '#CBE2FF', // Light Blue for sender
  },
  receiverBubble: {
    backgroundColor: '#DCF8C6', // Light green for receiver
  },
  messageText: {
    color: '#1F2D3D',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#E7F0FF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 14,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3979F7',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendText: {
    color: 'white',
    fontWeight: '600',
  },
});