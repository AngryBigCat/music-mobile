import React, { Component } from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import Index from '../components/index';
import Home from '../components/home';
import Cart from '../components/cart';
import Login from '../components/login';
import Register from '../components/register';
import Order from '../components/order';
import Listen from '../components/listen'

const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/listen/:id",
        component: Listen
    },
    {
        path: "/",
        component: Index,
        routes: [
            {
                path: "/home",
                component: Home
            },
            {
                path: "/cart",
                component: Cart
            },
            {
                path: "/order",
                component: Order
            }
        ]
    },
];

export default class RouterConfig extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    {
                        routes.map((route, k) =>
                            <Route key={ k } path={ route.path } render={ props =>
                                    <route.component {...props} routes={route.routes} /> }
                            />
                        )
                    }
                </Switch>
            </HashRouter>
        )
    }
}
