import React, { useContext, useEffect, useState } from 'react';
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
import { AppContext } from '../context/AppContext';
import fetchCrops from '../services/fetchCrops';
import { fetchCategories } from '../services/productService';

const AddProduct = () => {
  const [cropType, setCropType] = useState("");
  const {user, userData} = useContext(AppContext)
  const [isOrganic, setIsOrganic] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [crops, setCrops] = useState([]);
    const [categories, setCategories] = useState([]);
     const [cropGrown, setCropGrown] = useState("");

  const toggleSwitch = () => setIsOrganic((previousState) => !previousState);



  const filteredCrops = crops.filter(crop => crop.category === cropType);


  const getCropsForCategory = () => {
    if (!cropType) return [];
    return filteredCrops.map(crop => ({
      label: crop.cropName,
      value: crop.cropName,
      unit: crop.unit
    }));
  };


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
      } else if (response.assets && response.assets.length > 0) {
        console.log('Selected Image: ', response.assets[0]);
        setSelectedImages([response.assets[0]]); // Set single image
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
      } else if (response.assets && response.assets.length > 0) {
        console.log('Selected Images: ', response.assets);
        setSelectedImages(response.assets); // Set multiple images
      }
    });
  };


  
  useEffect(() => {
      const fetchData = async () => {
        try {
          const cropsData = await fetchCrops();
          const categoriesData = await fetchCategories({});
          setCrops(cropsData);
          setCategories(categoriesData);
        } catch (error) {
          console.error("Error fetching data:", error);
          Swal.fire("Error", "Failed to fetch data. Please try again.", "error");
        }
      };
      fetchData();
    }, []);

      useEffect(() => {
        setCropGrown(''); // Reset crop selection when category changes
      }, [cropType]);
    

  const HandleAddProduct = () => {
    console.log("first", userData)
  }

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
      <View style={styles.imageContainer}>
  {selectedImages.map((image, index) => (
    <Image
      key={index}
      source={{ uri: image.uri }}
      style={styles.imagePreview}
    />
  ))}
</View>

      {/* Product Category Dropdown */}

      <View className="mb-6">
                        <Text className="text-lg font-semibold mb-2 text-gray-700">
                          What kind of crop do you grow?
                        </Text>
                        <View className="border-2 border-gray-200 rounded-xl overflow-hidden">
                          <Picker
                            selectedValue={cropType}
                            onValueChange={(itemValue) => setCropType(itemValue)}
                            className="bg-gray-50"
                          >
                            <Picker.Item label="Select Crop Type" value="" />
                            {categories.map((type, index) => (
                              <Picker.Item 
                                key={index} 
                                label={type.categorieName} 
                                value={type.categorieName}
                              />
                            ))}
                          </Picker>
                        </View>
                      </View>
      
                      {/* 2. Crop you grow in this farm (Dropdown) */}
                      <View className="mb-6">
                        <Text className="text-lg font-semibold mb-2 text-gray-700">
                          Specific crop grown in this farm
                        </Text>
                        <View className="border-2 border-gray-200 rounded-xl overflow-hidden">
                          <Picker
                            selectedValue={cropGrown}
                            onValueChange={(itemValue) => setCropGrown(itemValue)}
                            className="bg-gray-50"
                          >
                            <Picker.Item label="Select Crop Grown" value="" />
                            {getCropsForCategory().map((crop, index) => (
                              <Picker.Item key={index} label={crop.label} value={crop.label} />
                            ))}
                          </Picker>
                        </View>
                      </View>
      {/* <Text style={styles.label}>Product Category *</Text>
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
      </View> */}

      {/* Product Name Dropdown */}
      {/* <Text style={styles.label}>Product Name *</Text>
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
      </View> */}

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
      <TouchableOpacity onPress={() => HandleAddProduct()} style={styles.submitButton}>
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
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
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