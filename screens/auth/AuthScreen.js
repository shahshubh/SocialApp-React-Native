import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';


import * as authActions from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';

const AuthScreen = () => {

    const [isSignup, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    

    const dispatch = useDispatch();
    
    const AuthHandler = async () => {
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        if(isSignup){
            try {
                const msg =await dispatch(authActions.signup(name, email, password))
                setSuccess(msg);
                setIsSignUp(false);
                setName('');
                setEmail('');
                setPassword('');
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await dispatch(authActions.signin(email, password))
            } catch (error) {
                setError(error.message);
            }
        }
        setIsLoading(false);
    };



    return (

            <View style={styles.container}>
                <Image style={styles.bgImage} source={require('../../assets/bg-auth.png')} />
                <View style={styles.titleContainer} >
                    <Text style={styles.title}>SocialApp</Text>
                </View>

                { error !== null && (
                    <View style={styles.errorMsgContainer} >
                        <Image style={styles.msgIcon} source={{ uri: "https://i.imgur.com/GnyDvKN.png" }} />
                        <Text style={styles.msgText}> {error} </Text>
                    </View>
                )}
                { success !== null && (
                    <View style={styles.successMsgContainer} >
                        <Image style={styles.msgIcon} source={{ uri: "https://i.imgur.com/Q9BGTuy.png" }} />
                        <Text style={styles.msgText}> {success} </Text>
                    </View>
                )}

                { isSignup && (
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Name"
                            underlineColorAndroid='transparent'
                            value={name}
                            onChangeText={(text) => setName(text) }
                        />
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/carbon-copy/100/000000/name.png' }} />
                    </View>
                ) }
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        value={email}
                        onChangeText={(text) => setEmail(text) }
                    />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={(text) => setPassword(text) }
                    />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
                </View>

                <TouchableOpacity style={styles.btnForgotPassword} >
                    <Text style={styles.btnText}>Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={AuthHandler}
                >

                    { isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    )  :(
                        <Text style={styles.loginText}>
                            { isSignup ? "Register" : "Login" }
                        </Text>
                    ) }
                    
                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonContainer}>
                    <Text 
                        style={styles.btnText} 
                        onPress={() => {
                            setIsSignUp(prevState => !prevState);
                        }} 
                    >
                        { isSignup ? "Login" : "Register" }
                    </Text>
                </TouchableOpacity>
            </View>    
    );
}

const resizeMode = 'center';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    titleContainer: {
        marginBottom: 40,
    },  
    title: {
        fontSize: 34,
        color: '#fff',
        fontWeight: 'bold',
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
    successMsgContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4F8A10',
        backgroundColor: "#DFF2BF" ,
        color: "#4F8A10",
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

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
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
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginRight: 15,
        justifyContent: 'center'
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
    btnForgotPassword: {
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
        width: 300,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: "#00b5ec",

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
    bgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    btnText: {
        color: "white",
        fontWeight: 'bold'
    }
}); 


export default AuthScreen;