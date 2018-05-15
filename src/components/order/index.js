import React, { Component } from 'react';
import './index.scss';
// import Util from '@/utils';
// import Mock from 'mockjs';
// import { Picker } from 'antd-mobile';
import store from '../../store';

const OrderTitle = (props) => (
    <div className="order-title">
        <div className="red" />
        <div className="title">{ props.title }<small>{ props.text }</small></div>
    </div>
);

const info_field = [
    {
        label: '公司或者个人名称',
        placeholder: '请输入您公司(或者个人)的名称',
        required: true
    },
    {
        label: '地址',
        placeholder: '请输入您公司(或者个人)的地址',
        required: true
    },
    {
        label: 'E-Mail',
        placeholder: '请输入您收取授权书的邮箱',
        required: true
    },
    {
        label: '联络人',
        placeholder: '请输入您的姓名',
        required: true
    },
    {
        label: '手机号',
        placeholder: '请输入您的手机号',
        required: true
    }
];

const certify_field = [
    {
        label: '授权使用人(公司名)',
        placeholder: '请输入被授权使用人(或公司名)',
        required: true
    },
    {
        label: '公司注册号',
        placeholder: '请输入公司注册号',
        required: true
    },
    {
        label: '授权使用人手机',
        placeholder: '请输入使用人手机号',
        required: true
    },
    {
        label: '其他备注资料',
        placeholder: '请输入其他备注资料',
        required: true
    },
    {
        label: '授权标的物',
        placeholder: '请输入授权标的物',
        required: true
    },
    {
        label: '项目链接',
        placeholder: '请输入项目链接',
        required: false
    },
    {
        label: '邀请码',
        placeholder: '请输入邀请码',
        required: false
    }
];

const commerces_eum = {
    1: '商业使用',
    2: '非商业使用'
};
const limit_eum = {
    1: '一年',
    2: '永久'
};
const region_eum = {
    1: '中国',
    2: '全球'
};

export default class Order extends Component {
    state = {
        cartItems: store.getState().cartItems,
        total_price: store.getState().total_price
    };

    onPay = () => {
        console.log(store.getState());
    };

    render() {
        return (
            <div className="order">
                <div className="container">
                    <div className="section">
                        <OrderTitle title="确认订单" text="" />
                        <div className="order-list">
                            {
                                this.state.cartItems.map((v, k) =>
                                    <div className="order-item" key={ k }>
                                        <div>名称：{ v.name }</div>
                                        <div>使用年限：{ limit_eum[v.limit_text] }</div>
                                        <div>授权价格：{
                                            (() => {
                                                let price = 0;
                                                switch (v.commerces_text) {
                                                    case 1:
                                                        price = v.commerces_price;
                                                        break;
                                                    case 2:
                                                        price = v.nocommerces_price;
                                                        break;
                                                }
                                                return commerces_eum[v.commerces_text] + '：' + price;
                                            })()
                                        }
                                        </div>
                                        <div>授权地区：{ region_eum[v.region_text] }</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="section">
                        <OrderTitle title="订购信息" text="" />
                        <div className="order-list">
                            {
                                info_field.map((v, k) =>
                                    <div className="order-input" key={ k }>
                                        <label htmlFor="">{ v.label }：</label>
                                        <input type="text" placeholder={ v.placeholder }/>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="section">
                        <OrderTitle title="授权书资料(必填)" text="" />
                        <div className="order-list">
                            {
                                certify_field.map((v, k) =>
                                    <div className="order-input" key={ k }>
                                        <label htmlFor="">{ v.label }：</label>
                                        <input type="text" placeholder={ v.placeholder }/>
                                        { v.required ? '' : (<span>(可选填)</span>) }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="total">
                            <span className="text1">合计：</span>
                            <span className="text2">￥{ this.state.total_price }</span>
                        </div>
                    </div>
                    <div className="right" onClick={ this.onPay }>付款</div>
                </div>
            </div>
        )
    }
}