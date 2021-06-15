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

const Chat = ({chat, bot, userMessage, sendMessage}) => {

    const commands = [
        {
            command: ['Hello', 'Hi'],
            callback: ({ command }) => {
                let response = `Hi there! You said: "${command}"`;
                userMessage(`${command}`);
                sendMessage({type: "bot", message: response, session: localStorage.session});
                textToSpeech(response);
            },
            matchInterim: true
        },
        {
            command: "open *",
            callback: ({command}) => {
                userMessage(`${command}`);
                window.open("http://" + command.split(" ").join("") + ".com");
            },
        },
        {
            command: 'What is the weather today?',
            callback: async ({command}) => {
                    const res = await axios.get("api.openweathermap.org/data/2.5/weather?q=Minsk&appid=59d7646873a95c8dab04412d5bf20b15");
                    let weather = res.weather[0].main;
                    let temp = res.main.temp;
                    let response = `Today, the weather is ${weather}. Temperature is ${temp}`;
                    userMessage(`${command}`);
                    sendMessage({type: "bot", message: response, session: localStorage.session})
                    textToSpeech(response);
                },
        },
        {
            command: 'What can you do?',
            callback: ({command}) => {
                let response = `I can told you current weather, open website or search in google`;
                userMessage(`${command}`);
                sendMessage({type: "bot", message: response, session: localStorage.session});
                textToSpeech(response);
            }
        },
        {
            command: 'Pass the salt (please)',
            callback: ({command}) => {
                let response = 'My pleasure';
                userMessage(`${command}`);
                sendMessage({type: "bot", message: response, session: localStorage.session});
                textToSpeech(response);
            }
        },
        {
            command: ['eat', 'sleep', 'leave'],
            callback: ({command}) => {
                let response = `Best matching command: ${command}`;
                userMessage(`${command}`);
                sendMessage({type: "bot", message: response, session: localStorage.session});
                textToSpeech(response);
            },
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
        },
        {
            command: "search *",
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
            checkMatch(message, commands);
            setMessage("");
        }
    }

    const speechRec = async (e) => {
        userMessage(transcript);
        setMessage("");
    }

    const textToSpeech = (text) => {
        const synth = window.speechSynthesis || window.mozspeechSynthesis || window.webkitspeechSynthesis;
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'en-US';
        utterance.text = text;
        synth.speak(utterance);
    }

    const checkMatch = (text, commands) => {
        commands.forEach(element => {
            let command = typeof element.command === "string" ? element.command.toLowerCase() : element.command.join().toLowerCase();
            text = text.toLowerCase();
            if (command.indexOf(text) != -1) {
                return element.callback({command: text});
            }
        });
    }

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (<div>Не поддреживается</div>)
    }
    return (
        <Chat_div className="chat">
            <h2>Please type or say your sentence</h2>
            <div className="historyContainer">
                {chat.length === 0 ? "" : chat.map((msg) => <div className={msg.type}>{msg.type}: {msg.message}</div>)}
                {bot.length === 0 ? "" : bot.map((msg) => <div className={msg.type}>{msg.type}: {msg.message}</div>)}
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
    bot: state.vizar.message.messages,
})

export default connect( mapStateToProps, { userMessage, sendMessage })(Chat);