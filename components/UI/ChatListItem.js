import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import ENV from '../../env';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';



const ChatListItem = (props) => {
    const { user } = props;

    const [isLoading, setIsLoading] = useState(false);

    const loggedInUserId = useSelector(state => state.auth.user._id);
    const allUsers = useSelector(state => state.users.allUsers);
    const loggedInUser = allUsers.filter(u => u._id === loggedInUserId)[0];
    // currUser following list

    const dispatch = useDispatch();
    const navigation = useNavigation();





    // check user._id is in following list

    const [imageUri, setImageUri] = useState(`${ENV.apiUrl}/user/photo/${user._id}`);


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { user: user })}
        >
            <View style={styles.container}>
                <Image
                    source={{ uri: imageUri }}
                    onError={onImageErrorHandler}
                    style={styles.avatar}
                />
                <View style={styles.content}>
                    <View style={styles.mainContent}>
                        <View style={styles.text}>
                            <Text
                                style={styles.name}
                            >
                                {user.name}
                            </Text>
                        </View>
                        <Text style={styles.timeAgo}>
                            {user.email}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#c2c2c2'
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    img: {
        height: 50,
        width: 50,
        margin: 0
    },
    attachment: {

    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    timeAgo: {
        fontSize: 12,
        color: "#696969"
    },
    name: {
        fontSize: 16,
        color: "#1E90FF"
    }
})

export default ChatListItem;