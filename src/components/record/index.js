import React, { Component } from 'react';
import './index.scss';
import { getOrders } from '../../api';

export default class Record extends Component {
    state = {
        orders: []
    };

    componentWillMount() {
        if (localStorage.getItem('token')) {
            getOrders().then(({data}) => {
                this.setState({orders: data.orders})
            })
        }
    }

    onPay = (num) => {
        this.props.history.push('/choice/' + num)
    };

    render() {
        return (
            <div className="record">
                {/*<div className="row">
                    <div className="return">
                        <i className="fa fa-angle-left"/>
                        返回
                    </div>
                </div>*/}
                {
                    this.state.orders.map((v, k) => (
                        <div className="row" key={ k }>
                            <div className="header">
                                <div>{ v.music_name }</div>
                                {
                                    v.pay ?
                                        <span className="paid">交易完成</span>
                                    :
                                        <span className="unpaid" onClick={ this.onPay.bind(this, v.ordernum) }>待支付</span>
                                }
                            </div>
                            <div className="section info">
                                <div>
                                    <div className="title">编号</div>
                                    <div className="val">{ v.o_num }</div>
                                </div>
                                <div>
                                    <div className="title">使用年限</div>
                                    <div className="val">{ v.year === 1 ? '一年': '永久' }</div>
                                </div>
                                <div>
                                    <div className="title">授权地区</div>
                                    <div className="val">{ v.city === 1 ? '中国': '全球' }</div>
                                </div>
                                <div>
                                    <div className="title">授权种类</div>
                                    <div className="val">B类</div>
                                </div>
                                <div>
                                    <div className="title">授权价格</div>
                                    <div className="val">{ v.o_price }</div>
                                </div>
                            </div>
                            <div className="section num">
                                <div>订单编号：{ v.ordernum }</div>
                                <div>授权证书号：</div>
                            </div>
                            <div className="section bottom">
                                <div className="time">{ v.otime }</div>
                                <div className="btn">
                                    <button>证书查询</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}