import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from '../../context/AppContext';
import AddProduct from '../AddProduct';

const MyAccount = ({ navigation }) => {
  const { userData, logout, loading } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onHandlerEditForms = () => {
    navigation.navigate('UpdateProfile', {
      user: userData,
      isModal: true,
      type: "edit"
    });
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}

      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <TouchableOpacity
          className="p-2 rounded-full bg-gray-50"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        
        <Text className="flex-1 text-lg font-bold text-gray-800 text-center mx-4">
          My Account
        </Text>
        
        
        
      </View>
      {/* <View className="flex-row justify-between items-center px-4 py-3 bg-white shadow-md">
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="arrow-back" size={20} color="black" />
          <Text className="text-black ml-2">Back</Text>
        </TouchableOpacity>
      </View> */}

      <ScrollView className="space-y-4">
        <View className="p-4">
          {/* <Text className="text-2xl text-center font-bold mb-6">My Account</Text> */}

          {/* User Info Section */}
          <View className="bg-white relative p-4 rounded-lg shadow flex-row items-center">
            <View className="w-24 h-24 rounded-full bg-gray-200 mr-4">
              <Image
                source={{ uri: userData?.profileImage || 'https://via.placeholder.com/150' }}
                className="w-full h-full rounded-full"
              />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold">{userData?.fullName || userData?.name || 'User Name'}</Text>
              <Text className="text-gray-500">{userData?.phoneNumber||userData?.phone || 'Phone Number'}</Text>
              <Text className="text-gray-500">{userData?.email || 'Email Address'}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsModalVisible(true)} className="bg-green-500 p-3 rounded-lg shadow-lg">
              <Text className="text-white text-sm">Add Product</Text>
            </TouchableOpacity>
          </View>

          {/* Account Settings */}
          <View className="bg-white p-6 mt-4 rounded-2xl shadow-lg">
            <View className="flex-row items-center mb-4">
              <Ionicons name="settings-outline" size={28} color="#048404" />
              <Text className="text-gray-700 ml-3 text-lg font-bold">Account Settings</Text>
            </View>

            <TouchableOpacity onPress={onHandlerEditForms} className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={28} color="#048404" />
                <Text className="text-gray-700 ml-3 font-medium">Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('notification')} className="flex-row items-center justify-between py-4">
              <View className="flex-row items-center">
                <Ionicons name="notifications-outline" size={28} color="#048404" />
                <Text className="text-gray-700 ml-3 font-medium">Notification</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Payment Section */}
          <View className="bg-white p-6 mt-4 rounded-2xl shadow-lg">
            <View className="flex-row items-center mb-4">
              <Ionicons name="wallet-outline" size={28} color="#048404" />
              <Text className="text-gray-700 ml-3 text-lg font-bold">Order</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('order')} className="flex-row items-center justify-between py-4">
              <View className="flex-row items-center">
                <Ionicons name="cart-outline" size={28} color="#048404" />
                <Text className="text-gray-700 ml-3 font-medium">My Orders</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('recivedOrder')} className="flex-row items-center justify-between py-4">
              <View className="flex-row items-center">
                <Ionicons name="cart-outline" size={28} color="#048404" />
                <Text className="text-gray-700 ml-3 font-medium">Received Orders</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Help & Support */}
          <View className="bg-white p-6 mt-4 rounded-2xl shadow-lg">
            <View className="flex-row items-center mb-4">
              <Ionicons name="help-buoy-outline" size={28} color="#048404" />
              <Text className="text-gray-700 ml-3 text-lg font-bold">Help & Support</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('f&q')} className="flex-row items-center justify-between py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={28} color="#048404" />
                <Text className="text-gray-700 ml-3 font-medium">FAQs</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('contactSupport')} className="flex-row items-center justify-between py-4">
              <View className="flex-row items-center">
                <Ionicons name="chatbubble-ellipses-outline" size={28} color="#048404" />
                <Text className="text-gray-700 ml-3 font-medium">Contact Support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity onPress={() => logout(navigation)} className="bg-red-500 p-4 rounded-xl mt-6 shadow-lg mb-10">
            <View className="flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={28} color="white" />
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.logoutButtonText}>Logout</Text>}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Product Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AddProduct setIsModalVisible={setIsModalVisible} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '90%', height: '95%', backgroundColor: 'white', borderRadius: 10, padding: 10, alignItems: 'center' },
  closeButton: { backgroundColor: '#048404', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
  closeButtonText: { color: 'white', fontWeight: 'bold' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
