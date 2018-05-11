import React, { Component } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div className='Login'>
                <div className="logo">
                    <img src="/img/login/logo.png" alt="logo"/>
                </div>
                <div className="main">
                    <div className="form">
                        <div className="username">
                            <label className="user" />
                            <input type="text" name="username" placeholder="手机号/会员名/邮箱" />
                        </div>
                        <div className="password">
                            <label className="lock" />
                            <input type="password" autoComplete="off" name="password" placeholder="登录密码" />
                        </div>
                        <div className="remember">
                            <span>记住密码</span>
                            <span>忘记密码?</span>
                        </div>
                        <div className="login-btn">登录</div>
                    </div>
                    <div className="social">
                        <div className="text">
                            <img src="/img/login/login-text.png" alt="text"/>
                        </div>
                        <div className="icon-group">
                            <div className="wx" />
                            <div className="qq" />
                            <div className="wb" />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="text">还没有账号？</div>
                        <Link to="/register" className="register-btn">
                            立即注册
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}