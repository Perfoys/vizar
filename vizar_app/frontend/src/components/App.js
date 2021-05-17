import React, { useEffect } from "react";
import { render } from "react-dom";

import { Provider } from 'react-redux';
import store from '../store';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import Header from './Header';
import Chat from './Chat';
import Section from '../styled/section';

import { createSession } from "../actions/vizar";

import axios from "axios";

if (localStorage.session) {
    axios.defaults.headers.common["session_id"] = localStorage.session;
}
else {
    delete axios.defaults.headers.common["session_id"];
}

const App = () => { 
    useEffect(() => {
        // Check if there session
        if (!localStorage.session) {
            // Create session
            store.dispatch(createSession());
        }
    })
    return (
        <Provider store={store}>
            <Section>
            <Header></Header>
            <Chat></Chat>
            </Section>
        </Provider>
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;