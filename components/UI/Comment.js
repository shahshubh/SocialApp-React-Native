import React, {useState} from 'react';

import {  StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ENV from '../../env';
import { timeDifference } from '../../helpers/timeDifference';


const Comment = (props) => {

    const { comment, deleteCommentHandler, userId } = props;
    const [imageUri, setImageUri] = useState('')


    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }

    const deleteComment = () => {
        deleteCommentHandler(comment);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { }}>
                <Image 
                    style={styles.image} 
                    source={{ uri: imageUri || `${ENV.apiUrl}/user/photo/${comment.postedBy._id}?${new Date(comment.postedBy.updated)}` }} 
                    onError={onImageErrorHandler}
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text style={styles.name}>{comment.postedBy.name}</Text>
                    <Text style={styles.time}>
                        {timeDifference(new Date(), new Date(comment.created))}
                    </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }} >
                    <Text rkType='primary3 mediumLine'>{comment.text}</Text>
                    { comment.postedBy._id === userId && (
                        <TouchableOpacity 
                            style={{ position: 'absolute', right: 0 }}
                            onPress={deleteComment}
                        >
                            <MaterialCommunityIcons 
                                name="delete"
                                size={20}
                                color='red'
                            />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Comment;