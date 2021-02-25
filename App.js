import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

import DetailsForm from './components/DetailsForm';
import LandingPage from './components/LandingPage';
import CvDetails from './components/CvDetails';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

//Nested inside Tab Navigator
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
        headerRight: () => (
          <SimpleLineIcons
            size={25}
            style={{marginRight:12, marginTop:2}}
            onPress={() => Alert.alert('Generated PDFs are stored in: Internal storage/DCIM on Android ')}
            name="info"
            color="#fff"
          />
        ),
        headerTitleAlign:'center',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
    
        },
      }}
       />
       <Stack.Screen name='Details' component={CvDetails}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}
        />
     </Stack.Navigator>
  )
}

//Nested inside Tab Navigator
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
        />
        <Tab.Screen name= 'Create Cv'
         component={DetailStack}
         options={{
          tabBarLabel: 'Create CV',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Ionicons name="create" color={color} size={25} />
          ),
        }}
        />
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
