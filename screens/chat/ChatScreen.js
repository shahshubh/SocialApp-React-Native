import React, { useState, useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';

import * as chatActions from '../../store/actions/chat';

import socketIO from 'socket.io-client';
import ENV from '../../env';

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

    const sendPushNotification = async (userName, text) => {
        const message = {
            to: user.notificationToken,
            sound: 'default',
            title: `New message from ${userName}`,
            body: text,
            data: { data: 'goes here' },
            _displayInForeground: true,
        };
        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const res = await response.json();
        // console.log(res);
    };


    useEffect(() => {
        socket = socketIO.connect(ENV.apiUrl)
        socket.on('connect', () => {
            console.log('connected chat screen')
            socket.emit('userInfo', loggedUser);
        })
    }, [])

    useEffect(() => {
        socket.on('message', (newChat) => {
            console.log("New message");
            // if(newChat.sender._id !== loggedUser._id){
                //push notification
            // }

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

            console.log("NOTIFICATION PUSHING to", user.name)
            sendPushNotification(loggedUser.name, messages[0].text);
            setText('');
            // setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >
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
        </View>
    );
};


export const screenOptions = (navData) => {

    const routeParams = navData.route.params;
    return {
        headerTitle: routeParams.user.name
    }
}

export default ChatScreen;