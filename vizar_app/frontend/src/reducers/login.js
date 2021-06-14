//import types
import {
    AUTH_SUCCESS,
    AUTH_FAIL,
} from '../actions/types';

// Initial state
const initialState = {

}

// Switch statement - update state
export const loginReducer = (state=initialState, action) => {
    const {type, payload} = action;


    switch(type) {
        case AUTH_SUCCESS:
            localStorage.setItem("token", payload["token"]);
            return {
                ...state,
            }
        case AUTH_FAIL:
            return {
                ...state,
            }
        default: 
            return {
                ...state
            }
    }
}
