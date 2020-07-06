import ENV from '../../env';

export const SET_POSTS = 'SET_POSTS';

export const fetchPosts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.user._id;
        const response = await fetch(`${ENV.apiUrl}/rn/allposts`);

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

        dispatch({
            type: SET_POSTS,
            posts: resData
        })
    }
}