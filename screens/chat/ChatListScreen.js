import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import * as chatActions from '../../store/actions/chat';
import Colors from '../../constants/Colors';
import ChatListItem from '../../components/UI/ChatListItem';
import { Container, Header, Item, Input, Icon } from 'native-base';

const ChatListScreen = (props) => {

    const loggedUser = useSelector(state => state.auth.user);
    const chatList = useSelector(state => state.chat.chatList);
    const allChats = useSelector(state => state.chat.allChats);
    let allUsers = useSelector(state => state.users.allUsers);

    // remove logged user from the list
    allUsers = allUsers.filter(item => item._id !== loggedUser._id);


    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(chatList);


    const dispatch = useDispatch();

    const loadChatList = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const result = await dispatch(chatActions.fetchChatList());
            await dispatch(chatActions.fetchChats());
            setData(result);
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
    }, [dispatch, setIsLoading])


    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', e => {
    //         setSearchText('');
    //         loadChatList();
    //     });
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [])

    useEffect(() => {
        setIsLoading(true);
        loadChats()
        .then(() => {
            setIsLoading(false);
        });
        setIsLoading(false)
    }, [dispatch, loadChats])

    const handleSearchTextChange = (text) => {
        setSearchText(text);
        if(text !== ''){
            let filteredData = []
            let currData = allUsers;

            filteredData = currData.filter(item => {
                const lc = item.name.toLowerCase();
                text = text.toLowerCase();
                return lc.includes(text);
            });
            setData(filteredData);
        } else {
            setData(chatList);
        }
    }   


    if (isLoading) {
        return (
            <View style={styles.centered} >
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        );
    }

    return (
        <Container>
            <Header style={{ backgroundColor: Colors.brightBlue }} searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        value={searchText}
                        onChangeText={(text) => handleSearchTextChange(text)}
                        placeholder="Search" 
                    />
                    <Icon name="ios-people" />
                </Item>
            </Header>
            { data.length === 0 && (
                <View style={styles.centered}>
                    <Text>No chats !</Text>
                    <Text>Either your search does not match any user's name</Text>
                    <Text>or you have no chats.</Text>
                    <Text>Please refresh if you have new chats.</Text>
                </View>
            ) }
            <FlatList
                data={data}
                refreshing={isRefreshing}
                onRefresh={loadChatList}
                keyExtractor={(item) => item._id}
                renderItem={(user) => (
                    <ChatListItem user={user.item} />
                )}
            />
        </Container>
    );
};


export const screenOptions = {
    headerTitle: 'Chats'
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default ChatListScreen;