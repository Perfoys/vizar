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
export const createSession = () => async (dispatch) => {
    try {
        const res = await axios.get("/api/session");
        console.log(res.data);
        dispatch({ type: SESSION_SUCCESS, payload: res.data});
    }
    catch(error) {
        dispatch({ type: SESSION_FAIL })
    }
}

// Sends the message to the bot - API CALL
export const sendMessage = (content) => async (dispatch) => {
    try {
        const body = { author_name: content.type, text: content.message, session: content.session };
        const res = axios.post("/api/log/", body);
        console.log((await res).data);
        dispatch({ type: MESSAGE_SUCCESS, payload: (await res).data });
    }
    catch (error) {
        dispatch({ type: MESSAGE_FAIL });
    }
}