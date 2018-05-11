import React, { Component } from 'react';
import {
    HashRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Index from '../components/index';
import Home from '../components/home';
import Cart from '../components/cart';
import Login from '../components/login';
import Register from '../components/register';
// import User from '../Components/user'


export default class RouterConfig extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={ Index }/>
                    <Route path="/home" component={ Home } />
                    <Route path="/cart" component={ Cart } />
                    <Route path="/login" component={ Login } />
                    <Route path="/register" component={ Register } />
                </Switch>
            </HashRouter>
        )
    }
}

