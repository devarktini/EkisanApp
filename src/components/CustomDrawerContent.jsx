import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../context/AppContext";

const CustomDrawerContent = (props) => {
  const { userData, logout, loading } = useContext(AppContext);
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/agricultures.jpeg')} style={styles.header}>
        <View style={styles.avatar}>
          <Feather name="user" size={40} color="white" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userData?.phoneNumber}</Text>
          <Text style={styles.userEmail}>{userData?.email}</Text>
        </View>
      </ImageBackground>

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

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout(navigation)} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.logoutButtonText}>Logout</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4caf50',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  userEmail: {
    fontSize: 14,
    color: '#fff',
  },
  drawerItems: {
    flex: 1,
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drawerItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
