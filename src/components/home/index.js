import React, { Component } from 'react';
import './index.scss';
import { Toast, Carousel } from 'antd-mobile';
import { getMusicList, addMusicToCart, getHome } from "../../api"

const SectionTitle = (props) => (
    <div className="section-title">
        <div className="red" />
        <div className="title">{ props.title }<small>{ props.text }</small></div>
    </div>
);

export default class Home extends Component {
    state = {
      musics: [],
        text: '',
    };

    onAddMusicToCart = (musicId) => {
        if (localStorage.getItem('token')) {
            addMusicToCart.call(this, musicId);
            Toast.success("添加购物车成功!");
        } else {
            this.props.history.push('/login');
        }
    };

    componentDidMount = () => {
        getMusicList().then(res => {
            let musics = res.data.musics;
            this.setState({ musics });
        });

        getHome().then(({data}) => {
            this.setState({text: data.text})
        });
    };

    render() {
        return (
            <div className='Home'>
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
                    <div className="info" dangerouslySetInnerHTML={ {__html: this.state.text } } />
                </section>
                {/*<section className="classic">
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
                </section>*/}
                <section className="newest">
                    <SectionTitle title="最新促销" text="Newest" />
                    <div className="container">
                        {
                            this.state.musics.map((val, key) => (
                                <div className="item" key={key}>
                                    <table>
                                        <caption>{ val.name }</caption>
                                        <thead>
                                        <tr>
                                            <th>曲名</th>
                                            <th>编号</th>
                                            <th>曲风</th>
                                            <th>时间</th>
                                            <th>试听</th>
                                            <th>购买</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            val.musics.map((v, k) => (
                                                <tr key={k}>
                                                    <td>{ v.name }</td>
                                                    <td>{ v.number }</td>
                                                    <td>{ v.class }</td>
                                                    <td>{ v.duration }</td>
                                                    <td>
                                                        <i className="fa fa-play-circle-o"  onClick={ () => {
                                                            this.props.history.push(`/listen/${v.id}`)
                                                        } } />
                                                    </td>
                                                    <td>
                                                        <i className="fa fa-shopping-cart"  onClick={ this.onAddMusicToCart.bind(this, v.id) } />
                                                    </td>
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
                                    id: 2701,
                                    title: '晨光希望',
                                    img: '/img/case/case1.jpg'
                                },
                                {
                                    id: 87,
                                    title: '乐活一天',
                                    img: '/img/case/case2.jpg'
                                },
                                {
                                    id: 2752,
                                    title: '时尚台北',
                                    img: '/img/case/case3.jpg'
                                },
                                {
                                    id: 2464,
                                    title: '流动曙光',
                                    img: '/img/case/case4.jpg'
                                },
                                {
                                    id: 764,
                                    title: '踢踏舞会',
                                    img: '/img/case/case5.jpg'
                                },
                                null
                            ].map((v, k) => {
                                return k !== 5 ? (
                                    <div className="item" key={k} onClick={ () => this.props.history.push(`/listen/${v.id}`) }>
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