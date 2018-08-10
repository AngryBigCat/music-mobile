import React, { Component } from 'react';
import './index.scss';


export default class Profile extends Component {
    state = {

    };

    render() {
        return (
            <div className="profile">
                <div className="container">
                    <div className="header">
                        <span/>
                        交易详情
                    </div>
                    <div className="section">
                        <div className="item" onClick={ () => {this.props.history.push('/record')} }>
                            <div className="left">
                                <i className="fa fa-file-text-o"/>
                                历史订单
                            </div>
                            <div className="right">
                                <span>包括未支付订单</span>
                                <i className="fa fa-angle-right"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}