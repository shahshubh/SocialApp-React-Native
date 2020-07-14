import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

import * as chatActions from '../../store/actions/chat';

import socketIO from 'socket.io-client';


let socket;

const ChatScreen = (props) => {
    const dispatch = useDispatch();
    const { route } = props;
    const user = route.params.user;

    const userId = user._id;
    const loggedUser = useSelector(state => state.auth.user);

    const chats = useSelector(state => state.chat.allChats);
    const currChats = chats.filter(c => (c.sender._id === loggedUser._id && c.reciever._id === userId) || (c.sender._id === userId && c.reciever._id === loggedUser._id))
    const resultChats = currChats.map(c => {
        return {
            _id: c._id,
            text: c.message,
            createdAt: new Date(c.time),
            user: {
                _id: c.sender._id,
                name: c.sender.name,
            }
        }
    }).reverse();

    const [text, setText] = useState('');
    const [messages, setMessages] = useState(resultChats);


    useEffect(() => {
        console.log("COnneCT USE effect")
        socket = socketIO.connect('http://192.168.0.106:8080')
        socket.on('connect', () => {
            console.log('connected chat screen')
            socket.emit('userInfo', loggedUser);
        })

    }, [])



    useEffect(() => {
        console.log("USE EFFECT");
        socket.on('message', (newChat) => {
            console.log("New message");
            if( newChat.sender._id === loggedUser._id || newChat.sender._id === userId ){
                let giftedNewChat = {
                    _id: newChat._id,
                    text: newChat.message,
                    createdAt: new Date(newChat.time),
                    user: {
                        _id: newChat.sender._id,
                        name: newChat.sender.name
                        // avatar: 
                    }
                }
                setMessages(previousMessages => GiftedChat.append(previousMessages, giftedNewChat) )
            }
            dispatch(chatActions.addChat(newChat))
        })
    }, [setMessages])

    const onSend = useCallback((messages = []) => {
        socket.emit('sendMessage', messages[0].text, loggedUser, user,  () => {
            // console.log('sent ', messages);
            setText('');
            // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))            
        })
    }, [])

    return (
        <GiftedChat
            text={text}
            onInputTextChanged={text => setText(text)}
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: loggedUser._id,
            }}
            // alwaysShowSend={true}
            // inverted={false}
        />
    );
};


export const screenOptions = (navData) => {

    const routeParams = navData.route.params;
    return {
        headerTitle: routeParams.user.name
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ChatScreen;