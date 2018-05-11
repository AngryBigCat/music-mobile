import React, { Component } from 'react';
import './index.scss';
import { InputItem, List, Tabs } from 'antd-mobile';

const tabs = [
    { title: '个人', sub: '1' },
    { title: '企业', sub: '2' }
];

export default class Register extends Component {
    render() {
        return (
            <div className='Register'>
                <div className="head">
                    <img src="/img/register/head.png" alt="head"/>
                </div>
                <Tabs tabs={ tabs }>
                    <div className="form">
                        <div className="input-group">
                            <label htmlFor="">手机号</label>
                            <input type="text" placeholder="请输入您的手机号"/>
                        </div>
                        <div className="input-group code">
                            <label htmlFor="">短信验证码</label>
                            <input type="text" placeholder="请输入获取的验证码"/>
                            <button>发送验证码</button>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">设置密码</label>
                            <input type="password" placeholder="6-16位数字/字母/符号" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="">确认密码</label>
                            <input type="password" placeholder="请再次输入密码"/>
                        </div>
                        <div className="protocol">
                            <span>我已认真阅读并同意《用户协议》</span>
                        </div>
                        <div className="register-btn">
                            <button>注册成为美论有版权音乐网会员</button>
                        </div>
                        <div className="bottom">
                            我是版权使用新人<br/>
                            我要了解版权的详情
                        </div>
                    </div>
                    <div>
                        Content of second 2
                    </div>
                </Tabs>
            </div>
        )
    }
}