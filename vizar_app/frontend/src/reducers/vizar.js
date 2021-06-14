//import reducers
import {registerReducer} from "./register";
import {loginReducer} from "./login";
import {inputReducer} from "./input";
import {messageReducer} from "./message";
import {sessionReducer} from "./session";

// Initial state
const initialState = {

}

// Switch statement - update state
export default (state=initialState, action) => {
    return {
        input: inputReducer(state.input, action),
        session: sessionReducer(state.session, action),
        message: messageReducer(state.message, action),
        register: registerReducer(state.register, action),
        login: loginReducer(state.login, action),
    
    }

}