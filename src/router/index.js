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
import Search from '../components/search'
import Choice from '../components/choice'
import Qr from '../components/qr'
import Credit from '../components/credit'
import CreditChild from '../components/credit/child'
import Profile from '../components/profile'
import Record from '../components/record'

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
            },
            {
                path: "/search",
                component: Search
            },
            {
                path: "/choice/:num",
                component: Choice
            },
            {
                path: "/qr/:url",
                component: Qr
            },
            {
                path: "/credit",
                component: Credit
            },
            {
                path: "/c/:name",
                component: CreditChild
            },
            {
                path: "/profile",
                component: Profile
            },
            {
                path: "/record",
                component: Record
            },
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
