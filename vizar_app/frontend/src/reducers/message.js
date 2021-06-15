import {
    MESSAGE_SUCCESS,
    MESSAGE_FAIL,
} from '../actions/types';


const initialState = {
    messages: []
}

export const messageReducer = (state=initialState, action) => {
    const {type, payload} = action;
    let { messages } = state;

    switch(type) {
        case MESSAGE_SUCCESS:
            messages = [...messages, { message: payload.text, type: "bot" }];
            return {
                ...state,
                messages,
            }
        case MESSAGE_FAIL:
            return {
                ...state,
            }
        default: 
            return {
                ...state
            }
    }
}