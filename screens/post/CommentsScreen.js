import React from 'react';
import {  StyleSheet, Text, View, ScrollView,FlatList, TextInput, KeyboardAvoidingView, Button } from 'react-native';

import Comment from '../../components/UI/Comment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CommentsScreen = (props) => {
    const { route } = props;
    const comments = route.params.comments



    return (
        <View style={{ flex: 1 }} >
            <FlatList
                style={styles.root}
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
                        <Comment comment={comment} />
                    );
                }}
            />
            <KeyboardAvoidingView style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Leave a comment"
                    />
                    <View style={styles.postButtonContainer} >
                        <TouchableOpacity>
                            <Text style={{ color: '#fff' }} >Post</Text>
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
        width: '88%',
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
        width: '12%' , 
        backgroundColor: 'blue', 
        padding: 5, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default CommentsScreen;