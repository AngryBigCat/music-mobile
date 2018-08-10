import React, { Component } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { getToken } from "../../api";
import { Toast } from "antd-mobile";

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    componentWillMount() {
        if (localStorage.getItem("token")) {
            this.props.history.goBack();
        }
    }

    onLoginSubmit = () => {
        let username = this.state.username,
            password = this.state.password;
        if (!username || !password) {
            alert("请输入用户名和密码");
            return
        }
        getToken(username, password).then((res) => {
            if (res.data.code === 0) {
                localStorage.setItem("token", res.data.token);
                Toast.success("登陆成功");
                this.props.history.push("/home");
            } else {
                Toast.success(res.data.msg);
            }
        });
    };

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
                            <input type="text" placeholder="手机号/会员名/邮箱" autoComplete="off" value={ this.state.username }  onChange={ (e) => this.setState({ username: e.target.value }) } />
                        </div>
                        <div className="password">
                            <label className="lock" />
                            <input type="password" autoComplete="off" placeholder="登录密码" value={ this.state.password }  onChange={ (e) => this.setState({ password: e.target.value }) } />
                        </div>
                        <div className="remember">
                            <span>记住密码</span>
                            <span>忘记密码?</span>
                        </div>
                        <div className="login-btn" onClick={ this.onLoginSubmit }>登录</div>
                    </div>
                    <div className="social">
                        <div className="text">
                            <img src="/img/login/login-text.png" alt="text"/>
                        </div>
                        {/*<div className="icon-group">
                            <div className="wx" />
                            <div className="qq" />
                            <div className="wb" />
                        </div>*/}
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