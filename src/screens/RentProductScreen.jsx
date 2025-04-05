import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { Picker } from '@react-native-picker/picker'; // For dropdown picker
import * as ImagePicker from 'expo-image-picker'; // For image selection
import { AppContext } from '../context/AppContext';
import { sendItemToVerification, sendRentItemForVerification } from '../services/productService';

const RentProductScreen = ({ navigation }) => {
  const {userData}= useContext(AppContext)
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rentDuration, setRentDuration] = useState('');
  const [image, setImage] = useState(null);

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

  // const handleSubmit = async() => {
  //   if (!productName || !rentPrice || !quantity || !rentDuration || !category) {
  //     Alert.alert('Error', 'Please fill in all required fields.');
  //     return;
  //   }

  //   const formData = {
  //     category,
  //     productName,
  //     description,
  //     rentPrice,
  //     quantity,
  //     rentDuration,
  //     image,
  //   };
  //   const rentProductData = {
  //     ...formData,
  //     rentPrice: Number(formData.rentPrice),
  //     quantity: Number(formData.quantity),
  //     createdAt: Date.now(),
  //     isRented: userData?.userType === 'farmer' ? true : false,
  //     userType: userData?.userType,
  //   };

  //   const result = await sendItemToVerification({
  //     user: userData,
  //     itemData: rentProductData,
  //     productImage: image
  //   });

  


 
  //   Alert.alert('Success', 'Product submitted successfully!');
  //   // Add form submission logic here
  // };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!productName || !rentPrice || !quantity || !rentDuration || !category) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
  
      // Ensure the productName field is properly set
      if (!productName) {
        Alert.alert('Error', 'Product name is required.');
        return;
      }
  
      const formData = {
        category,
        productName,
        description,
        rentPrice,
        quantity,
        rentDuration,
        image,
        
      };
  
      const rentProductData = {
        ...formData,
        rentPrice: Number(formData.rentPrice),
        quantity: Number(formData.quantity),
        createdAt: Date.now(),
        isRented: userData?.userType === 'farmer' ? true : false,
        userType: userData?.userType,
      };
  
   
  
      // Send data to verification
      const result = await sendRentItemForVerification({
        user: userData,
        itemData: rentProductData,
        productImage: image,
      });
     
  
      if (result?.success) {
        Alert.alert('Success', 'Product submitted successfully!');
        // Reset the form
        setCategory('');
        setProductName('');
        setDescription('');
        setRentPrice('');
        setQuantity('');
        setRentDuration('');
        setImage(null);
      } else {
        Alert.alert('Error', result?.message || 'Failed to submit the product. Please try again.');
      }
    } catch (error) {
      console.error('Error in sendItemToVerification:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <TouchableOpacity
          className="p-2 rounded-full bg-gray-50"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#048404" />
        </TouchableOpacity>
        
        <Text className="flex-1 text-lg font-bold text-gray-800 text-center mx-4">
        Rent Product
        </Text>
        
      </View>
      {/* <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rent Product</Text>
      </View> */}

      {/* Form Content */}
      <ScrollView style={styles.content}>
        {/* Product Image Section */}
        <TouchableOpacity style={styles.imageButton} onPress={handleImageUpload}>
          {image ? (
            <Image source={{ uri: image.uri }} style={styles.imagePreview} />
          ) : (
            <>
              <Ionicons name="camera-outline" size={40} color="#048404" />
              <Text style={styles.imageButtonText}>Add Product Image</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Category */}
          <Text style={styles.label}>Category *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Farm Machinery" value="Farm Machinery" />
            </Picker>
          </View>

          {/* Product Name */}
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            value={productName}
            onChangeText={setProductName}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="About the product (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          {/* Rent Price */}
          <Text style={styles.label}>Rent Price *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rent price"
            value={rentPrice}
            onChangeText={setRentPrice}
            keyboardType="numeric"
          />

          {/* Quantity */}
          <Text style={styles.label}>Quantity *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          {/* Rent Duration */}
          <Text style={styles.label}>Rent Duration *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rentDuration}
              onValueChange={(itemValue) => setRentDuration(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Rent Duration" value="" />
              <Picker.Item label="Hours" value="hour" />
              <Picker.Item label="Day" value="day" />
              <Picker.Item label="Week" value="week" />
              <Picker.Item label="Month" value="month" />
            </Picker>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RentProductScreen;

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
  content: {
    padding: 16,
  },
  imageButton: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#048404',
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  submitButton: {
    marginBottom: 40,
    backgroundColor: '#048404',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});