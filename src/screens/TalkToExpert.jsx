import React, { useContext, useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
  FlatList,
  Modal,
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
    console.log('Response:', response);

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
    <ImageBackground
      source={require('../assets/homeBackground.webp')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Back Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.header}>Get Expert Help</Text>
        </View>

        {/* Message List */}
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessageItem}
            contentContainerStyle={styles.messageList}
          />
        ) : (
          <Text style={styles.noMessagesText}>No messages available. Submit your query below.</Text>
        )}

        {/* Floating Add Button */}
        {messages.length > 0 && (
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setIsPopupVisible(true)}
          >
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        )}

        {/* Popup for Input Box and Submit Button */}
        <Modal
          visible={isPopupVisible || messages.length === 0}
          transparent
          animationType="slide"
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  noMessagesText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  messageList: {
    paddingBottom: 80,
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
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
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4caf50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
});

export default TalkToExpert;