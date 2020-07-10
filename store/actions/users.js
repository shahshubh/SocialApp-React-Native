import ENV from '../../env';

export const SET_USERS = 'SET_USERS' ;

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