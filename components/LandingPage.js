import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Avatar, Divider } from 'react-native-elements';
import Constants from 'expo-constants';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import LottieView from 'lottie-react-native'; //Used to run animations




const LandingPage = (props) => {
    
    const [list, setList] = useState([]); //To store data to be rendered on screen
    const [loading, setLoading] = useState(true);//To store state of loading animation
    const [del, setDel] = useState(false);//To store state of screen refresh on delete

    //Fetching data from the api when homepage loads
    useEffect(()=>{

        
            fetch('http://192.168.10.5:3000/')//Change IP address to machine running server
            .then(res=>res.json())
            .then(data=>{
                setList(data)
                setLoading(false)
                setDel(true)
            })
        
        
        //The focus listener re-renders the page after navigation to update new records on screen
         const focusListener = props.navigation.addListener('focus', () => {
            fetch('http://192.168.10.5:3000/')//Change IP address to machine running server
            .then(res=>res.json())
            .then(data=>{
                setList(data)
                setLoading(false)
            })
          });
          return focusListener;
         
    },[props.navigation,del])

    const List = (item)=> {

        //Deleting user record from the server
        const deleteRecord = () => {
            fetch('http://192.168.10.5:3000/delete', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: item._id
                })
            }) //Change IP address to machine running server
                .then(res => res.json())
                .then(setDel(false))
                .then(Alert.alert('Delete Successful'))
                .catch(error => {
                    console.log(error)
                })}
        return(
            <Card  styles={styles.cardContainer}>
                <View style={styles.cardStyle}>
                    <Avatar
                     rounded
                     source={require('../assets/cvIcon.png')}
                     size='large'
                     title="NA"
                    />
                    <View style={{marginLeft: 17, marginTop: 6}}>
                        <Text style={styles.cardText}>{item.name}</Text>
                        <Divider style={{backgroundColor:'#000', marginBottom:5}}></Divider>
                        <Text style={styles.cardSubText}>{item.title}</Text>
                    </View>
                    <View style={{justifyContent:'flex-end', flexDirection:'row', alignItems:'center', flex:1 }}>
                        <TouchableOpacity 
                         activeOpacity={0.2}
                         onPress={()=>{props.navigation.navigate("Details",{item})}}>
                            <FontAwesome5
                             name='eye'
                             size={36}
                             style={{color:"#000", marginRight:10}} /> 
                        </TouchableOpacity>
                        <TouchableOpacity 
                         activeOpacity={0.2}
                         onPress={()=>deleteRecord()}>
                            <Ionicons
                             name='trash-sharp'
                             size={40}
                             style={{color:"#d60210"}} /> 
                        </TouchableOpacity>
                    </View>
                </View>
        </Card>
        )
    }
    return (
        
        <View style={styles.container}>
            { loading ? <LottieView source={require('../assets/2541-spin-lil-loader-v2.json')} autoPlay />
            :
           <FlatList
            data={list}
            renderItem={({item})=>{
                return List(item)
            }}
            keyExtractor={item=>item._id.toString()}
           />}
        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight,
        flex:1,
        
    },
    cardContainer:{
        margin: 2,
    },
    cardStyle:{
        flexDirection: 'row',
    },
    cardImage:{
        width: 70,
        height: 70,
        borderRadius: 30,
    },
    cardText:{
        fontSize: 20,

    },
    cardSubText:{
        fontSize: 13,
        
    }
});

export default LandingPage; 