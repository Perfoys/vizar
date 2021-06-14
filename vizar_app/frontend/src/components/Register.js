import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import { Register_div } from "../styled/register";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl, Input } from '@material-ui/core';

import { userRegister } from "../actions/register";


const Register = ({ userRegister }) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleClick = async (e) => {
        userRegister(user);
    }

    const handleInput = async (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]: value});
    }

    return (
        <Register_div>
            <h2>Registration</h2>
            <form className="register-form" autoComplete="off">
                <Input placeholder="User Name" name="username" value={user.username} onChange={handleInput} inputProps={{ 'aria-label': 'username' }} />
                <Input placeholder="Email" name="email" value={user.email} onChange={handleInput} inputProps={{ 'aria-label': 'email' }} />
                <Input placeholder="Password" name="password" value={user.password} onChange={handleInput} inputProps={{ 'aria-label': 'password' }} />
                <Button variant="contained" color="primary" onClick={handleClick}>Enter</Button>
            </form>
        </Register_div>
     )
}

const mapStateToProps = (user) => ({
    username: user.username,
    email: user.email,
    password: user.password,
})

export default connect( mapStateToProps, { userRegister })(Register);
