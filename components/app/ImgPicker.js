import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';


import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImgPicker = props => {
    
    const [pickedImage, setPickedImage] = useState(props.editImage);
    const navigation = useNavigation();

    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', e => {
            if(!props.editImage){
                setPickedImage()
            }
        });

        return () => {
            unsubscribe();
        };
    }, [])


    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted'){
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        try {
            const image = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                // aspect: [16, 9],
                quality: 0.6,
            });
            if(!image.cancelled){
                setPickedImage(image);
                let res = image.uri.split('.');
                let imageExtenstion = res[res.length - 1];
                let imageType = `${image.type}/${imageExtenstion}`;
                props.onImageTaken(image.base64, imageType);
            }
        } catch (error) {
            console.log("Image Error -",error)
        }
    };

    return(
        <View style={styles.imagePicker} >
            <View style={styles.imagePreview} >
                { !pickedImage ? (
                    <Text style={{ fontSize: 18 }} >No Image Picked</Text>
                ) : (
                    <Image
                        style={styles.image}
                        source={{ uri: props.previousUpdate ? `${pickedImage.uri}?${new Date(props.previousUpdate)}` : `${pickedImage.uri}` }}
                    />
                ) }
            </View>

            <TouchableOpacity 
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={takeImageHandler}
            >
                <Text style={styles.loginText}>
                    Pick Image
                </Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15,
    },
    imagePreview: {
        width: 320,
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.brightBlue,
        borderWidth: 1,
        backgroundColor: '#c2c2c2'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 100,
        borderRadius: 30,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor: Colors.accent,
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
});

export default ImgPicker;