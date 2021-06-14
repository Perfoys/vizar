import React, { useEffect } from "react";
import { render } from "react-dom";

import { Provider } from 'react-redux';
import store from '../store';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import Header from './Header';
import Chat from './Chat';
import Register from "./Register";
import { Section } from '../styled/section';

import { createSession } from "../actions/vizar";

import axios from "axios";
import Login from "./Login";
import HomePage from "./HomePage";

if (localStorage.session) {
    delete axios.defaults.headers.common["session"];
    axios.defaults.headers.common["session"] = localStorage.session;
}
else {
    delete axios.defaults.headers.common["session"];
}

const App = () => { 
    useEffect(() => {
        // Check if there session
        if (!localStorage.session) {
            // Create session
            store.dispatch(createSession());
        }
    })
    console.log(store.getState())
    return (
        <Provider store={store}>
            <Section>
            <Header></Header>
            <HomePage></HomePage>
            </Section>
        </Provider>
    )
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;