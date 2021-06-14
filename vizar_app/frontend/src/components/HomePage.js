import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import axios from "axios";
import Chat from "./Chat";

if (localStorage.token) {
    delete axios.defaults.headers.common["token"];
    axios.defaults.headers.common["token"] = localStorage.token;
}
else {
    delete axios.defaults.headers.common["token"];
}

const HomePage = () => {
    return (
            <Router>
                <div className="router-div">
                    <h2>Home page</h2>
                    <nav>
                        <ul className="link-list">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Registration</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                {
                    localStorage.token ? <Chat></Chat> : <div></div>
                }
                <Switch>
                    <Route exact path='/'></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </Switch>
            </Router>
     )
}


export default HomePage;