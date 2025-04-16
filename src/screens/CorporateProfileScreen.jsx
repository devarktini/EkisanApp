import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddCorporateProfile from './AddCorporateProfile';
import { useCorporate } from '../context/CorporateContext';
import { AppContext } from '../context/AppContext';
import { autoLogin } from '../services/authservice';

const CorporateProfileScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {userData} = useContext(AppContext);
  const { corporateProfile, setCorporateProfile } = useCorporate();

  useEffect(() => {
    const fetchProfileData = async () => {
        // console.log("userdddd", userData);
        try {
            // Assuming userData is available in the context or fetched from a service
            const response = await autoLogin( userData.phone ? userData.phone : userData.phoneNumber);
        if (response?.userData?.corporateData) {
          setCorporateProfile(response?.userData.corporateData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProfileData();
  }, [userData]);

  const profileData = corporateProfile;


  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center px-6">
      <View className="bg-gradient-to-b from-green-50 to-green-100 w-24 h-24 rounded-2xl items-center justify-center mb-6 shadow-sm">
        <Ionicons name="business-outline" size={40} color="#048404" />
      </View>
      <Text className="text-2xl font-bold text-gray-800 text-center mb-3">
        Welcome to Business Profile
      </Text>
      <Text className="text-gray-500 text-center mb-8 px-8 leading-6">
        Set up your corporate profile to enhance your business presence and connect with potential partners
      </Text>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="bg-green-600 px-8 py-4 rounded-xl shadow-lg"
      >
        <Text className="text-white font-bold text-lg">Create Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = (title, icon, items) => (
    <View className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden border border-gray-100">
      <View className="flex-row items-center px-5 py-4 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500">
        <View className="bg-white p-2 rounded-full shadow-sm">
          <Ionicons name={icon} size={24} color="#048404" />
        </View>
        <Text className="ml-3 text-lg font-bold text-gray-800">{title}</Text>
      </View>
      <View className="p-5">
        {items.map(({label, value}, index) => (
          <View key={index} className={`flex-row items-center py-3 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <View className="flex-1">
              <Text className="text-gray-500 text-sm mb-1">{label}</Text>
              <Text className="text-gray-800 text-base font-semibold">{value || 'Not provided'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <View className="bg-white shadow-sm">
        <View className="flex-row items-center px-4 py-4 bg-gradient-to-r from-green-50 to-white">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-white shadow-sm border border-gray-100"
          >
            <Ionicons name="arrow-back" size={24} color="#048404" />
          </TouchableOpacity>
          <Text className="flex-1 text-xl font-bold text-gray-800 text-center ml-3">
            {profileData ? 'Business Profile' : 'Create Profile'}
          </Text>
          <View className="w-10" />
        </View>
      </View>

      {/* Conditional Content */}
      {profileData ? (
        <ScrollView className="flex-1 px-4 py-4">
          {/* Company Information */}
          {renderSection('Company Details', 'business', [
            { label: 'Company Name', value: profileData.name },
            { label: 'Company Type', value: profileData.company_type },
            { label: 'GST IN', value: profileData.gst },
            { label: 'ISO Certification', value: profileData.iso },
            { label: 'Website', value: profileData.website }
          ])}

          {/* Contact Information */}
          {renderSection('Contact Information', 'person', [
            { label: 'Contact Person', value: profileData.contact_person_name },
            { label: 'Email', value: profileData.contact_person_email },
            { label: 'Phone', value: profileData.contact_person_phone }
          ])}

          {/* Address Information */}
          {renderSection('Location', 'location', [
            { label: 'Address', value: profileData.address }
          ])}
          {/* Additional Services */}
          {renderSection('Additional Services', 'settings', [
            { label: 'Agro Services', value: profileData.agro ? 'Yes' : 'No' },
            { label: 'Storage Facilities', value: profileData.storage ? 'Yes' : 'No' },
            { label: 'Agreement Signed', value: profileData.agree ? 'Yes' : 'No' }
          ])}

        </ScrollView>
      ) : (
        renderEmptyState()
      )}

      {/* Enhanced FAB */}
      {profileData && (
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          className="absolute bottom-6 right-6 bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-xl"
          style={{
            elevation: 8,
            shadowColor: '#048404',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          }}
        >
          <View className="bg-white/20 p-3 rounded-full">
            <Ionicons name="pencil" size={24} color="white" />
          </View>
        </TouchableOpacity>
      )}

      {/* Enhanced Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-11/12 bg-white rounded-2xl">
            <AddCorporateProfile 
              onClose={() => setIsModalVisible(false)}
              existingData={profileData}
              onSuccess={(data) => {
                console.log(data);
                setIsModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CorporateProfileScreen;