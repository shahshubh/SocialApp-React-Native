import { SET_POSTS, CREATE_POST, DELETE_POST, UPDATE_POST } from "../actions/posts";

const initialState = {
    allPosts: [],
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
        case UPDATE_POST:
            const postIndex = state.allPosts.findIndex(post => post._id === action.updatedPostData._id);

            const updatedAllPosts = [...state.allPosts];
            updatedAllPosts[postIndex] = action.updatedPostData;

            return {
                ...state,
                allPosts: updatedAllPosts
            }

        case DELETE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post._id !== action.pid)
            }
        default:
            return state;
    }
}