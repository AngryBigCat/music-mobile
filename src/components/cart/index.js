import React, { Component } from 'react';
import './index.scss';
import Util from '@/utils';
import Mock from 'mockjs';
import { Picker } from 'antd-mobile';

const data = Mock.mock({
    'list|1-10': [ {
        'music_id|+1': 1,
        'name': '@first',
        'commerces_price': '@natural(300, 400)',
        'nocommerces_price': '@natural(200, 300)',
        'real_price': '@commerces_price',
        'commerces_text': 1,
        'region_text': 1,
        'limit_text': 1,
        'checked': false
    } ]
});

const year = [
    {
        label: '一年',
        value: 1,
    },
    {
        label: '永久',
        value: 2,
    },
];

const region = [
    {
        label: '中国',
        value: 1,
    },
    {
        label: '全球',
        value: 2,
    }
];

export default class Cart extends Component {
    state = {
        total_price: 0,
        cartItems: data.list,
        all_checked: false
    };

    componentDidMount = () => {
        this.updateTotalPrice();
    };

    onDelCartItem = (k) => {
        let items = Util.removeItem(this.state.cartItems, k);
        this.setState({ cartItems: items });
        this.updateTotalPrice();
    };

    onChangeCommercesOption = (k, valArr) => {
        let val = parseInt(valArr[0]);
        this.setCartItemsState('commerces_text', k, val);
    };

    onChangeRegionOption = (k, valArr) => {
        let val = parseInt(valArr[0]);
        this.setCartItemsState('region_text', k, val);
    };

    onChangeLimitOption = (k, valArr) => {
        let val = parseInt(valArr[0]);
        this.setCartItemsState('limit_text', k, val);
    };

    onChangeAllItemChecked = () => {
        let cartItems = this.state.cartItems;
        let all_checked = !this.state.all_checked;
        for (let i in cartItems) {
            cartItems[i]['checked'] = all_checked
        }
        this.setState({ cartItems, all_checked });
        this.updateTotalPrice();
    };

    onChangeItemChecked = (k) => {
        this.setCartItemsState('checked', k, !this.state.cartItems[k]['checked']);
        for (let i in this.state.cartItems) {
            if (!this.state.cartItems[i].checked) {
                this.setState({ all_checked: false });
                return false;
            }
        }
        this.setState({ all_checked: true });
    };

    /**
     * 更新选项文字
     */
    setCartItemsState = (field, key, val) => {
        let cartItems = this.state.cartItems;
        cartItems[key][field] = val;
        this.setState({ cartItems });
        this.updateItemRealPrice(key);
        this.updateTotalPrice();
    };

    /**
     * 更新每首歌曲的真实价格
     */
    updateItemRealPrice = (key) => {
        let cartItems = this.state.cartItems;
        let item = cartItems[key];
        let price = 0;

        if (item['commerces_text'] === 1) {
            price = item['commerces_price'];
        } else if (item['commerces_text'] === 2) {
            price = item['nocommerces_price'];
        }

        if (item['region_text'] === 2 && item['limit_text'] === 2) {
            price *= 4;
        } else if (item['region_text'] === 2 || item['limit_text'] === 2) {
            price *= 2;
        }
        cartItems[key]['real_price'] = price;
        this.setState({ cartItems });
    };

    updateTotalPrice = () => {
        let total_price = 0;
        this.state.cartItems.map((item) => {
            if (item.checked) {
                total_price += parseFloat(item.real_price)
            }
        });
        this.setState({ total_price });
    };

    render() {
        return (
            <div className='Shop'>
                <div className="cart">
                    {
                        this.state.cartItems.map((v, k) => (
                            <div className="item" key={ k }>
                                <div className="head">
                                    <div className="title">
                                        <div className="checkbox">
                                            <input type="checkbox"
                                                   checked={ v.checked }
                                                   className="check" id={ `check${k}` }
                                                   onClick={ this.onChangeItemChecked.bind(this, k) }/>
                                            <label htmlFor={ `check${k}` }></label>
                                        </div>
                                        { v.name }
                                        <div className="icon-play" />
                                    </div>
                                    <div className="del">
                                        <div className="icon-del" onClick={ this.onDelCartItem.bind(this, k) } />
                                    </div>
                                </div>
                                <div className="select">
                                    <div className="s">
                                        <div className="label">使用年限</div>
                                        <Picker
                                            data={year}
                                            title="使用年限"
                                            cols={1}
                                            onChange={ this.onChangeLimitOption.bind(this, k) }
                                        >
                                            <div className="sx">
                                                {
                                                    (() => {
                                                        switch (v.limit_text) {
                                                            case 1:
                                                                return '一年';
                                                            case 2:
                                                                return '永久';
                                                            default:
                                                                return '请选择';
                                                        }
                                                    })()
                                                }
                                            </div>
                                        </Picker>
                                    </div>
                                    <div className="s mid">
                                        <div className="label">授权价格</div>
                                        <Picker data={[
                                            {
                                                label: '商业使用:' + v.commerces_price,
                                                value: 1,
                                            },
                                            {
                                                label: '非商业使用:' + v.nocommerces_price,
                                                value: 2
                                            }
                                        ]} cols={1} title="授权价格" onChange={ this.onChangeCommercesOption.bind(this, k) }>
                                            <div className="sx">
                                                {
                                                    (() => {
                                                        switch (v.commerces_text) {
                                                            case 1:
                                                                return '商业使用:' + v.commerces_price;
                                                            case 2:
                                                                return '非商业使用:' + v.nocommerces_price;
                                                            default:
                                                                return '请选择';
                                                        }
                                                    })()
                                                }
                                            </div>
                                        </Picker>
                                    </div>
                                    <div className="s">
                                        <div className="label">授权地区</div>
                                        <Picker data={region} title="授权地区" cols={1} onChange={ this.onChangeRegionOption.bind(this, k) }>
                                            <div className="sx">
                                                {
                                                    (() => {
                                                        switch (v.region_text) {
                                                            case 1:
                                                                return '中国';
                                                            case 2:
                                                                return '全球';
                                                            default:
                                                                return '请选择';
                                                        }
                                                    })()
                                                }
                                            </div>
                                        </Picker>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="select" onClick={ this.onChangeAllItemChecked }>
                            <div className="checkbox">
                                <input type="checkbox" checked={ this.state.all_checked } className="check" id="all-check"/>
                                <label htmlFor="all-check">全选</label>
                            </div>
                        </div>
                        <div className="total">
                            <span className="text1">合计：</span>
                            <span className="text2">￥{ this.state.total_price }</span>
                        </div>
                    </div>
                    <div className="right">结算(1)</div>
                </div>
            </div>
        )
    }
}