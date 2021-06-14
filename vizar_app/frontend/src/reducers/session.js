import {
    SESSION_SUCCESS,
    SESSION_FAIL,
} from '../actions/types';


const initialState = {
    
}

export const sessionReducer = (state=initialState, action) => {
    const {type, payload} = action;
    
    switch(type) {
        case SESSION_SUCCESS:
            localStorage.setItem("session", payload["session"]);
            return {
                ...state,
            }
        case SESSION_FAIL:
            return {
                ...state,
            }
        default: 
            return {
                ...state
            }
    }
}