import {
    INPUT_SUCCESS,
    INPUT_FAIL,
} from '../actions/types';


const initialState = {
    messages: []
}

export const inputReducer = (state=initialState, action) => {
    const {type, payload} = action;
    let { messages } = state;
    
    switch(type) {
        case INPUT_SUCCESS:
            messages = [...messages, { message: payload, type: "user"}];
            return {
                ...state,
                messages,
            }
        case INPUT_FAIL:
            return {
                ...state,
            }
        default: 
            return {
                ...state
            }
    }
}