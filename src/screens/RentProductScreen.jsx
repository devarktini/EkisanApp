import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back button icon
import { Picker } from '@react-native-picker/picker'; // For dropdown picker

const RentProductScreen = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rentDuration, setRentDuration] = useState('');

  const handleSubmit = () => {
    console.log({
      category,
      productName,
      description,
      rentPrice,
      quantity,
      rentDuration,
    });
    // Add form submission logic here
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rent Product</Text>
      </View>

      {/* Form Content */}
      <ScrollView style={styles.content}>
        {/* Product Image Section */}
        <TouchableOpacity style={styles.imageButton}>
          <Ionicons name="camera-outline" size={40} color="#048404" />
          <Text style={styles.imageButtonText}>Add Product Image</Text>
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Tractors" value="tractors" />
              <Picker.Item label="Harvesters" value="harvesters" />
              <Picker.Item label="Ploughs" value="ploughs" />
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
              <Picker.Item label="1 Day" value="1_day" />
              <Picker.Item label="1 Week" value="1_week" />
              <Picker.Item label="1 Month" value="1_month" />
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