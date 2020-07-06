import { SET_POSTS } from "../actions/posts";

const initialState = {
    allPosts: [],
    userPosts: []
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_POSTS:
            return {
                ...state,
                allPosts: action.posts
            }
        default:
            return state;
    }
}