import { SET_USERS, FOLLOW, UNFOLLOW, SET_FIND_PEOPLE, FOLLOW_FIND_PEOPLE, UPDATE_USER } from "../actions/users";

const initialState = {
    allUsers: [],
    findPeople: []
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
            return{
                ...state,
                allUsers: updatedUnfollowAllUsers
            }

        case SET_FIND_PEOPLE:
            return{
                ...state,
                findPeople: action.users
            }

        case FOLLOW_FIND_PEOPLE:
            let updatedFindPeople = [...state.findPeople];
            updatedFindPeople = updatedFindPeople.filter(i => i._id !== action.userId )

            console.log(updatedFindPeople);
            return{
                ...state,
                findPeople: updatedFindPeople
            }

        case UPDATE_USER:
            const index = state.allUsers.findIndex(user => user._id === action.user._id);
            const updatedAllUsers = [...state.allUsers]
            delete action.user.photo;
            updatedAllUsers[index] = action.user;
            console.log(updatedAllUsers[index]);
            return{
                ...state,
                allUsers: updatedAllUsers
            }

        default:
            return state;
    }
}