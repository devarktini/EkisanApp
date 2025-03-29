import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const AddProduct = () => {
  const [isOrganic, setIsOrganic] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const toggleSwitch = () => setIsOrganic((previousState) => !previousState);

  const handleSingleImagePick = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1, // Limit to a single image
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Selected Image: ', response.assets[0]);
        setSelectedImages([response.assets[0]]);
      }
    });
  };

  const handleMultipleImagePick = () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 0, // Allow multiple images
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        console.log('Selected Images: ', response.assets);
        setSelectedImages(response.assets);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      {/* Upload Buttons */}
      <TouchableOpacity onPress={handleSingleImagePick} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Add Product Image</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMultipleImagePick} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Upload Multiple Images</Text>
      </TouchableOpacity>

      {/* Product Category Dropdown */}
      <Text style={styles.label}>Product Category *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Fruits" value="fruits" />
          <Picker.Item label="Vegetables" value="vegetables" />
          <Picker.Item label="Grains" value="grains" />
        </Picker>
      </View>

      {/* Product Name Dropdown */}
      <Text style={styles.label}>Product Name *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedProduct}
          onValueChange={(itemValue) => setSelectedProduct(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a product" value="" />
          <Picker.Item label="Apple" value="apple" />
          <Picker.Item label="Banana" value="banana" />
          <Picker.Item label="Carrot" value="carrot" />
        </Picker>
      </View>

      {/* Quantity */}
      <Text style={styles.label}>Quantity *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the available quantity to sell"
        keyboardType="numeric"
      />

      {/* Variety / Make */}
      <Text style={styles.label}>Variety / Make</Text>
      <TextInput style={styles.input} placeholder="eg: Kesar" />

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="About your product specifications (Eg:- Taste, Size, Variety, Color, Special Features, etc.)"
        multiline
        numberOfLines={4}
      />

      {/* Price and Unit */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            placeholder="eg: 290"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Unit *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedUnit}
              onValueChange={(itemValue) => setSelectedUnit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a unit" value="" />
              <Picker.Item label="Kg" value="kg" />
              <Picker.Item label="Litre" value="litre" />
              <Picker.Item label="Dozen" value="dozen" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Market Price */}
      <Text style={styles.label}>Market Price *</Text>
      <TextInput
        style={styles.input}
        placeholder="Add market price or maximum retail price"
        keyboardType="numeric"
      />

      {/* Organic Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Organic?</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isOrganic ? '#048404' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isOrganic}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#048404',
    marginBottom: 16,
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#048404',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#048404',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 40,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});