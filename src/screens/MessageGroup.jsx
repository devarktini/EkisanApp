import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupListScreen from './GroupListScreen';
import GroupChatScreen from './GroupChatScreen';
import { createGroup } from '../services/Message/createGroup';

const Stack = createStackNavigator();

const MessageGroup = () => {
  const handleCreateGroup = async(groupName, groupDescription, userData) => {
    try {
        // Call the createGroup method
       const response =  await createGroup(groupName, groupDescription, userData);
       console.log("response", response);
    } catch (error) {
        console.error('Error creating group:', error);
    } 
    // Logic to create a new group
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // Center align the header title
      }}
    >
      <Stack.Screen name="GroupList">
        {props => <GroupListScreen {...props} onCreateGroup={handleCreateGroup} />}
      </Stack.Screen>
      <Stack.Screen name="GroupChat" component={GroupChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MessageGroup;