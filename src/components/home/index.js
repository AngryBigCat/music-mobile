import React, { Component } from 'react';
import './index.scss';
import { Carousel, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';

const SectionTitle = (props) => (
    <div className="section-title">
        <div className="red" />
        <div className="title">{ props.title }<small>{ props.text }</small></div>
    </div>
);

const MenuData = [
    {
        item: 'meun-1',
        nav: [
            {
                icon: '/img/menu/shouye.png',
                text: '首页'
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
const Menu = (props) => {
    return props.menuShow && (
        <div className="menu">
            <div className="head">
                <div className="top"><span onClick={ props.handleCloseMenu }>X</span></div>
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
                                <div className="menu-item" key={kk}>
                                    <span className="icon" style={{ backgroundImage: `url(${vv.icon})` }}></span>
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
};

export default class Home extends Component {
    state = {
        menuShow: false,
    };

    onOpenMenu = () => {
        this.setState({ menuShow: !this.state.menuShow });
    };

    handleCloseMenu = () => {
        this.setState({ menuShow: false });
    };

    onRedirectLoginPage = () => {
    };

    onRedirectRegisterPage = () => {
        console.log(this.props);
    };

    render() {
        return (
            <div className='Home'>
                <div className="nav">
                    <div className="nav-container">
                        <div className="list">
                            <img src="/img/list.png" alt="list" onClick={ this.onOpenMenu } />
                        </div>
                        <div className="search">
                            <SearchBar placeholder="请搜索您想查询的音乐" />
                        </div>
                        <div className="cart">
                            <img src="/img/cart.png" alt="cart" />
                        </div>
                    </div>
                </div>
                <Menu menuShow={ this.state.menuShow } handleCloseMenu={ this.handleCloseMenu }/>

                <div className="banner">
                    <Carousel autoplay>
                        {
                            [
                                '/img/banner1.png',
                                '/img/banner2.png',
                                '/img/banner3.png'
                            ].map((src, key) => (
                                <div className="item" key={key}>
                                    <img src={ src } alt=""/>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
                <section className="introduction">
                    <SectionTitle title="公司介绍" text="Introduction" />
                    <div className="info">
                        美论文化传播创立于2009年，是一家专注于品牌形象建设和品牌传播的网络服务机构，致力于为企业提供全面、丰富的网络解决方案。在网站创意设计、营销推广到技术研发领域拥有丰富经验，我们通过建立对目标客户和用户行为的分析，整合高质量设计和最新技术，为您打造创意十足、有价值的品牌营销一站式服务体验。
                    </div>
                </section>
                <section className="classic">
                    <SectionTitle title="音乐分类" text="Music" />
                    <div className="container">
                        {
                            ['激烈、热血', '浪漫、爱情', '商业广告'].map((val, key) => (
                                <div className="item" key={key}>{ val }</div>
                            ))
                        }
                    </div>
                    <div className="bottom">
                        <button className="view-all" >查看全部</button>
                    </div>
                </section>
                <section className="newest">
                    <SectionTitle title="最新促销" text="Newest" />
                    <div className="container">
                        {
                            ['热门曲目', '最新加入'].map((val, key) => (
                                <div className="item" key={key}>
                                    <table>
                                        <caption>{ val }</caption>
                                        <thead>
                                        <tr>
                                            <th>曲名</th>
                                            <th>编号</th>
                                            <th>曲风</th>
                                            <th>时间</th>
                                            <th>播放</th>
                                            <th>购买</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            Array.from(new Array(9)).map((v, k) => (
                                                <tr key={k}>
                                                    <td>巴西漫游</td>
                                                    <td>565050053</td>
                                                    <td>温馨</td>
                                                    <td>00:32</td>
                                                    <td>播放</td>
                                                    <td>购买</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section className="case">
                    <SectionTitle title="成功案例" text="Case" />
                    <div className="container">
                        {
                            [
                                {
                                    title: '晨光希望',
                                    img: '/img/case/case1.jpg'
                                },
                                {
                                    title: '乐活一天',
                                    img: '/img/case/case2.jpg'
                                },
                                {
                                    title: '时尚台北',
                                    img: '/img/case/case3.jpg'
                                },
                                {
                                    title: '流动曙光',
                                    img: '/img/case/case4.jpg'
                                },
                                {
                                    title: '踢踏舞会',
                                    img: '/img/case/case5.jpg'
                                },
                                null
                            ].map((v, k) => {
                                return k !== 5 ? (
                                    <div className="item" key={k}>
                                        <div className="img">
                                            <div className="mask">
                                                <img src="/img/case/click.png" alt="click"/>
                                            </div>
                                            <img src={v.img} alt="case"/>
                                        </div>
                                        <div className="title">曲名：{v.title}</div>
                                    </div>
                                ) : (
                                    <div className="item" key={k}>
                                        <div className="img">
                                            <div>查看更多</div>
                                        </div>
                                        <div className="title"/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
                <section className="cooperation">
                    <SectionTitle title="合作品牌" text="Cooperation" />
                    <div className="container">
                        {
                            [
                                '/img/cooperation/logo1.png',
                                '/img/cooperation/logo2.png',
                                '/img/cooperation/logo3.png',
                                '/img/cooperation/logo4.png',
                                '/img/cooperation/logo5.png',
                                '/img/cooperation/logo6.png',
                                '/img/cooperation/logo7.png',
                                '/img/cooperation/logo8.png',
                                '/img/cooperation/logo9.png',
                                '/img/cooperation/logo10.png'
                            ].map((v, k) => (
                                <div className="item" key={k}>
                                    <img src={v} alt="logo"/>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section className="contact">
                    <SectionTitle title="联系我们" text="Contact" />
                    <div className="container">
                        <div className="info">
                            <div>联系人：张经理</div>
                            <div>扣　扣：2881307300</div>
                            <div>手　机：15611816450</div>
                            <div>电　话：010-60739450(9:00-18:30)</div>
                            <div>官　网：www.youbanquan.com</div>
                        </div>
                        <div className="qrcode">
                            <img src="/img/qrcode.png" alt="qrcode"/>
                        </div>
                    </div>
                </section>
                <div className="footer">
                    <div className="top">
                        <div className="logo">
                            <img src="/img/logo_bottom.png" alt="logo"/>
                        </div>
                        <div className="return">返回 <a href="http://youbanquan.com">网页版</a></div>
                    </div>
                    <div className="bottom">
                        <p>ICP备案号:京ICP备14007627号-6</p>
                        <p>Copyright &copy; 2013-2018 Medialion. 美论文化传播(北京)有限公司</p>
                    </div>
                </div>
            </div>
        )
    }
}