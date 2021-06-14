import React, { useState, useEffect, useRef } from 'react';
import { Chat_div } from '../styled/chat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl, Input } from '@material-ui/core';
import {connect} from "react-redux";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {userMessage, sendMessage} from "../actions/vizar";
//import { commands } from "../commands";
import axios from "axios";

const Chat = ({chat, userMessage, sendMessage}) => {

    const commands = [
        {
            command: ['Hello', 'Hi'],
            callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
            matchInterim: true
        },
        {
            command: "open *",
            callback: (website) => {
              window.open("http://" + website.split(" ").join(""));
            },
        },
        {
            command: 'What is the weather today?',
            callback: async (condition) => {
                    const res = await axios.get("api.openweathermap.org/data/2.5/weather?q=Minsk&appid=59d7646873a95c8dab04412d5bf20b15");
                    setMessage(`Today, the weather is ${condition}`)
                },
        },
        {
            command: 'What can you do?',
            callback: () => setMessage(`I can told you current weather, open website or search in google`)
        },
        {
            command: 'Pass the salt (please)',
            callback: () => setMessage('My pleasure')
        },
        {
            command: ['eat', 'sleep', 'leave'],
            callback: (command) => setMessage(`Best matching command: ${command}`),
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
        },
        {
            command: ['*'],
            callback: ({ command }) => {
                window.open("http://google.com/search?q=" + command.split(" ").join(""));
            }
        },
        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        }
      ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })
    const [message, setMessage] = useState("");
    const endOfMessages = useRef(null);

    const scrollToBottom = () => { 
        if (endOfMessages && endOfMessages.current)  {
            endOfMessages.current.scrollIntoView({ behavior: "smooth" });
        }
    }
    useEffect(scrollToBottom, [chat]);

    const handleClick = async (e) => {
        const code = e.keyCode || e.which;

        if (code===13 || e.target.className == "MuiButton-label") {
            userMessage(message);
            setMessage("");
        }
    }

    const speechRec = async (e) => {
        userMessage(transcript);
        setMessage("");
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<div>Не поддреживается</div>)
    }
    return (
        <Chat_div className="chat">
            <h2>Please type or say your sentence</h2>
            <div className="historyContainer">
                {chat.length === 0 ? "" : chat.map((msg) => <div className={msg.type}>{msg.message}</div>)}
                <div ref={endOfMessages}></div>
            </div>
            <FormControl id="form-bl">               
                <Input placeholder="Type your message" onChange={(e) => {setMessage(e.target.value)}} value={message} onKeyPress={handleClick}></Input>
                <Button variant="contained" color="primary" onClick={handleClick} value={message}>Enter</Button>
                <Button variant="contained" color="secondary" onChange={speechRec} onClick={SpeechRecognition.startListening} value={transcript}>Talk</Button>
            </FormControl>
            
        </Chat_div>
    )
}

const mapStateToProps = (state) => ({
    chat: state.vizar.input.messages,
})

export default connect( mapStateToProps, { userMessage, sendMessage })(Chat);