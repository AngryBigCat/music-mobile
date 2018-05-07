import React, { Component } from 'react';
import './index.scss';
import { SearchBar } from 'antd-mobile';

const SectionTitle = () => {
    return (
        <div className="section-title">
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </div>
    )
};

export default class Home extends Component {
    render() {
        return (
            <div className='Home'>
                <div className="nav">
                    <div className="nav-flex">
                        <div className="nav-flex-item">
                            <img src="/img/list.svg" alt="asd" />
                        </div>
                        <div className="nav-flex-item search">
                            <SearchBar />
                        </div>
                        <div className="nav-flex-item">
                            <img src="/img/cart.svg" alt="qwe" />
                        </div>
                    </div>
                </div>
                <div className="banner">

                </div>
                <div className="introduction">
                    <SectionTitle/>
                </div>
                <div className="classic">

                </div>
                <div className="newest">

                </div>
                <div className="case">

                </div>
                <div className="cooperation">

                </div>
                <div className="contact">

                </div>
                <div className="footer">

                </div>
            </div>
        )
    }
}