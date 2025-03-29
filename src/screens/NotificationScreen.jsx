import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon

const notifications = [
  {
    id: '1',
    title: 'Order Confirmed',
    description: 'Your order #12345 has been confirmed.',
    time: '2 hours ago',
    targetScreen: 'OrderDetails', // Target screen for navigation
  },
  {
    id: '2',
    title: 'Payment Successful',
    description: 'Your payment for order #12345 was successful.',
    time: '1 day ago',
    targetScreen: 'PaymentHistory', // Target screen for navigation
  },
  {
    id: '3',
    title: 'Delivery Scheduled',
    description: 'Your order #12345 is scheduled for delivery tomorrow.',
    time: '2 days ago',
    targetScreen: 'DeliveryDetails', // Target screen for navigation
  },
  {
    id: '4',
    title: 'New Offer Available',
    description: 'Check out our latest offers on fresh produce!',
    time: '3 days ago',
    targetScreen: 'Offers', // Target screen for navigation
  },
];

const NotificationScreen = ({ navigation }) => {
  const renderNotificationCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.cardTime}>{item.time}</Text>
      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => navigation.navigate(item.targetScreen)}
      >
        <Text style={styles.cardButtonText}>View Details</Text>
      </TouchableOpacity>
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

      {/* Notification List */}
      <FlatList
        data={notifications}
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
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#666',
    marginBottom: 8,
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  cardButton: {
    width:'40%',
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
});