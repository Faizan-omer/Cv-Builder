import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import DetailsForm from './components/DetailsForm';
import LandingPage from './components/LandingPage';




const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack()
{
  return(
     <Stack.Navigator>
       <Stack.Screen name= 'Cv Builder' component={LandingPage}
       options={{
        title: 'Cv Builder',
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
      }}
       />
     </Stack.Navigator>
  )
}

function DetailStack()
{
  return(
    <Stack.Navigator>
       <Stack.Screen name= 'Cv Builder' component={DetailsForm}
       options={{
        title: 'Cv Builder',
        headerStyle: {
          backgroundColor: '#694fad',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
      }}
       />
     </Stack.Navigator>
  )
}

function App() {
  return (
    
      <Tab.Navigator
        activeColor="#fff"
        shifting={true}
      >
        <Tab.Screen name= 'Home'
         component={HomeStack} 
         options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={20} />
          ),
        }}
        
        ></Tab.Screen>
        <Tab.Screen name= 'Create Cv'
         component={DetailStack}
         options={{
          tabBarLabel: 'Create CV',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Ionicons name="create" color={color} size={25} />
          ),
        }}
        ></Tab.Screen>
      </Tab.Navigator>
    
  );
}

export default ()=>{
  return(
   
      <NavigationContainer>
      <App />
    </NavigationContainer>
   
  )
}

const styles = StyleSheet.create({
  
});
