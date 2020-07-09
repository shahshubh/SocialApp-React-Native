import React, { useState, useCallback } from 'react';
import {  StyleSheet, Text, View, ScrollView,FlatList, TextInput, KeyboardAvoidingView, Button, Alert, ActivityIndicator } from 'react-native';

import Comment from '../../components/UI/Comment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as postsActions from '../../store/actions/posts';
import Colors from '../../constants/Colors';

const CommentsScreen = (props) => {

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { route } = props;
    const postId = route.params.postId;
    const userId = route.params.userId;
    
    const dispatch = useDispatch();

    const posts = useSelector(state => state.posts.allPosts);
    const postIndex = posts.findIndex(post => post._id === postId);
    const comments = posts[postIndex].comments;


    const loadPosts = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(postsActions.fetchPosts());

        } catch (err) {
            Alert.alert(
                'Error',
                error.message,
                [{ text: 'Okay' }]
            );
        }
        setIsRefreshing(false);
    }, [dispatch])

    const createCommentHandler = async () => {
        if(text.length === 0){
            Alert.alert(
                'Please enter some text',
                'Cannot create empty comment',
                [{ text: 'Okay' }]
            );
        } else {
            setIsLoading(true);
            try {
                await dispatch(postsActions.commentPost(postId, text))
            } catch (error) {
                Alert.alert(
                    'Error, cannot comment',
                    error.message,
                    [{ text: 'Okay' }]
                );
            }
            setText('');
            setIsLoading(false);
        }
    }


    const deleteCommentHandler = async (comment) => {
        Alert.alert(
            'Are you sure?', 
            'Do you really want to delete this comment?',
            [
                {text: 'No', style: 'default'},
                {
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: async () => {
                        try {
                            await dispatch(postsActions.uncommentPost(postId,comment))
                        } catch (error) {
                            Alert.alert(
                                'Error, cannot delete this comment',
                                error.message,
                                [{ text: 'Okay' }]
                            );
                        }
                    }
                }
            ]
        );
    };


    return (
        <View style={{ flex: 1 }} >
            <FlatList
                style={styles.root}
                onRefresh={loadPosts}
                refreshing={isRefreshing}
                data={comments}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles.separator} />
                    )
                }}
                keyExtractor={(item) => {
                    return item._id;
                }}
                renderItem={(item) => {
                    const comment = item.item;
                    return(
                        <Comment comment={comment} deleteCommentHandler={deleteCommentHandler} userId={userId} />
                    );
                }}
            />
            <KeyboardAvoidingView style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Leave a comment"
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <View 
                        style={styles.postButtonContainer}
                    >
                        <TouchableOpacity
                            onPress={createCommentHandler}
                        >
                            { isLoading ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Text style={{ color: '#fff' }} >Post</Text>
                            ) }
                        </TouchableOpacity>
                    </View>
                </View>
                
            </KeyboardAvoidingView>
                
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        marginBottom: 45
    },
    inputs: {
        height: 45,
        width: '85%',
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        paddingRight: 20
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        width: '100%',
        height: 45,
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
    postButtonContainer: {
        position: 'absolute', 
        right: 0, 
        height: 45,
        width: '15%' , 
        backgroundColor: Colors.brightBlue, 
        padding: 5, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CommentsScreen;