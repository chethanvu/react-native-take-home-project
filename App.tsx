import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import EditScreen from './src/EditScreen';
import { TaskContextProvider } from './src/DataContext';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TaskContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Home" component={HomeScreen}  /> */}
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} // Custom title inside Stack.Screen
          />
        <Stack.Screen 
        name="TaskDetails" component={EditScreen}
        options={{
          headerStyle: {
            backgroundColor: '#1e90ff',  // Set header background color for TaskDetails screen
          },
          headerTintColor: '#fff',       // Set header text color for TaskDetails screen
          headerTitleStyle: {
            fontWeight: 'bold',          // Optional: Set header text style for TaskDetails
          },
          title: 'Task Details'           // Custom title for TaskDetails screen
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  </TaskContextProvider>
    
  
  )
}

export default App

const styles = StyleSheet.create({})