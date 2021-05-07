import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";


const HomePage = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'><p>This is the home page</p></Route>
                <Route path='/join' component={JoinPage}></Route>
            </Switch>
        </Router>
     )
}


export default HomePage;