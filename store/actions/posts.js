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


export const deletePost = (postId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const response = await fetch(`${ENV.apiUrl}/post/${postId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        const resData = await response.json();
        if(resData.error){
            throw new Error(resData.error);
        }
        dispatch({
            type: DELETE_POST,
            pid: postId
        })
    }
};


export const updatePost = (postId,title, body, base64Data, imageType) => {

    return async (dispatch, getState) => {
        const token = getState().auth.token;
        let postData;
        // const userId = getState().auth.user._id;
        if( !base64Data || !imageType || (base64Data === '' && imageType === '')){
            postData = {title, body}
        } else {
            postData = {title, body, base64Data, imageType}
        }

        const response = await fetch(`${ENV.apiUrl}/rn/post/${postId}`, {
            method: "PUT",
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

        dispatch({
            type: UPDATE_POST,
            updatedPostData: {
                _id: resData._id,
                title: resData.title,
                body: resData.body,
                comments: resData.comments,
                created: new Date(resData.created),
                likes: resData.likes,
                postedBy: {
                    _id: resData.postedBy._id,
                    name: resData.postedBy.name
                },
                updated: new Date(resData.updated)
            }
        });
    }
};