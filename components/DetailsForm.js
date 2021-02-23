import React from 'react';
import { View, ScrollView, KeyboardAvoidingView ,StyleSheet, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import Constants from 'expo-constants';
import { TextInput, Card, Title } from 'react-native-paper';
import { Button, Divider } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import * as yup from 'yup';

//yup schema for form validation
const formSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    info: yup.string().required(),
    education: yup.string().required(),
    experience: yup.string().required(),
    projects: yup.string().required()
})

const DetailsForm = (props) => {
    return (
        <ScrollView>
            <View >
            <Formik 
                initialValues={{info:"", education:"", experience:"", projects:"", phone:null, email:"", name:""}}
                validationSchema={formSchema}
                onSubmit={(values) => {
                    fetch('http://192.168.10.5:3000/post',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
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
                        {Alert.alert('Cv Generated')
                         props.navigation.navigate("Home")
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
                           <Button
                            onPress={formikprops.handleSubmit}
                            title='Generate CV  '
                            icon={
                                <Feather
                                name='check'
                                size={30}
                                color='white'
                                />
                            }
                            iconRight
                            buttonStyle={{backgroundColor:'#f4511e', height:50, borderRadius:30}}
                           />
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
