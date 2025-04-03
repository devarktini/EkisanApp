import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../context/AppContext";
import fetchCrops from "../services/fetchCrops";
import {
  fetchCategories,
  sendItemToVerification,
  uploadImage,
} from "../services/productService";

const AddProduct = ({setIsModalVisible}) => {
  const { userData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [formValue, setFormValue] = useState({
    category: "",
    organic: "no",
    name: "",
    custom_name: "",
    quantity: "",
    variety: "",
    description: "",
    price: "",
    unit: "Not Selected",
    marketPrice: "",
    certificateNo: "",
    isRented: false,
  });

  const toggleSwitch = () => {
    setFormValue((prev) => ({
      ...prev,
      organic: prev.organic === "yes" ? "no" : "yes",
    }));
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need access to your gallery to pick an image."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages((prev) => [
        ...prev,
        ...result.assets.map((asset) => asset.uri),
      ]);
    }
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
        Alert.alert("Error", "Failed to fetch data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormValue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log("Form Submitted:", formValue);
      console.log("Selected Images:", selectedImages);

      // Validate required fields
      if (!formValue.category || !formValue.name || !formValue.quantity || !formValue.price || !formValue.unit) {
        Alert.alert("Error", "Please fill in all required fields.");
        return;
      }

      if (formValue.organic === "yes" && !formValue.certificateNo) {
        Alert.alert("Error", "Please provide a certificate number for organic products.");
        return;
      }

      const completeItemData = {
        ...formValue,
        price: Number(formValue.price) || 0,
        quantity: Number(formValue.quantity) || 0,
        certificateNo: formValue.certificateNo
          ? Number(formValue.certificateNo)
          : null,
        status: "pending",
        createdAt: Date.now(),
        isRented: userData?.userType === "farmer" ? formValue.isRented : false,
        createdBy: userData?.uid,
        userType: userData?.userType,
      };

      console.log("Complete Item Data:", completeItemData);

      // Send data to verification
      const result = await sendItemToVerification({
        user: userData,
        itemData: completeItemData,
        productImages: selectedImages,
      });

      if (result?.success) {
        Alert.alert("Success", "Product submitted successfully for verification.");
        // Optionally reset the form
        setFormValue({
          category: "",
          organic: "no",
          name: "",
          custom_name: "",
          quantity: "",
          variety: "",
          description: "",
          price: "",
          unit: "Not Selected",
          marketPrice: "",
          certificateNo: "",
          isRented: false,
        });
        setSelectedImages([]);
        setIsModalVisible(false)
      } else {
        Alert.alert("Error", result?.message || "Failed to submit the product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Product</Text>

      {/* Image Picker */}
      <TouchableOpacity onPress={handleImagePick} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Choose Images</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.imagePreview} />
        ))}
      </View>

      {/* Category Dropdown */}
      <Text style={styles.label}>Category *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formValue.category}
          onValueChange={(value) => handleInputChange("category", value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.categorieName}
              value={category.categorieName}
            />
          ))}
        </Picker>
      </View>

      {/* Second Dropdown or Custom Input */}
      {formValue.category === "Farm Machinery" ? (
        <View>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the machine name"
            value={formValue.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Product Name *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formValue.name}
              onValueChange={(value) => handleInputChange("name", value)}
              style={styles.picker}
              enabled={formValue.category !== ""}
            >
              <Picker.Item label="Which Crop you grow" value="" />
              {userData.userType === "corporate" && (
                <Picker.Item label="Custom" value="custom" />
              )}
              {crops.map((item, index) => {
                if (item.category === formValue.category) {
                  return (
                    <Picker.Item
                      key={index}
                      label={item.cropName}
                      value={item.cropName}
                    />
                  );
                }
                return null;
              })}
            </Picker>
          </View>
        </View>
      )}

      {/* Custom Name Input */}
      {formValue.name === "custom" && (
        <View>
          <Text style={styles.label}>Item Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter custom name"
            value={formValue.custom_name}
            onChangeText={(value) => handleInputChange("custom_name", value)}
          />
        </View>
      )}

      {/* Quantity */}
      <Text style={styles.label}>Quantity *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={formValue.quantity}
        onChangeText={(value) => handleInputChange("quantity", value)}
      />

      {/* Variety */}
      <Text style={styles.label}>Variety</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter variety"
        value={formValue.variety}
        onChangeText={(value) => handleInputChange("variety", value)}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter product description"
        multiline
        numberOfLines={4}
        value={formValue.description}
        onChangeText={(value) => handleInputChange("description", value)}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        {/* Price */}
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={formValue.price}
            onChangeText={(value) => handleInputChange("price", value)}
          />
        </View>
        {/* Unit Picker */}
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Unit *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formValue.unit}
              onValueChange={(value) => handleInputChange("unit", value)}
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

      <Text style={styles.label}>Market Price *</Text>
      <TextInput
        style={styles.input}
        placeholder="Add market price or maximum retail price"
        keyboardType="numeric"
        value={formValue.marketPrice}
        onChangeText={(value) => handleInputChange("marketPrice", value)}
      />

      {/* Organic Switch */}

      {/* Organic Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Organic?</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={formValue.organic === "yes" ? "#048404" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={formValue.organic === "yes"}
        />
      </View>

      {/* Certificate Number Input */}
      {formValue.organic === "yes" && (
        <View>
          <Text style={styles.label}>Certificate Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter certificate number"
            value={formValue.certificateNo}
            onChangeText={(value) => handleInputChange("certificateNo", value)}
          />
        </View>
      )}

      {/* Submit Button */}

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#048404",
    marginBottom: 16,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#048404",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 14,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#048404",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 40,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
