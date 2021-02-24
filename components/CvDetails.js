import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import Constants from 'expo-constants';



const CvDetails = (props) => {
   
    //Destructuring values from route params
    const {id,education,email,experience,info,name,phone,projects,title} = props.route.params.item;

    return (
        <View style={{flex:1,}}>
            <ScrollView>
            <View style={styles.innerView}>
                <Image
                    style={styles.image}
                    source={require('../assets/avatar.png')}
                />
                <Card>
                    <Card.Title>{name}</Card.Title>
                    <View style={{ borderBottomColor: 'black',borderBottomWidth: 1}}/>
                    <Text style={styles.heading}>Personal Information</Text>
                    <Text>{info}</Text>
                    <View style={{ marginTop:20, borderBottomColor: 'black',borderBottomWidth: 1}}/>
                    <Text style={styles.heading}>Education</Text>
                    <Text>{education}</Text>
                    <View style={{ marginTop:20, borderBottomColor: 'black',borderBottomWidth: 1}}/>
                    <Text style={styles.heading}>Projects</Text>
                    <Text>{projects}</Text>
                    <View style={{ marginTop:20, borderBottomColor: 'black',borderBottomWidth: 1}}/>
                    <Text style={styles.heading}>Experience</Text>
                    <Text>{experience}</Text>
                    <View style={{ marginTop:20, borderBottomColor: 'black',borderBottomWidth: 1}}/>
                    <Text style={styles.heading}>Email</Text>
                    <Text>{email}</Text>
                    <View style={{ marginTop:20, borderBottomColor: 'black',borderBottomWidth: 1}}/>
                    <Text style={styles.heading}>Phone #</Text>
                    <Text>{phone}</Text>   
                </Card>
            </View>
            </ScrollView>
        </View>
    )
}

const styles= StyleSheet.create({

    container:{
        marginTop: Constants.statusBarHeight,
        flex:1,
        
    },
    innerView:{
        marginTop:20,
        width:"90%",
        marginHorizontal:20 ,
        height: '100%',
        flex:1,
        backgroundColor:'#fff'
    },
    image:{
        height:70,
        width:70,
        alignSelf:'center',
        marginTop:10,
        marginBottom:0
    },
    heading:{
        marginTop:10,
        fontWeight: 'bold',
        color:"#303030"
    }

});

export default CvDetails;
