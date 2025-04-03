import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getOrderTrackDetails, sendMessage, updateRequestStatus } from '../services/TrackOrderService';

const { width } = Dimensions.get('window');

const TrackOrderScreen = ({ navigation, route }) => {
  const { orderDetails } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [orderTrackData, setOrderTrackData] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [isShipped, setIsShipped] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fetchOrderTrack = async () => {
    try {
      const response = await getOrderTrackDetails(orderDetails.id);
      console.log('Track Details:', response);
      setOrderTrackData(response);

      // Check if response has requests array with messages
      if (response?.requests && response.requests.length > 0) {
        const latestRequest = response.requests[0]; // Get the most recent request

        if (latestRequest.messages) {
          // Transform messages object into array
          const messagesArray = Object.entries(latestRequest.messages).map(([id, message]) => ({
            id,
            ...message,
            timestamp: new Date(message.timestamp).toLocaleString(),
          })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          setMessages(messagesArray);
          console.log('Processed Messages:', messagesArray);
        }
      }
    } catch (error) {
      console.error('Error fetching order track details:', error);
      // Optionally show an error message to the user
      Alert.alert('Error', 'Failed to fetch order tracking details');
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const messageData = {
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        admin: false,
        userId: orderDetails.item.sellerUID
      };
      console.log("messageData", messageData)
      console.log("orderDetails", orderDetails)
      await sendMessage(orderTrackData?.orderTrackId, messageData);
      setNewMessage(''); // Clear input after successful send
      fetchOrderTrack();
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusUpdate = async (status) => {
    try {
      await updateRequestStatus(orderTrackData?.orderTrackId, status);
      setOrderStatus(status);
      Alert.alert('Success', `Order ${status.toLowerCase()} successfully`);
      fetchOrderTrack();
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrderTrack();
    
    // Update order status when orderTrackData changes
    if (orderTrackData?.requests && orderTrackData.requests.length > 0) {
      const latestRequest = orderTrackData.requests[0];
      setOrderStatus(latestRequest.status);
      setIsShipped(latestRequest.isShipped);
    }
  }, [orderDetails.id]);

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageCard,
      item.admin === false ? styles.messageCardRight : styles.messageCardLeft
    ]}>
      <Text style={[
        styles.messageText,
        item.admin === false ? styles.messageTextRight : styles.messageTextLeft
      ]}>
        {item.message}
      </Text>
      <Text style={[
        styles.messageTimestamp,
        item.admin === false ? styles.timestampRight : styles.timestampLeft
      ]}>
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 16, paddingHorizontal: 20, elevation: 4, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ flex: 1, fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>Track Order</Text>
      </View>

      {/* Order Summary */}
      <View style={{ backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
        <Text style={{ fontSize: 16, color: '#333', fontWeight: '600', marginBottom: 12 }}>Order #{orderDetails?.id}</Text>
        <View style={{ borderLeftWidth: 4, borderColor: '#048404', paddingLeft: 16, marginVertical: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 8 }}>{orderDetails.item.name}</Text>
          <Text style={{ fontSize: 16, color: '#666', lineHeight: 22 }}>quantity {orderDetails.quantity} • Price ₹{orderDetails.item.price}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.statusText,
            { color: orderStatus === 'Delivered' ? '#43a047' : '#048404' }
          ]}>
            • {orderStatus}
          </Text>
          {isShipped && (
            <Text style={styles.shippedText}>
              <Ionicons name="car-outline" size={16} color="#1976d2" /> Shipped
            </Text>
          )}
        </View>
        <Text style={{ fontSize: 16, color: '#333', fontWeight: '600', marginBottom: 2 }}>TrackId #{orderTrackData?.orderTrackId}</Text>
      </View>
      {/* Messages */}
      <View style={styles.messagesContainer}>
        <Text style={styles.sectionTitle}>Updates</Text>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
        />
      </View>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusUpdate('Accepted')}
          >
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color="#048404" 
            />
            <Text style={styles.actionButtonText}>
              Accept
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusUpdate('Rejected')}
          >
            <Ionicons 
              name="close-circle" 
              size={24} 
              color="#e53935" 
            />
            <Text style={styles.actionButtonText}>
              Reject
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusUpdate('Shipped')}
          >
            <Ionicons 
              name="car" 
              size={24} 
              color="#1976d2" 
            />
            <Text style={styles.actionButtonText}>
              Ship
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStatusUpdate('Delivered')}
          >
            <Ionicons 
              name="checkmark-done-circle" 
              size={24} 
              color="#43a047" 
            />
            <Text style={styles.actionButtonText}>
              Deliver
            </Text>
          </TouchableOpacity>
        </View>
        <View className=" flex flex-row items-center justify-between">
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !newMessage && styles.sendButtonDisabled
            ]}
            disabled={!newMessage || isSending}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={24} color={newMessage ? '#fff' : '#ccc'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#048404',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  actionButtonTextDisabled: {
    color: '#ccc',
  },
  orderSummary: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderId: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 12,
  },
  productInfo: {
    borderLeftWidth: 4,
    borderColor: '#048404',
    paddingLeft: 16,
    marginVertical: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDetails: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  messagesContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageList: {
    paddingVertical: 8,
  },
  messageCard: {
    maxWidth: '85%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  messageCardLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 4,
  },
  messageCardRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#048404',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  messageTextLeft: {
    color: '#333',
  },
  messageTextRight: {
    color: '#fff',
  },
  messageTimestamp: {
    fontSize: 11,
    color: '#888',
    marginTop: 6,
    textAlign: 'right',
  },
  timestampLeft: {
    color: '#888',
  },
  timestampRight: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'col',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 15,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#048404',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  rightAlignedTextContainer: {
    position: 'absolute',
    top: '50%',
    right: 16,
  },
  rightAlignedText: {
    fontSize: 16,
    color: '#048404',
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  shippedText: {
    fontSize: 14,
    color: '#1976d2',
    marginLeft: 8,
  },
});

export default TrackOrderScreen;