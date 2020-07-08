import ENV from '../../env';

export const DELETE_POST = "DELETE_PRODUCT";
export const CREATE_POST = "CREATE_PRODUCT";
export const UPDATE_POST = "UPDATE_PRODUCT";
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
};



export const createPost = (title, body, base64Data, imageType) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.user._id;
        const postData = {title, body, base64Data, imageType}
        // console.log(JSON.stringify(postData))
        // any async code
        const response = await fetch(`${ENV.apiUrl}/rn/post/new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }

        const resultPostData = {
            _id: resData._id,
            title: resData.title,
            body: resData.body,
            comment: resData.comments,
            created: new Date(resData.created),
            likes: resData.likes,
            postedBy: resData.postedBy
        }

        dispatch({
            type: CREATE_POST,
            postData: {
                _id: resData._id,
                title: resData.title,
                body: resData.body,
                comments: resData.comments,
                created: new Date(resData.created),
                likes: resData.likes,
                postedBy: {
                    _id: resData.postedBy._id,
                    name: resData.postedBy.name
                }
            }
        });
    }
};