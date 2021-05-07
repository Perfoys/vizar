import React from "react";
import { render } from "react-dom";

import { Provider } from 'react-redux';
import store from '../store';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

import Header from './Header';
import Chat from './Chat';
import Section from '../styled/section';

const App = () => { 
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