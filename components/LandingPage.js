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
                        <Text style={styles.cardSubText}>{item.email}</Text>
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
           <TouchableOpacity onPress={()=>props.navigation.navigate('Create Cv')} style={styles.iconAdd}>
            <Ionicons
                name='add-circle'
                size={70}
                color='#854ca8'
                
            />
           </TouchableOpacity>
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
        fontSize: 17,
        
    },
    iconAdd:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
    }
});

export default LandingPage; 