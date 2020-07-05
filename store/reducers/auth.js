import { AUTHENTICATE, SET_DID_TRY_AUTO_LOGIN, LOGOUT } from "../actions/auth";

const initialState = {
    token: null,
    user: null,
    didTryAutoLogin: false
};

export default (state=initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return {
                token: action.token,
                user: action.user,
                didTryAutoLogin: true
            };
        case SET_DID_TRY_AUTO_LOGIN:
            return{
                ...state,
                didTryAutoLogin: true
            };
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        default:
            return state;
    }
}