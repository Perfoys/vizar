import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

// Import axios
import axios from "axios";

// Function that handle user registration
export const userRegister = (user) => async (dispatch) => {
    try {
        const body = { username: user.username, email: user.email, password: user.password };
        const res = axios.post("/api/register/", body);
        console.log(res.data);
        dispatch({ type: REGISTER_SUCCESS, payload: (await res).data });
    }
    catch (error) {
        dispatch({ type: REGISTER_FAIL})
    }
}