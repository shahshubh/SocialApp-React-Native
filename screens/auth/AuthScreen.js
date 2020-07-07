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

const AuthScreen = (props) => {

    const [isSignup, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);


    const dispatch = useDispatch();

    const validateAuthForm = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /\d/
        if(isSignup && !name){
            setError('Please enter a valid name.');
            setIsLoading(false);
            return false;
        }
        if(isSignup && name && name.length < 2){
            setError('Please enter a valid name.');
            setIsLoading(false);
            return false;
        }
        if(!emailRegex.test(email.toLowerCase())){
            setError('Please enter a valid email.')
            setIsLoading(false);
            return false;
        }
        if(!password || password.length === 0){
            setError('Please enter your password.')
            setIsLoading(false);
            return false;
        }
        if(isSignup && password.length < 6){
            setError('Password should be atleast 6 characters long.')
            setIsLoading(false);
            return false;

        }
        if(isSignup && !passwordRegex.test(password)){
            setError('Password should contain atleast 1 number.')     
            setIsLoading(false);
            return false;
        }
        return true;
    }


    const AuthHandler = async () => {
        setError(null);
        setSuccess(null);
        setIsLoading(true);
        if(validateAuthForm()){
            if(isSignup){
                try {
                    const msg = await dispatch(authActions.signup(name, email, password))
                    setSuccess(msg);
                    setIsSignUp(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                } catch (error) {
                    setError(error.message);
                }
                setIsLoading(false);
            } else {
                try {
                    await dispatch(authActions.signin(email, password))
                } catch (error) {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        }
    };

    const inputChangeHandler = (text,inputField) => {
        if(inputField === 1){
            setName(text)
        } else if(inputField === 2){
            setEmail(text)
        } else if(inputField === 3){
            setPassword(text)
        }
        setError(null);
        setSuccess(null);
    }


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
                            onChangeText={(text) => inputChangeHandler(text,1)}
                        />
                        <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/name.png' }} />
                    </View>
                ) }
                
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        value={email}
                        onChangeText={(text) => inputChangeHandler(text, 2) }
                    />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/email.png' }} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        value={password}
                        onChangeText={(text) => inputChangeHandler(text, 3) }
                    />
                    <Image style={styles.inputIcon} source={{ uri: 'https://img.icons8.com/nolan/40/000000/key.png' }} />
                </View>

                <TouchableOpacity 
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                    style={styles.btnForgotPassword} 
                >
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


                <TouchableOpacity 
                    style={[styles.buttonContainer, styles.registerButton]}
                    onPress={() => {
                        setIsSignUp(prevState => !prevState);
                    }}
                >
                    <Text style={styles.btnText} >
                        { isSignup ? "Already a user ? Login" : "Don't have an account ? Register" }
                    </Text>
                </TouchableOpacity>
            </View>    
    );
}


export const screenOptions = (navData) => {
    return{
        headerTitle: 'Auth',
    }
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
        fontSize: 42,
        color: '#fff',
        fontWeight: 'bold',

        textShadowOffset: {width: 0,height: 1},
        textShadowRadius: 1,
        textShadowColor: 'black',

        textShadowOffset: {width: 1,height: 1},
        textShadowRadius: 1,
        textShadowColor: '#ccc',

        textShadowOffset: {width: 2,height: 2},
        textShadowRadius: 1,
        textShadowColor: 'black',
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
    registerButton: {
        backgroundColor: Colors.lightPrimary,

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