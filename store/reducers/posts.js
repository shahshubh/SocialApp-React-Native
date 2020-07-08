import { SET_POSTS, CREATE_POST } from "../actions/posts";

const initialState = {
    allPosts: [],
    userPosts: [],
    currPost: {}
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_POSTS:
            return {
                ...state,
                allPosts: action.posts
            }
        case CREATE_POST:
            return{
                ...state,
                allPosts: [action.postData, ...state.allPosts]
            }
        default:
            return state;
    }
}