import React, { Component } from 'react';
import './index.scss';
import { Tabs } from 'antd-mobile';
import { getCode, register } from "../../api";
import { Toast } from "antd-mobile";

const tabs = [
    { title: '个人', sub: '1' },
    { title: '企业', sub: '2' }
];

export default class Register extends Component {
    state = {
      username: '',
      code: '',
      password: '',
      repassword: ''
    };

    componentWillMount() {
        if (localStorage.getItem("token")) {
            this.props.history.goBack();
        }
    }

    onGetCode = () => {
        if (!this.state.username) {
            Toast.fail("请输入手机号码");
            return
        }
        getCode(this.state.username).then(() => {
            Toast.success("验证码发送成功");
        }).catch((e) => {
            Toast.fail("网络异常");
        })

    };

    onRegisterSubmit = () => {
        if (!this.state.username) {
            Toast.fail("请输入手机号码");
            return
        }
        if (!this.state.code) {
            Toast.fail("请输入验证码");
            return
        }
        if (this.state.password !== this.state.repassword) {
            Toast.fail("确认密码输入不一致");
            return
        }
        register(this.state.username, this.state.password, this.state.code)
            .then((res) => {
                switch (res.data.code) {
                    case 0:
                        localStorage.setItem("token", res.data.token);
                        Toast.success("注册成功", 3, () => {
                            this.props.history.push("/home");
                        });
                        break;
                    case 1:
                        Toast.fail("验证码错误");
                        break;
                    case 2:
                        Toast.fail("该手机号已经注册过了");
                        break;
                    case 3:
                        Toast.fail("网络异常");
                        break;
                    default:
                        break;
                }
            });
    };

    render() {
        return (
            <div className='Register'>
                <div className="head">
                    <img className="close" src="/img/close.png" alt="close" onClick={ () => { this.props.history.push('/home') } } />
                    <img src="/img/register/head.png" alt="head"/>
                </div>
                <Tabs tabs={ tabs }>
                    <div className="form">
                        <div className="input-group">
                            <label htmlFor="">手机号</label>
                            <input type="text" placeholder="请输入您的手机号" value={ this.state.username }  onChange={ (e) => this.setState({ username: e.target.value }) }/>
                        </div>
                        <div className="input-group code">
                            <label htmlFor="">短信验证码</label>
                            <input type="text" placeholder="请输入验证码" value={ this.state.code }  onChange={ (e) => this.setState({ code: e.target.value }) }/>
                            <button onClick={ this.onGetCode }>发送验证码</button>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">设置密码</label>
                            <input type="password" placeholder="6-16位数字/字母/符号" value={ this.state.password }  onChange={ (e) => this.setState({ password: e.target.value }) } />
                        </div>
                        <div className="input-group">
                            <label htmlFor="">确认密码</label>
                            <input type="password" placeholder="请再次输入密码" value={ this.state.repassword }  onChange={ (e) => this.setState({ repassword: e.target.value }) }/>
                        </div>
                        <div className="protocol">
                            <span>我已认真阅读并同意《用户协议》</span>
                        </div>
                        <div className="register-btn">
                            <button onClick={ this.onRegisterSubmit }>注册成为美论有版权音乐网会员</button>
                        </div>
                        <div className="bottom">
                            我是版权使用新人<br/>
                            我要了解版权的详情
                        </div>
                    </div>
                    <div>
                    </div>
                </Tabs>
            </div>
        )
    }
}