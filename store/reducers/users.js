import { SET_USERS } from "../actions/users";

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
            
        default:
            return state;
    }
}