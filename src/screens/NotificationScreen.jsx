import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { AppContext } from '../context/AppContext';
import { Picker } from '@react-native-picker/picker';
import { set } from 'firebase/database';
import { deleteNotification } from '../services/notification/notificationService';
import { getUserNotifications } from '../services/userService';
import { useProgress } from '../context/ProgressContext';
import { addUserToGroupInFirebase } from '../services/groupService';

const NotificationScreen = ({ navigation }) => {
  const { startProgress, stopProgress, updateProgress } = useProgress();
  const { userData } = useContext(AppContext);
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const fetchNotifications = async (uid) => {
    try {
      const data = await getUserNotifications(uid);
      setNotifications(data);
      setFilteredNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (userData && userData.notifications) {
      const uid = userData.userId || userData.uid;
      setUserId(userData.userId || userData.uid);
      fetchNotifications(uid);
      const convertedArray = Object.keys(userData.notifications).map((key) => ({
        id: key,
        ...userData.notifications[key],
      }));
  
      const sortedArray = convertedArray.sort(
        (a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt)
      );
  
      setNotifications(sortedArray);
      setFilteredNotifications(sortedArray);
    }
  }, [userData]);

  useEffect(() => {
    if (selectedFilter === 'All') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(
        notifications.filter(item => item.type === selectedFilter.toLowerCase())
      );
    }
  }, [selectedFilter, notifications]);

  const simulateLoading = () => {
    startProgress();
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      updateProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        progress = 0;
      }
    }, 300);
  };

  const handleNotificationClick = async (item) => {
    if (item.type.toLowerCase() === 'product') {
     
    } else if (item.type.toLowerCase() === 'order') {
      navigation.navigate('order', { orderId: item.orderId });
    } else if (item.type.toLowerCase() === 'group_invitation') {
      const groupData  = {
        "timestamp": Date.now().toString(),
        "name": item.groupName,
        "role": "member"
      }
      Alert.alert(
        "Join Group?",
        `Do you want to join ${item.groupName}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          { text: "OK", onPress: async () => {
            simulateLoading();
            try {
              await addUserToGroupInFirebase(userId, item.groupId, groupData);
              await deleteNotification(userId, item.id);
              await fetchNotifications(userId);
            } catch (error) {
              console.error("Failed to join group:", error);
            } finally {
              stopProgress();
            }
          } },
        ]
      );
    } else if (item.type.toLowerCase() === 'experts-reply') {
      navigation.navigate('TalkToExpert');
    } else if (item.type.toLowerCase() === 'other') {
      navigation.navigate('myStore');
    }
  };

  const handleNotificationDelete = async (item) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "OK", onPress: async () => {
          simulateLoading();
          await deleteNotification(userId, item.id);
          await fetchNotifications(userId);
          stopProgress();
        } },
      ]
    );
    
    
  };

  const getButtonText = (type) => {
    switch (type) {
      case 'order':
        return 'Order';
      case 'group_invitation':
        return 'Accept Invitation';
      case 'product':
        return 'View Product';
      case 'experts-reply':
        return 'View Message';
      case 'other':
        return 'View Details';
      default:
        return 'Unknown';
    }
  };

  const renderNotificationCard = ({ item }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor:
            item.type === 'order'
              ? '#C6F7D0'
              : item.type === 'group_invitation'
              ? '#F7DC6F'
              : item.type === 'product'
              ? '#F5B7B1'
              : '#fff',
        },
      ]}
    >
      {item.type !== 'experts-reply' ? (
        <>
          <Text style={styles.cardTitle}>{item.title || item.groupName}</Text>
          <Text style={styles.cardDescription}>{item.description || item.invitedBy}</Text>
        </>
      ) : (
        <>
          <Text style={styles.cardTitle}>{ item.reply}</Text>
          <Text style={styles.cardDescription}>{item.replyedTo}</Text>
        </>
      )}
      <Text style={styles.cardTime}>
        {new Date(item.timestamp || item.createdAt).toLocaleString()}
      </Text>
      <View style={styles.cardButtonContainer}>
        {getButtonText(item.type) !== 'View Product' ? (
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => handleNotificationClick(item)}
          >
            <Text style={styles.cardButtonText}>{getButtonText(item.type)}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }} />
        )}
        <TouchableOpacity
          style={[styles.cardDeleteButton, { marginLeft: 'auto' }]}
          onPress={() => handleNotificationDelete(item)}
        >
          <Ionicons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Filter Dropdown */}

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(itemValue) => setSelectedFilter(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="Order" value="Order" />
          <Picker.Item label="Group Invitation" value="group_invitation" />
          <Picker.Item label="Product" value="Product" />
        </Picker>
      </View>

      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationCard}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  picker: {
    borderColor: '#ddd',
    borderWidth: 1,
    height: 40,
    width: '100%',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  cardButton: {
    width: '40%',
    marginTop: 8,
    backgroundColor: '#048404',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardDeleteButton: {
    marginLeft: 8,
  },
});
