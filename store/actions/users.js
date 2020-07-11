import ENV from '../../env';

export const SET_USERS = 'SET_USERS';
export const FOLLOW = 'FOLLOW';
export const UNFOLLOW = 'UNFOLLOW';

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

