import React from 'react';
import { View, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { TextInput, Card, Title } from 'react-native-paper';
import { Button, Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import * as yup from 'yup';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as Print from 'expo-print';



//yup schema for form validation
const formSchema = yup.object({
    title: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    info: yup.string().required(),
    education: yup.string().required(),
    experience: yup.string().required(),
    projects: yup.string().required()
})

const DetailsForm = (props) => {

   
 const createAndSavePDF = async (html) => {
     try {
       const { uri } = await Print.printToFileAsync({ html });
       if (Platform.OS === "ios") {
         await Sharing.shareAsync(uri);
       } else {
         const permission = await MediaLibrary.requestPermissionsAsync();
         if (permission.granted) {
           await MediaLibrary.createAssetAsync(uri);
         }
       }
     } catch (error) {
       console.error(error);
     }
   };
 

    return (
        <ScrollView>
            <View >
            <Formik 
                initialValues={{ title:"", info:"", education:"", experience:"", projects:"", phone:null, email:"", name:""}}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    fetch('http://192.168.10.5:3000/post',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              title: values.title,
                              name: values.name,
                              email: values.email,
                              phone: values.phone,
                              info: values.info,
                              education: values.education,
                              experience: values.experience,
                              projects: values.projects
                          })
                    }).then(res=>res.json()).then(
                        data=>
                        {    const htmlContent = `
                        <!DOCTYPE html>
                        <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <style>
                                    .table{
                                        width: 100%;
                                        height: 100%;
                                        margin-left:auto; 
                                        margin-right:auto;
                                        background-color: #34495E;
                                    }
                        
                                    .table2{
                                        margin-left:auto; 
                                        margin-right:auto;
                                        width: 800px;
                                        height: 900px;
                                    }
                        
                                    .name{
                                        text-align: center;
                                    }
                        
                                    .profilepic{
                                        border-radius: 50%;
                                        width: 150px;
                                        height: 150px;
                                        margin-left:auto; 
                                        margin-right:auto;
                                        display: block;
                                    }
                        
                                    .td1{
                                        width: 200px;
                                        height: 1000px;
                                        padding-left: 10px;
                                        background-color: #FDFEFE;
                                        
                                    }
                        
                                    .td2{
                                        width: 450px;
                                        height: 1000px;
                                        padding-left: 10px;
                                        background-color: #FDFEFE;
                                    }
                        
                                </style>
                                <title>CV</title> 
                            </head>
                            <body>
                                <table class="table"  >
                                    <tr>
                                        <td>
                                            <table class="table2">
                                                <tr>
                                                    <td class="td1">
                                                        
                                                        <section itemscope itemtype="http://schema.org/Person">
                                                        <h1 class="name" itemprop="name">${values.name.toUpperCase().split(" ")[0]}<br> ${values.name.toUpperCase().split(" ")[1]}</h1>
                                                        <img src="images/me.jpg" alt="" class="profilepic" itemprop="image">
                                                        <h3>Contact</h3>
                                                        <hr>
                                                        <h4>Address:</h4>
                                                        <section itemprop="location" itemscope itemtype="http://schema.org/Place"><p itemprop="address">43,Gulistan-e-Johar,Karachi</p></section>
                                                    
                                                            <h5 itemprop="email">Email:</h5><p>${values.email}</p>
                                                            <h5 itemprop="telephone">Phone:</h5><p>${values.phone}</p>
                                                    </section>
                     
                                                    </td>
                                                    <td class="td2">
                                                        <h1>Personal Information</h1>
                                                        <hr>
                                                        <p><span itemscope itemtype="http://schema.org/Person">
                                                        ${values.info} 
                                                        </p>
                                                        <h3>Experience</h3>
                                                        <hr>
                                                        <h5><span itemscope itemtype="http://schema.org/Person">${values.experience}</h5>
                                                        <h3>Projects</h3>
                                                        <hr>
                                                        <ul>
                                                            <li>Footslog an android native mobile app that guides tourists and hikers while logging their journey experience</li>
                                                            <li>Warped City a Unity engine based Mobile game, a 2D platformer with physics and sensor controls </li>
                                                            <li>A library Management system based on PHP and MYSQL for librarians and borrowers</li>
                                                            <li>A website for a car garage business "CarbonHood" developed in ASP.NET utilizing Restful APIs</li>
                                                            <li>A cross platform mobile Grocery Application where vendors and sellers form a marketplace</li>
                                                        </ul>
                                                        <h3>Education</h3>
                                                        <hr>
                                                        <section itemscope itemtype="http://schema.org/EducationalOrganization"><h5>${values.education}</h5></section>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>        
                            </body>
                        </html>
                     `;
                            createAndSavePDF(htmlContent)
                            props.navigation.navigate("Home")
                            Alert.alert('Cv Generated')
                         
                        }).catch(error=>console.log(error))
                }}
              >
                {
                    (formikprops) => (
                       <View style={styles.container}>
                           <Card style={styles.cardStyle}>
                               <Card.Content>
                                   <Title>Info</Title>
                                   <Divider style={{backgroundColor:'#000', marginBottom:25}}></Divider>
                                   <Text style={{fontSize:15}}>Title</Text>
                                   <TextInput
                                        style={styles.inputStyle}   
                                        theme = {inputTheme}
                                        value={formikprops.values.title}
                                        onChangeText={formikprops.handleChange("title")}
                                        />
                                    <Text style={{fontSize:10}}>{formikprops.touched.title && formikprops.errors.title}</Text>

                                   <Text style={{fontSize:15}}>Name</Text>
                                   <TextInput
                                        style={styles.inputStyle}   
                                        theme = {inputTheme}
                                        value={formikprops.values.name}
                                        onChangeText={formikprops.handleChange("name")}
                                        />
                                    <Text style={{fontSize:10}}>{formikprops.touched.name && formikprops.errors.name}</Text>

                                    <Text style={{fontSize:15}}>E-mail</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        theme = {inputTheme}
                                        value={formikprops.values.email}
                                        onChangeText={formikprops.handleChange("email")}
                                    />
                                    <Text style={{fontSize:10}}>{formikprops.touched.email && formikprops.errors.email}</Text>

                                    <Text style={{fontSize:15}}>Phone #</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        theme = {inputTheme}
                                        value={formikprops.values.phone}
                                        onChangeText={formikprops.handleChange("phone")}
                                        keyboardType='numeric'
                                    />
                                    <Text style={{fontSize:10}}>{formikprops.touched.phone && formikprops.errors.phone}</Text>

                                    <Text style={{fontSize:15}}>Personal Information</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        theme = {inputTheme}
                                        multiline= {true}
                                        numberOfLines={6}
                                        value={formikprops.values.info}
                                        onChangeText={formikprops.handleChange("info")}
                                    />
                                    <Text style={{fontSize:10}}>{formikprops.touched.info && formikprops.errors.info}</Text>
                               </Card.Content>
                           </Card>
                           <Card style={styles.cardStyle}>
                               <Card.Content>
                                   <Title>Education & Work</Title>
                                   <Divider style={{backgroundColor:'#000', marginBottom:25}}></Divider>
                                   <Text style={{fontSize:15}}>Education</Text>
                                   <TextInput
                                        style={styles.inputStyle}   
                                        theme = {inputTheme}
                                        multiline= {true}
                                        numberOfLines={4}
                                        value={formikprops.values.education}
                                        onChangeText={formikprops.handleChange("education")}
                                        />
                                    <Text style={{fontSize:10}}>{formikprops.touched.education && formikprops.errors.education}</Text>

                                    <Text style={{fontSize:15}}>Experience</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        theme = {inputTheme}
                                        multiline= {true}
                                        numberOfLines={6}
                                        value={formikprops.values.experience}
                                        onChangeText={formikprops.handleChange("experience")}
                                    />
                                    <Text style={{fontSize:10}}>{formikprops.touched.experience && formikprops.errors.experience}</Text>

                                    <Text style={{fontSize:15}}>Projects</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        theme = {inputTheme}
                                        multiline= {true}
                                        numberOfLines={4}
                                        value={formikprops.values.projects}
                                        onChangeText={formikprops.handleChange("projects")}
                                    />
                                    <Text style={{fontSize:10}}>{formikprops.touched.projects && formikprops.errors.projects}</Text>
                               </Card.Content>
                           </Card>
                           <View style={{alignItems:"center"}}>
                           <Button
                            onPress={formikprops.handleSubmit}
                            title='Generate CV  '
                            icon={
                                <Feather
                                name='check'
                                size={30}
                                color='#fff'
                                />
                            }
                            iconRight
                            buttonStyle={{height:50, marginBottom:2, borderRadius:50, width:200, backgroundColor:'#d02860', padding:11}}
                           />
                           </View>
                       </View>
                    )
                }
            </Formik>
            </View>
        </ScrollView>
    )
}

const inputTheme = {
    colors:{
        primary: "#000"
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: Constants.statusBarHeight,
        backgroundColor:'#f5f5f5',
        justifyContent:'center', 
    },
    cardStyle:{
        margin:15,
    },
    inputStyle:{
        marginBottom:5,
    },
   
});

export default DetailsForm;
