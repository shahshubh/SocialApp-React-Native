import { AsyncStorage } from 'react-native';
import ENV from '../../env';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AUTO_LOGIN  = 'SET_DID_TRY_AUTO_LOGIN';



export const setDidTryAutoLogin = () => {
    return{
        type: SET_DID_TRY_AUTO_LOGIN
    };
};

export const authenticate = (user, token) => {
    return dispatch => {
        dispatch({
            type: AUTHENTICATE,
            user,
            token
        });
    }
};


export const signup = (name, email, password, expoPushToken) => {
    return async dispatch => {
        const response = await fetch(`${ENV.apiUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                notificationToken: expoPushToken
            })
        });
        const resData = await response.json();

        if(resData.error){
            throw new Error(resData.error);
        }

        return resData.message;
    };
};




export const signin = (email, password, expoPushToken) => {
    return async dispatch => {
        const response = await fetch(`${ENV.apiUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                notificationToken: expoPushToken
            })
        });

        const resData = await response.json();

        if(resData.error){
            throw new Error(resData.error);
        }

        dispatch(authenticate(resData.user, resData.token));

        saveDataToStorage(resData.token, resData.user);
    };
};


export const forgotPassword = (email) => {
    return async dispatch => {
        const response = await fetch(`${ENV.apiUrl}/forgot-password`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

        return resData.message;
    }
}


export const logout = () => {
    AsyncStorage.removeItem('userData');
    return {
        type: LOGOUT
    };
}


const saveDataToStorage = (token, user) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        user
    }));
}