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

const AddProduct = ({ setIsModalVisible }) => {
  const { userData } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [crops, setCrops] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [formValue, setFormValue] = useState({
    category: "",
    organic: "no",
    name: "",
    custom_name: "",
    quantity: "",
    variety: "",
    description: "",
    price: "",
    unit: "",
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
      quality: 0.7, // Adjust quality as needed
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
  

      // Validate required fields
      if (
        !formValue.category ||
        !formValue.name ||
        !formValue.quantity ||
        !formValue.price ||
        !formValue.unit ||
        !formValue.marketPrice
      ) {
        Alert.alert("Error", "Please fill in all required fields marked with an asterisk (*).");
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
        certificateNo: formValue.certificateNo ? String(formValue.certificateNo) : null,
        status: "pending",
        createdAt: Date.now(),
        isRented: userData?.userType === "farmer" ? formValue.isRented : false,
        createdBy: userData?.uid,
        userType: userData?.userType,
      };

  

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
          unit: "",
          marketPrice: "",
          certificateNo: "",
          isRented: false,
        });
        setSelectedImages([]);
        setIsModalVisible(false);
      } else {
        Alert.alert("Error", result?.message || "Failed to submit the product. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}></Text>

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
      <View style={styles.inputBox}>
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
      </View>

      {/* Second Dropdown or Custom Input */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Product Name *</Text>
        {formValue.category === "Farm Machinery" ? (
          <TextInput
            style={styles.input}
            placeholder="Enter the machine name"
            value={formValue.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        ) : (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formValue.name}
              onValueChange={(value) => handleInputChange("name", value)}
              style={styles.picker}
              enabled={formValue.category !== ""}
            >
              <Picker.Item label="Select Product Name" value="" />
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
        )}
      </View>

      {/* Custom Name Input */}
      {formValue.name === "custom" && (
        <View style={styles.inputBox}>
          <Text style={styles.label}>Custom Product Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter custom product name"
            value={formValue.custom_name}
            onChangeText={(value) => handleInputChange("custom_name", value)}
          />
        </View>
      )}

      {/* Quantity */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Quantity *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          keyboardType="numeric"
          value={formValue.quantity}
          onChangeText={(value) => handleInputChange("quantity", value)}
        />
      </View>

      {/* Variety */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Variety</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter variety (optional)"
          value={formValue.variety}
          onChangeText={(value) => handleInputChange("variety", value)}
        />
      </View>

      {/* Description */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter product description (optional)"
          multiline
          numberOfLines={4}
          value={formValue.description}
          onChangeText={(value) => handleInputChange("description", value)}
        />
      </View>

      <View style={styles.rowInput}>
        {/* Price */}
        <View style={[styles.inputBox, { flex: 1, marginRight: 10 }]} >
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
        <View style={[styles.inputBox, { flex: 1 }]}>
          <Text style={styles.label}>Unit *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formValue.unit}
              onValueChange={(value) => handleInputChange("unit", value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Unit" value="" />
              <Picker.Item label="Kg" value="kg" />
              <Picker.Item label="Litre" value="litre" />
              <Picker.Item label="Dozen" value="dozen" />
              <Picker.Item label="Unit" value="unit" />
              <Picker.Item label="Bag" value="bag" />
              <Picker.Item label="Box" value="box" />
              {/* Add more units as needed */}
            </Picker>
          </View>
        </View>
      </View>

      {/* Market Price */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>Market Price / MRP *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter market price or MRP"
          keyboardType="numeric"
          value={formValue.marketPrice}
          onChangeText={(value) => handleInputChange("marketPrice", value)}
        />
      </View>

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
        <View style={styles.inputBox}>
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
        <Text style={styles.submitButtonText}>Submit Product for Verification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: 30,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#28a745",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputBox: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 0,
    color: "#333",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  rowInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});