import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from './nav';
import './index.scss'



export default class Index extends Component {
    render() {
        return (
            <div className='Index'>
                <Nav/>
                {
                    this.props.routes.map((route, k) =>
                        <Route key={ k } path={ route.path } component={ route.component } />
                    )
                }
            </div>
        )
    }
}