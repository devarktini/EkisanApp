import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import TabNavigator from "./TabNavigator";
import AboutScreen from "../screens/About/AboutScreen";
import ContactScreen from "../screens/Contact/ContactScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route}) => {
  const user = route?.params?.user;
 

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} user={user} />}>
      <Drawer.Screen name="HomeTabs" component={TabNavigator} initialParams={{ user }} options={{ title: "Home" }}  />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
