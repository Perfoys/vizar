import React from 'react';
import Chat_div from '../styled/chat';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Chat = () => {
    return (
        <Chat_div className='chat'>
            <h2>Please type or say your sentence</h2>
            <TextField id="standard-basic" label="Standard"></TextField>
            <Button variant="contained" color="secondary">Talk</Button>
        </Chat_div>
    )
}

export default Chat;