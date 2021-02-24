import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';


const LandingPage = (props) => {
    
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    //fetching data from the api when homepage loads
    useEffect(()=>{
        fetch('http://192.168.10.5:3000/')
         .then(res=>res.json())
         .then(data=>{
             setList(data)
             setLoading(false)   
         })
    },[])

    // const deleteRecord = (item) => {
    //     fetch('http://192.168.10.5:3000/delete', {
    //         method: "post",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: _id
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             props.navigation.navigate("Home")
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })}

    const List = (item)=> {
        return(
            <Card styles={styles.cardContainer}>
                <View style={styles.cardStyle}>
                    <Avatar
                     rounded
                     source={{uri:'https://i'}}
                     size='large'
                     title="NA"
                    />
                    <View style={{marginLeft: 17, marginTop: 6}}>
                        <Text style={styles.cardText}>{item.name}</Text>
                        <Text style={styles.cardSubText}>{item.title}</Text>
                    </View>
                    <View style={{justifyContent:'flex-end', flexDirection:'row', alignItems:'flex-end', flex:1 }}>
                        <Ionicons
                         name='trash-sharp'
                         size={35}
                         style={{color:"#d60210"}} /> 
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
        fontSize: 19,

    },
    cardSubText:{
        fontSize: 15,
        
    }
});

export default LandingPage; 