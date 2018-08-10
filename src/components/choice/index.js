import React, { Component } from "react"
import './index.scss'
import { pay } from '../../api'
import { Toast } from 'antd-mobile'

export default class Choice extends Component {
    state = {
        payState: ''
    };

    onWx = () => {
        this.refs.wx.style.borderColor = "red";
        this.refs.al.style.borderColor = "#ddd";
        this.setState({payState: "wx"});
    };
    onAl = () => {
        this.refs.wx.style.borderColor = "#ddd";
        this.refs.al.style.borderColor = "red";
        this.setState({payState: "al"});
    };

    onPay = () => {
        if (!this.state.payState) {
            Toast.fail("请选择支付方式");
            return false;
        }
        pay(this.state.payState, this.props.match.params.num).then(({data}) => {
            if (data.state === "wx") {
                let url = window.btoa(data.url);
                this.props.history.push('/qr/' + url + '?ordernum=' + this.props.match.params.num);
            } else if (data.state === "al") {
                window.open(data.url, "_blank")
            }
        });
    };

    render() {
        return (
            <div className="choice">
                <header>
                    <span/>
                    选择支付方式
                </header>
                <div className="container">
                    <div className="pay">
                        <div className="wx" ref="wx" onClick={ this.onWx }>微信</div>
                        <div className="al" ref="al" onClick={ this.onAl } >支付宝</div>
                    </div>
                    <div className="text">
                        手机等大额支付推荐使用支付宝快捷支付。注：支付成功后，请不要关闭支付页面，请使它自动跳回本站，避免出错。
                    </div>
                    <div className="btn" onClick={ this.onPay }>支付</div>
                </div>
            </div>
        )
    }
}