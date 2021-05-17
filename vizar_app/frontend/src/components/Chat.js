import React, { useState } from 'react';
import Chat_div from '../styled/chat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl, Input } from '@material-ui/core';
import {connect} from "react-redux";

import {userMessage, sendMessage} from "../actions/vizar";

const Chat = ({chat, userMessage, sendMessage}) => {

    const [message, setMessage] = useState("");

    const handleClick = async (e) => {
        const code = e.keyCode || e.which;

        if (code===13) {
            console.log(message);
            userMessage(message);
            sendMessage(message);
            setMessage("");
            }
    }

    return (
        <Chat_div className="chat">
            <h2>Please type or say your sentence</h2>

            {chat.length === 0 ? "" : chat.map((msg) => <div className={msg.type}>{msg.message}</div>)}

            <FormControl>               
                <Input placeholder="Type your message" onChange={(e) => {setMessage(e.target.value)}} value={message} onKeyPress={handleClick}></Input>
                <Button variant="contained" color="primary" onClick={handleClick}>Enter</Button>
                <Button variant="contained" color="secondary">Talk</Button>
            </FormControl>
            
        </Chat_div>
    )
}

const mapStateToProps = (state) => ({
    chat: state.vizar.messages,
})

export default connect( mapStateToProps, { userMessage, sendMessage })(Chat);