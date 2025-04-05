import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { submitUserQuery, getUserExpertMessages } from '../services/expertChatService';

const TalkToExpert = ({ navigation }) => {
  const { user, userData } = useContext(AppContext);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your gallery to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!description || !image) {
      Alert.alert('Error', 'Please provide a description and select an image.');
      return;
    }

    const response = await submitUserQuery(userData, description, image);

    if (response.success) {
      Alert.alert('Request Submitted Successfully');
      setDescription('');
      setImage(null);
      setIsPopupVisible(false); // Close the popup after submission
      fetchMessages(); // Refresh the message list
    } else {
      Alert.alert('Error', response.message || 'Failed to submit query.');
    }
  };

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getUserExpertMessages(userData.uid || userData.userId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching expert messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userData]);

  const renderMessageItem = ({ item }) => (
    <View style={styles.messageCard}>
      <Text style={styles.messageText}>{item.message}</Text>
      {item.imgUrl && <Image source={{ uri: item.imgUrl }} style={styles.messageImage} />}
      <Text style={styles.messageTimestamp}>{new Date(item.timeStamp).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        {/* <ImageBackground
          source={require('../assets/homeBackground.webp')}
          style={styles.headerBackground}
        > */}
          <View style={styles.headerOverlay}>
            <View style={styles.headerContainer}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.header}>Talk to Expert</Text>
              <View></View>
            </View>
          </View>
        {/* </ImageBackground> */}
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
            <Text style={styles.noMessagesText}>No messages available.</Text>
            <Text style={styles.noMessagesSubText}>Start a conversation with our experts!</Text>
          </View>
        )}
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setIsPopupVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Query Modal */}
      <Modal
        visible={isPopupVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPopupVisible(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your query or description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.imageUpload} onPress={handleImageUpload}>
              {image ? (
                <Image source={{ uri: image.uri }} style={styles.image} />
              ) : (
                <Text style={styles.imageUploadText}>Select Image</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsPopupVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerWrapper: {
    height: 60,
    backgroundColor: 'white',
  },
  headerBackground: {
    flex: 1,
    width: '100%',
  },
  headerOverlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  noMessagesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  noMessagesSubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  messageList: {
    paddingBottom: 16,
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  messageImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popup: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  imageUpload: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageUploadText: {
    color: '#aaa',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default TalkToExpert;