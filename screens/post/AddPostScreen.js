import React, { useEffect,useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator, 
    KeyboardAvoidingView, 
    ScrollView 
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as postActions from '../../store/actions/posts';
import ImgPicker from '../../components/app/ImgPicker';
import Colors from '../../constants/Colors';
import { showMessage } from "react-native-flash-message";

const AddPostScreen = (props) => {

    const [clearPickedImage, setClearPickedImage ] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [base64Data, setBase64Data] = useState('');
    const [imageType, setImageType] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();


    const clearForm = () => {
        setClearPickedImage(true);
        setTitle('');
        setBody('');
        setBase64Data('');
        setImageType('');
        setIsLoading(false);
    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', clearForm);

        return () => {
            unsubscribe();
        };
    }, [clearForm])

    const validatePost = () => {
        let strLength = base64Data.length;
        let sizeInBytes = 4 * Math.ceil((strLength / 3))*0.5624896334383812;
        let sizeInKb = sizeInBytes/1000;
        console.log(sizeInKb);
        if(sizeInKb > 100){
            showMessage({
                message: "Image size should be less than 150KB.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }


        if(!title || title.length === 0){
            showMessage({
                message: "Please enter a title.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if(!body || body.length === 0){
            showMessage({
                message: "Please enter a body.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }
        if(base64Data.length === 0 ){
            showMessage({
                message: "Please select an image to post.",
                type: "danger",
                duration: 3000,
                icon: { icon: "danger", position: 'left' }
            });
            return false;
        }

        return true;
    }

    const createPost = async () => {
        setIsLoading(true);
        if(validatePost()){
            console.log("VALID POST")
            try {
                await dispatch(postActions.createPost(title, body, base64Data, imageType));
                clearForm();
                props.navigation.navigate('AllPosts')
                showMessage({
                    message: "Your post was successfully created.",
                    type: "success",
                    duration: 3000,
                    icon: { icon: "success", position: 'left' }
                });
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "danger",
                    duration: 3000,
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
        <ScrollView  >
            <KeyboardAvoidingView style={styles.screen} behavior="padding" >
                <View style={styles.container}>
                    {/* { error !== null && (
                        <View style={styles.errorMsgContainer} >
                            <Image style={styles.msgIcon} source={{ uri: "https://i.imgur.com/GnyDvKN.png" }} />
                            <Text style={styles.msgText}> {error} </Text>
                        </View>
                    )} */}
                    <ImgPicker 
                        onImageTaken={imagePickedHandler}
                        clearPickedImage={clearPickedImage}
                    />
                    <View style={styles.labelContainer} >
                        <Text style={styles.labelText} >Title</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Title"
                            underlineColorAndroid='transparent'
                            value={title}
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
                        onPress={createPost}
                    >
                        { isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        )  :(
                            <Text style={styles.loginText}>
                                Post
                            </Text>
                        ) }
                        
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


export const screenOptions = {
    headerTitle: 'Create Post'
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

        elevation: 10,
    },
    loginText: {
        color: 'white',
    },
})

export default AddPostScreen;