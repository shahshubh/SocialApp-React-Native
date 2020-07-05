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
        // dispatch(setLogoutTimer(expiryTime));
        dispatch({
            type: AUTHENTICATE,
            user,
            token
        });
    }
};


export const signup = (name, email, password) => {
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
            })
        });
        const resData = await response.json();

        if(resData.error){
            throw new Error(resData.error);
        }

        return resData.message;

        // if(response.error){
        //     const errorResData = await response.json();
        //     const errorId = errorResData.error.message;
        //     let message = 'Something went wrong!';
        //     if(errorId === 'EMAIL_EXISTS'){
        //         message = 'This email already exists!';
        //     }
        //     throw new Error(message);
        // }
        // const resData = await response.json();

        // dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn * 1000)));
        // const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        // saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};




export const signin = (email, password) => {
    return async dispatch => {
        const response = await fetch(`${ENV.apiUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        const resData = await response.json();

        if(resData.error){
            throw new Error(resData.error);
        }

        // const resData = await response.json();
        // console.log("RESPONSE => ",resData);
        dispatch(authenticate(resData.user, resData.token));
        // dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn * 1000)));

        // const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        console.log(resData.token, resData.user);
        saveDataToStorage(resData.token, resData.user);
    };
};



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