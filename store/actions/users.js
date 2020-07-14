import ENV from '../../env';

export const SET_USERS = 'SET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';
export const SET_FIND_PEOPLE = 'SET_FIND_PEOPLE';
export const FOLLOW_FIND_PEOPLE = 'FOLLOW_FIND_PEOPLE';

export const fetchUsers = () => {
    return async (dispatch, getState) => {
        const response = await fetch(`${ENV.apiUrl}/users`);

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_USERS,
            users: resData
        })
    }
};

export const followUser = (user) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUser = getState().auth.user;

        
        dispatch({
            type: FOLLOW,
            user: user,
            loggedUser: loggedUser
        })

        const response = await fetch(`${ENV.apiUrl}/user/follow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId: loggedUser._id , followId: user._id })
        });

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

    }
};


export const unfollowUser = (user) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUser = getState().auth.user;

        dispatch({
            type: UNFOLLOW,
            user: user,
            loggedUser: loggedUser
        })
        const response = await fetch(`${ENV.apiUrl}/user/unfollow`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userId: loggedUser._id , unfollowId: user._id })
        });

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

    }
};


export const fetchFindPeopleUsers = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUserId = getState().auth.user._id

        const response = await fetch(`${ENV.apiUrl}/user/findpeople/${loggedUserId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }
    
        dispatch({
            type: SET_FIND_PEOPLE,
            users: resData
        })

        return resData;
    }
};


export const followFindPeople = (userId) => {
    return async (dispatch, getState) => {
        dispatch({
            type: FOLLOW_FIND_PEOPLE,
            userId: userId
        })
    }
};


export const updateProfile = (name, email, about, password, base64Data, imageType) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const loggedUserId = getState().auth.user._id;

        let userData;
        if( (!base64Data || !imageType || (base64Data === '' && imageType === '')) && password === ''){
            userData = { name, email, about }
        } else if((!base64Data || !imageType || (base64Data === '' && imageType === '')) && password !== '') {
            userData = { name, email, about, password } 
        } else if ((base64Data !== '' && imageType !== '') && password === ''){
            userData = { name, email, about, base64Data, imageType } 
        } else {
            userData = { name, email, about, password, base64Data, imageType } 
        }

        const response = await fetch(`${ENV.apiUrl}/rn/user/${loggedUserId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        })

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

        dispatch({
            type: UPDATE_USER,
            user: resData
        })

    }
};