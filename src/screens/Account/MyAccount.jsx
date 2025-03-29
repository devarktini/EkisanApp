import React, { useContext, useState } from 'react'
import {View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet} from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { AppContext } from '../../context/AppContext';
import AddProduct from '../AddProduct';

const MyAccount = ({navigation}) => {
    const {userData}= useContext(AppContext)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const onHandlerEditForms= () => {
        navigation.navigate('UpdateProfile', {
            user: userData,
            isModal: true,
            type:"edit"
        });
    }
  return (
    <View>
        <View className="flex-row justify-between items-center px-4 py-3 bg-white shadow-md">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() =>  navigation.navigate("Main")}
          >
            <Ionicons name="arrow-back" size={16} color="black" />
            <Text className="text-black ml-1">Back</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
           
            className="bg-green-500 px-4 py-2 rounded-full"
          >
            <Text className="text-white">Add Farm</Text>
          </TouchableOpacity> */}
        </View>
        <ScrollView  className="space-y-4 mt-4">
        <View className="p-4 ">
          <Text className="text-2xl font-bold mb-6">My Account</Text>
          
          <View className="space-y-4 mb-10 ">
            {/* User Information Section */}
            <View className="bg-white relative p-4 rounded-lg shadow items-center">
              <View className="w-24 h-24 rounded-full bg-gray-200 mb-4">
                <Image 
                  source={{uri: userData?.profileImage || 'https://via.placeholder.com/150'}}
                  className="w-full h-full rounded-full"
                />
              </View>
              <Text className="text-xl font-bold">{userData?.fullName || 'User Name'}</Text>
              <Text className="text-gray-500 mb-2">{userData?.phoneNumber || 'Phone Number'}</Text>
              <Text className="text-gray-500">{userData?.email || 'Email Address'}</Text>
              <TouchableOpacity 
                onPress={() => setIsModalVisible(true)} // Show modal on button press
                className="absolute bottom-0 p-4 right-0 bg-green-500 m-4 rounded-full shadow-lg"
              >
                <Ionicons name="add" size={20} color="white" />
                {/* <View className="absolute top-10 right-0 bg-black p-2 rounded-md">
                  <Text className="text-white text-xs">Add New</Text>
                </View> */}
              </TouchableOpacity>
            </View>
           
              {/* Account Settings Section */}
              <View className="bg-white p-6 mt-4 rounded-2xl shadow-lg">
                <View className="flex-row items-center mb-4">
                  <Ionicons name="settings-outline" size={24} color="#048404" />
                  <Text className="text-lg font-bold ml-2">Account Settings</Text>
                </View>
                <TouchableOpacity onPress={()=>onHandlerEditForms()} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Ionicons name="person-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">Edit Profile</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
                {/* <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Ionicons name="lock-closed-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">Change Password</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={()=>navigation.navigate('notification')} className="flex-row items-center justify-between py-4">
                  <View className="flex-row items-center">
                    <Ionicons name="notifications-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">Notification</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Payment Section */}
              <View className="bg-white p-6 mt-2 rounded-2xl shadow-lg">
                <View className="flex-row items-center mb-4">
                  <Ionicons name="wallet-outline" size={24} color="#048404" />
                  <Text className="text-lg font-bold ml-2">Payment</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('order')} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Ionicons name="cart-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">My Orders</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center justify-between py-4">
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">Products History</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Help & Support Section */}
              <View className="bg-white p-6 rounded-2xl mt-2 shadow-lg">
                <View className="flex-row items-center mb-4">
                  <Ionicons name="help-buoy-outline" size={24} color="#048404" />
                  <Text className="text-lg font-bold ml-2">Help & Support</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate('f&q')} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Ionicons name="help-circle-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">FAQs</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>navigation.navigate('contactSupport')} className="flex-row items-center justify-between py-4 border-b border-gray-100">
                  <View className="flex-row items-center">
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">Contact Support</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('privicyPolicy')} className="flex-row items-center justify-between py-4">
                  <View className="flex-row items-center">
                    <Ionicons name="document-text-outline" size={20} color="#666" />
                    <Text className="text-gray-700 ml-3 font-medium">Terms & Privacy Policy</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Logout Button */}
              <TouchableOpacity className="bg-red-500 p-4  rounded-xl mt-6 shadow-lg mb-10">
                <View className="flex-row items-center justify-center">
                  <Ionicons name="log-out-outline" size={24} color="white" />
                  <Text className="text-white text-lg font-bold ml-2">Logout</Text>
                </View>
              </TouchableOpacity>
            
          </View>

        </View>
        </ScrollView>

        <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
           <AddProduct />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)} // Close modal on button press
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#048404',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});