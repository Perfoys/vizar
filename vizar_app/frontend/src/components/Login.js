import React, { useState } from "react";
import { Login_div } from "../styled/login";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import { FormControl, Input } from '@material-ui/core';

import { userLogin } from "../actions/login";


const Login = ({ userLogin }) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handleClick = async (e) => {
        userLogin(user);
    }

    const handleInput = async (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]: value});
    }

    return (
        <Login_div>
            <h2>Login</h2>
            <form className="login-form" autoComplete="off">
                <Input placeholder="User Name" name="username" value={user.username} onChange={handleInput} inputProps={{ 'aria-label': 'username' }} />
                <Input placeholder="Password" name="password" value={user.password} onChange={handleInput} inputProps={{ 'aria-label': 'password' }} />
                <Button variant="contained" color="primary" onClick={handleClick}>Enter</Button>
            </form>
        </Login_div>
     )
}

const mapStateToProps = (user) => ({
    username: user.username,
    password: user.password,
})

export default connect( mapStateToProps, { userLogin })(Login);