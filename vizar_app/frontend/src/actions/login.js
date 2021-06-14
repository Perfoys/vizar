import {
    AUTH_SUCCESS,
    AUTH_FAIL,
} from './types';

// Import axios
import axios from "axios";

// Function that handle user login
export const userLogin = (user) => async (dispatch) => {
    try {
        const body = { username: user.username, password: user.password };
        const res = axios.post("/api/auth/", body);
        console.log((await res).data);
        dispatch({ type: AUTH_SUCCESS, payload: (await res).data });
    }
    catch (error) {
        dispatch({ type: AUTH_FAIL})
    }
}