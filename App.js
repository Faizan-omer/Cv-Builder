import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsForm from './components/DetailsForm';
import LandingPage from './components/LandingPage';
import CreatePDF from './components/CreatePDF';

const Stack = createStackNavigator();

function App() {
  return (
    <View style={{flex:1}}>
      <Stack.Navigator>
        <Stack.Screen name= 'Home' component={LandingPage} 
        options={{title: 'CV Builder Home', headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          
        },
        }}></Stack.Screen>
        <Stack.Screen name= 'Create Cv' component={DetailsForm}
        options={{title: 'Create CV', headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          
        },}}
        ></Stack.Screen>
        <Stack.Screen name='Create PDF' 
        component={CreatePDF}
        ></Stack.Screen>
      </Stack.Navigator>
    </View>
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
