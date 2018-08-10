import React, { Component } from 'react';
import './index.scss';
// import Util from '@/utils';
// import Mock from 'mockjs';
import { Toast } from 'antd-mobile';
import store from '../../store';
import { getInviters, getOrder, postOrder } from '../../api';

const OrderTitle = (props) => (
    <div className="order-title">
        <div className="red" />
        <div className="title">{ props.title }<small>{ props.text }</small></div>
    </div>
);

let info_field = [
    {
        label: '公司名称',
        placeholder: '请输入您公司的名称',
        required: true,
        name: 'info_company',
        value: ''
    },
    {
        label: '联系人',
        placeholder: '请输入您的姓名',
        required: true,
        name: 'info_name',
        value: ''
    },
    {
        label: 'E-Mail',
        placeholder: '请输入您收取授权书的邮箱',
        required: true,
        name: 'info_email',
        value: ''
    },
    {
        label: '手机号',
        placeholder: '请输入您的手机号',
        required: true,
        name: 'info_phone',
        value: ''
    },
    {
        label: '本订单备注',
        placeholder: '请输入您的备注信息',
        required: true,
        name: 'info_remark',
        value: ''
    }
];

let certify_field = [
    {
        label: '授权人(公司名)',
        placeholder: '请输入被授权人(公司名)',
        required: true,
        name: 'cert_company',
        value: ''
    },
    {
        label: '营业执照号',
        placeholder: '请输入营业执照号',
        required: true,
        name: 'cert_num',
        value: ''
    },
    {
        label: '授权人地址',
        placeholder: '请输入地址',
        required: true,
        name: 'cert_address',
        value: ''
    },
    {
        label: '授权人手机',
        placeholder: '请输入手机号',
        required: true,
        name: 'cert_phone',
        value: ''
    },
    {
        label: '授权标的物',
        placeholder: '请输入授权标的物',
        required: true,
        name: 'cert_sign',
        value: ''
    },
    {
        label: '项目链接',
        placeholder: '请输入项目链接(选填)',
        required: false,
        name: 'cert_link',
        value: ''
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
        cartItems: [],
        total_price: 0,
        inviters: [],
        inviter: '',
        info_field,
        certify_field
    };

    componentDidMount() {
        let cartItems = store.getState().cartItems,
            total_price = store.getState().total_price;
        if (!cartItems || !total_price) {
            this.props.history.push('/home');
        }
        this.setState({cartItems, total_price});
        getInviters().then(({data}) => {
            this.setState({inviters: data.inviters, inviter: data.inviters[0].name})
        });

        getOrder('token', localStorage.getItem('token')).then(({data}) => {
            let info_field = this.state.info_field;
            let certify_field = this.state.certify_field;
            info_field[0].value = data.order.name;
            info_field[1].value = data.order.pname;
            info_field[2].value = data.order.email;
            info_field[3].value = data.order.phone;
            info_field[4].value = data.order.text;

            certify_field[0].value = data.order.gsname;
            certify_field[1].value = data.order.gsnum;
            certify_field[2].value = data.order.site;
            certify_field[3].value = data.order.gsiphone;
            certify_field[4].value = data.order.goodsname;
            certify_field[5].value = data.order.link;
            this.setState({ info_field, certify_field });
        });
    }

    onPay = () => {
        if (!this.state.cartItems || !this.state.total_price) {
            Toast.fail('订单为空！');
            return;
        }
        let data = {};
        this.state.info_field.concat(this.state.certify_field).forEach((field) => {
            data[field.name] = field.value;
        });
        data['info_inviter'] = this.state.inviter;
        data['musics'] = store.getState().cartItems;
        data['total_price'] = store.getState().total_price;
        data['token'] = localStorage.getItem('token');
        postOrder(data).then(({data}) => {
            if (data.code === 0) {
                let cartData = localStorage.getItem('cartData').split(',');
                store.getState().cartItems.forEach((music) => {
                    cartData.splice(cartData.indexOf(music.music_id.toString()), 1);
                });
                localStorage.setItem('cartData', cartData.join(','));

                this.props.history.push('/choice/' + data.ordernum);
                // window.location.href = "http://youbanquan.com/zfb/" + data.total_price + "/" + data.ordernum;
            }
        })
    };

    onInfoChange = (k, e) => {
        let info_field = this.state.info_field;
        info_field[k].value = e.target.value;
        this.setState({info_field});
    };

    onCertifyChange = (k, e) => {
        let certify_field = this.state.certify_field;
        certify_field[k].value = e.target.value;
        this.setState({certify_field});
    };

    onInviterChange = (e) => {
        this.setState({ inviter: e.target.value });
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
                                                    default:
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
                        <OrderTitle title="订购信息(不显示在授权证书上)" text="" />
                        <div className="order-list">
                            {
                                this.state.info_field.map((v, k) =>
                                    <div className="order-input" key={ k }>
                                        <label htmlFor="">{ v.label }：</label>
                                        <input type="text" onChange={ this.onInfoChange.bind(this, k) } placeholder={ v.placeholder } value={ v.value }/>
                                    </div>
                                )
                            }
                            <div className="order-input">
                                <label>客服：</label>
                                <select onChange={ this.onInviterChange }>
                                    {
                                        this.state.inviters.map((v, k) =>
                                            <option key={ k }>{v.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <OrderTitle title="授权书资料(必填)" text="" />
                        <div className="order-list">
                            {
                                this.state.certify_field.map((v, k) =>
                                    <div className="order-input" key={ k }>
                                        <label htmlFor="">{ v.label }：</label>
                                        <input type="text" onChange={ this.onCertifyChange.bind(this, k) }  placeholder={ v.placeholder } value={ v.value } />
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