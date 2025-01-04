import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import TabNavigator from "./TabNavigator";
import AboutScreen from "../screens/About/AboutScreen";
import ContactScreen from "../screens/Contact/ContactScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeTabs" component={TabNavigator} options={{ title: "Home" }} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
