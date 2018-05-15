import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const MenuData = [
    {
        item: 'meun-1',
        nav: [
            {
                icon: '/img/menu/shouye.png',
                text: '首页',
                path: '/home'
            },
            {
                icon: '/img/menu/yinyue.png',
                text: '音乐查找'
            },
            {
                icon: '/img/menu/xiaoshou.png',
                text: '销售排行榜'
            },
            {
                icon: '/img/menu/dingzhi.png',
                text: '定制配乐'
            }
        ]
    },
    {
        item: 'meun-2',
        nav: [
            {
                icon: '/img/menu/shouquan.png',
                text: '授权证书说明'
            },
            {
                icon: '/img/menu/zhengshu.png',
                text: '证书查询'
            }
        ]
    },
    {
        item: 'meun-3',
        nav: [
            {
                icon: '/img/menu/kehu.png',
                text: '客户案例'
            },
            {
                icon: '/img/menu/lianxi.png',
                text: '联系我们'
            }
        ]
    },
];
export default class Menu extends Component {
    render() {
        return this.props.menuShow && (
            <div className="menu-side">
                <div className="head">
                    <div className="top">
                        <span onClick={ this.props.handleCloseMenu } />
                    </div>
                    <div className="logo">
                        <img src="/img/menu/logo.png" alt="logo"/>
                    </div>
                    <div className="opration">
                        <Link className="a" to="/login">登录</Link> | <Link  className="a" to="/register">注册</Link>
                    </div>
                    <div className="text">
                        <img src="/img/menu/text.png" alt="text"/>
                    </div>
                </div>
                {
                    MenuData.map((v, k) => (
                        <div className="menu-list" key={k}>
                            {
                                v.nav.map((vv, kk) => (
                                    <div className="menu-item" key={kk} onClick={() => {
                                        this.props.history.push(vv.path);
                                        this.props.handleCloseMenu();
                                    } }>
                                        <span className="icon" style={{ backgroundImage: `url(${vv.icon})` }} />
                                        { vv.text }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <div className="bottom-logo">
                    <img src="/img/logo_bottom.png" alt="logo_bottom"/>
                </div>
            </div>
        )
    }
}