import { SET_USERS, FOLLOW, UNFOLLOW } from "../actions/users";

const initialState = {
    allUsers: [],
};

export default (state=initialState, action) => {
    switch(action.type){
        case SET_USERS:
            return{
                ...state,
                allUsers: action.users
            }
        
        case FOLLOW:
            const userIndex = state.allUsers.findIndex(user => user._id === action.user._id);
            const loggedUserIndex = state.allUsers.findIndex(user => user._id === action.loggedUser._id);
            
            const updatedFollowAllUsers = [...state.allUsers];
            // add loggedin user in followers list of other user
            updatedFollowAllUsers[userIndex].followers = updatedFollowAllUsers[userIndex].followers.concat(action.loggedUser);
            
            // add other user in following list of logged user
            updatedFollowAllUsers[loggedUserIndex].following = updatedFollowAllUsers[loggedUserIndex].following.concat(action.user);

            // console.log("====================================");
            // console.log("====================================");
            // console.log("FOLLOW");
            // console.log("====================================");
            // console.log("Other User");
            // console.log("====================================");
            // console.log(updatedFollowAllUsers[userIndex]);
            // console.log("====================================");
            // console.log("Logged User");
            // console.log("====================================");
            // console.log(updatedFollowAllUsers[loggedUserIndex]);

            return{
                ...state,
                allUsers: updatedFollowAllUsers
            }

        case UNFOLLOW:
            const userInd = state.allUsers.findIndex(user => user._id === action.user._id);
            const loggedUserInd = state.allUsers.findIndex(user => user._id === action.loggedUser._id);
            
            const updatedUnfollowAllUsers = [...state.allUsers];

            // remove loggedin user from followers list of other user
            updatedUnfollowAllUsers[userInd].followers = updatedUnfollowAllUsers[userInd].followers.filter(u => u._id !== action.loggedUser._id)
            
            // remove other user from following list of logged user
            updatedUnfollowAllUsers[loggedUserInd].following = updatedUnfollowAllUsers[loggedUserInd].following.filter(u => u._id !== action.user._id);

            // console.log("====================================");
            // console.log("FOLLOW");
            // console.log("====================================");
            // console.log("Other User");
            // console.log("====================================");
            // console.log(updatedUnfollowAllUsers[userIndex]);
            // console.log("====================================");
            // console.log("Logged User");
            // console.log("====================================");
            // console.log(updatedUnfollowAllUsers[loggedUserIndex]);

            return{
                ...state,
                allUsers: updatedUnfollowAllUsers
            }

        default:
            return state;
    }
}