import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as usersActions from '../../store/actions/users';
import ImgPicker from '../../components/app/ImgPicker';
import Colors from '../../constants/Colors';

import ENV from '../../env';
import { showMessage } from "react-native-flash-message";

const EditProfileScreen = (props) => {

    const loggedUser = useSelector(state => state.auth.user);
    const users = useSelector(state => state.users.allUsers);
    const userDetails = users.filter(u => u._id === loggedUser._id)[0];
    
    const [name, setName] = useState(userDetails.name);
    const [email, setEmail] = useState(userDetails.email);
    const [about, setAbout] = useState(userDetails.about);
    const [password, setPassword] = useState('');

    const [editImage, setEditImage] = useState({
        uri: `${ENV.apiUrl}/user/photo/${userDetails._id}`
    });
    const [previousUpdate, setPreviousUpdate] = useState(userDetails.updated);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setName('');
        setEmail('');
        setAbout('');
        setPassword('');
        setError(null);
        setIsLoading(false);
    }
    
    const validatePost = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /\d/
        if( !name){
            showMessage({
                message: "Please enter a valid name.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if( name && name.length < 2){
            showMessage({
                message: "Please enter a valid name.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if(!about || about.length === 0){
            showMessage({
                message: "Please enter something in About field.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        if(!emailRegex.test(email.toLowerCase())){
            showMessage({
                message: "Please enter a valid email.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        
        if(password.length > 0 && password.length < 6){
            showMessage({
                message: "Password should be atleast 6 characters long.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });
            return false;

        }
        if(password.length > 0 && !passwordRegex.test(password)){
            showMessage({
                message: "Password should contain atleast 1 number.",
                type: "danger",
                icon: { icon: "danger", position: 'left' }
            });     
            return false;
        }
        return true;
    }

    const updatePost = async () => {
        setIsLoading(true);
        setError(null);
        if(validatePost()){
            try {
                await dispatch(usersActions.updateProfile(name, email, about, password, base64Data, imageType));
                clearForm();
                props.navigation.navigate('YourProfile', { screen: 'UserProfile' });
                showMessage({
                    message: "Your profile was successfully edited.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    icon: { icon: "danger", position: 'left' }
                });
                console.log("ERROR ",error.message);
            }
        } 
        setIsLoading(false);
    }

    const imagePickedHandler = (base64, imageType) => {
        setBase64Data(base64);
        setImageType(imageType);
    }

    return(
        <ScrollView>
            <KeyboardAvoidingView style={styles.screen} >
                <View style={styles.container}>
                    { error !== null && (
                        <View style={styles.errorMsgContainer} >
                            <Image style={styles.msgIcon} source={{ uri: "https://i.imgur.com/GnyDvKN.png" }} />
                            <Text style={styles.msgText}> {error} </Text>
                        </View>
                    )}
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Profile Photo</Text>
                    </View>

                    <ImgPicker 
                        onImageTaken={imagePickedHandler} 
                        editImage={editImage}
                        previousUpdate={previousUpdate}
                    />
                    
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Name</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Name"
                            underlineColorAndroid='transparent'
                            value={name}
                            onChangeText={(text) => setName(text) }
                        />
                    </View>

                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Email</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            underlineColorAndroid='transparent'
                            value={email}
                            onChangeText={(text) => setEmail(text) }
                        />
                    </View>

                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >About</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="About"
                            underlineColorAndroid='transparent'
                            value={about}
                            onChangeText={(text) => setAbout(text) }
                        />
                    </View>

                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Password"
                            secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            value={password}
                            onChangeText={(text) => setPassword(text) }
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={updatePost}
                    >

                        { isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        )  :(
                            <Text style={styles.loginText}>
                                Update
                            </Text>
                        ) }
                        
                    </TouchableOpacity>

                    </View>   
                
            </KeyboardAvoidingView>

        </ScrollView>
    );
};

export const screenOptions = {
    headerTitle: 'Edit Profile'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    errorMsgContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#D8000C',
        backgroundColor: "#FFBABA" ,
        color: "#D8000C",
        borderRadius: 25,
    },
    msgText: {
        fontSize: 15,
    },
    msgIcon: {
        width: 30,
        height: 30,
        // marginLeft: 15,
        justifyContent: 'center'
    },

    labelContainer: {
        alignSelf: 'flex-start',
        marginLeft: 16
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        color: Colors.accent
    },
    inputContainer: {
        // borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        // borderBottomWidth: 1,
        width: 300,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        paddingRight: 15
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.brightBlue,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,

        elevation: 19,
    },
    loginText: {
        color: 'white',
    },
})

export default EditProfileScreen;