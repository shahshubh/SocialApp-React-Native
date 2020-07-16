import ENV from '../../env';


export const SET_CHAT_LIST = 'SET_CHAT_LIST';
export const SET_CHATS = 'SET_CHATS';
export const ADD_CHAT = 'ADD_CHAT';


export const fetchChatList = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/chatlist/${userId}`);

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }
        
        dispatch({
            type: SET_CHAT_LIST,
            chatList: resData
        })

        return resData;
    }
};

export const fetchChats = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/rn/allchats`);

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }
        console.log("Fetching chats - actions")
        dispatch({
            type: SET_CHATS,
            chats: resData
        })
    }
};


export const addChat = (chat) => {
    return async (dispatch, getState) => {
        // const userId = getState().auth.user._id;
        dispatch({
            type: ADD_CHAT,
            newChat: chat
        })
    }
};