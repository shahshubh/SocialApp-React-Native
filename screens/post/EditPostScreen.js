import React, { useEffect,useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Image, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as postActions from '../../store/actions/posts';
import ImgPicker from '../../components/app/ImgPicker';
import Colors from '../../constants/Colors';

import ENV from '../../env';

const EditPostScreen = (props) => {

    const postId = props.route.params.postId;
    const selectedPost = useSelector(state => 
        state.posts.allPosts.find(post => post._id === postId)
    );
    
    const [editImage, setEditImage] = useState({
        uri: `${ENV.apiUrl}/post/photo/${postId}`
    });
    const [previousUpdate, setPreviousUpdate] = useState(selectedPost.updated);
    const [title, setTitle] = useState(selectedPost.title);
    const [body, setBody] = useState(selectedPost.body);
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const clearForm = () => {
        setTitle('');
        setBody('');
        setBase64Data('');
        setImageType('');
        setError(null);
        setIsLoading(false);
    }

    const validatePost = () => {
        if(!title || title.length === 0){
            setError('Please enter a title.');
            return false;
        }
        if(!body || body.length === 0){
            setError('Please enter a body');
            return false;
        }
        // if(!pickedImage || base64Data.length === 0 ){
        //     setError('Please select an image to post.');
        //     return false;
        // }
        return true;
    }

    const updatePost = async () => {
        setIsLoading(true);
        setError(null);
        if(validatePost()){
            try {
                await dispatch(postActions.updatePost(postId, title, body, base64Data, imageType));
                clearForm();
                props.navigation.goBack();
            } catch (error) {
                setError(error.message);
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
            <KeyboardAvoidingView style={styles.screen} behavior="padding" >
                <View style={styles.container}>
                    { error !== null && (
                        <View style={styles.errorMsgContainer} >
                            <Image style={styles.msgIcon} source={{ uri: "https://i.imgur.com/GnyDvKN.png" }} />
                            <Text style={styles.msgText}> {error} </Text>
                        </View>
                    )}

                    <ImgPicker 
                        onImageTaken={imagePickedHandler} 
                        editImage={editImage}
                        previousUpdate={previousUpdate}
                    />
                    
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Title</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Title"
                            underlineColorAndroid='transparent'
                            value={ title}
                            onChangeText={(text) => setTitle(text) }
                        />
                    </View>

                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Body</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Body"
                            underlineColorAndroid='transparent'
                            value={body}
                            onChangeText={(text) => setBody(text) }
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

export default EditPostScreen;