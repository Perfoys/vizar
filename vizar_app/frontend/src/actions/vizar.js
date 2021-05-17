// Import types
import {
    INPUT_SUCCESS,
    INPUT_FAIL,
    SESSION_SUCCESS,
    SESSION_FAIL,
    MESSAGE_SUCCESS,
    MESSAGE_FAIL,
} from './types';

// Import axios
import axios from "axios";

// Function that handle users message
export const userMessage = (message) => async (dispatch) => {
    try {
        dispatch({ type: INPUT_SUCCESS, payload: message});
    }
    catch (error) {
        dispatch({ type: INPUT_FAIL})
    }
}

// Create a session - API CALL
export const createSession = () => {
    try {
        const res = await axios.get("/api/vizar/session");
        dispatch({ type: SESSION_SUCCESS, payload: res.data});
    }
    catch(error) {
        dispatch({ type: SESSION_FAIL })
    }
}

// Sends the message to the bot - API CALL
export const sendMessage = () => async (dispatch) => {
    try {
        const body = { input: message };
        const res = axios.post("/api/vizar/message", body);
        console.log(res);
        dispatch({ type: MESSAGE_SUCCESS });
    }
    catch (error) {
        dispatch({ type: MESSAGE_FAIL });
    }
}