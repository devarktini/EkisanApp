import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import { signoutAuthService } from "../services/authservice";

const CustomDrawerContent = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const response = await signoutAuthService();
    setLoading(false);

    if (response.success) {
        Alert.alert("Success", "You have been logged out.");
        navigation.replace("SignIn"); // Redirect to Sign-In screen
    } else {
        Alert.alert("Logout Failed", response.error);
    }
};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Feather name="user" size={40} color="white" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Laurent Michenaud</Text>
          <Text style={styles.userEmail}>lmichenaud@gmail.com</Text>
        </View>
      </View>

      <View style={styles.drawerItems}>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("HomeTabs")}>
          <Feather name="home" size={24} color="#10B981" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("About")}>
          <Feather name="info" size={24} color="#3B82F6" />
          <Text style={styles.drawerItemText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate("Contact")}>
          <Feather name="mail" size={24} color="#F59E0B" />
          <Text style={styles.drawerItemText}>Contact</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.logoutButtonText}>Logout</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
