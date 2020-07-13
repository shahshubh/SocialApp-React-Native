import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';


import * as chatActions from '../../store/actions/chat';
import Colors from '../../constants/Colors';
import ChatListItem from '../../components/UI/ChatListItem';

const ChatListScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const chatList = useSelector(state => state.chat.chatList);


    const dispatch = useDispatch();

    const loadChatList = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await dispatch(chatActions.fetchChatList());
            await dispatch(chatActions.fetchChats());
        } catch (err) {
            console.log(err)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading])

    const loadChats = useCallback(async () => {
        try {
            await dispatch(chatActions.fetchChats());
        } catch (err) {
            console.log(err)
        }
    }, [dispatch])


    useEffect(() => {
        setIsLoading(true);
        loadChats()
        .then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadChats])


    if(isLoading){
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return(
        <View> 

        <FlatList
            data={chatList}
            refreshing={isRefreshing}
            onRefresh={loadChatList}
            keyExtractor={(item) => item._id}
            renderItem={(user) => (
                <ChatListItem user={user.item} />
            )}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default ChatListScreen;