//import types
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';

// Initial state
const initialState = {
    user: {
        username: "",
        email: "",
        password: "",
    }
}

// Switch statement - update state
export const registerReducer = (state=initialState, action) => {
    const {type, payload} = action;
    let { user } = state;

    switch(type) {
        case REGISTER_SUCCESS:
            user = [...user, { username: payload.username, email: payload.email, password: payload.password}];
            return {
                ...state,
                ...user,
            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        default: 
            return {
                ...state
            }
    }
}
