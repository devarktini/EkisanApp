import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";

const CustomDrawerContent = ({ navigation }) => {
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

      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout pressed")}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
