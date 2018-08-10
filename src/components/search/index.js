import React, { Component } from "react"
import './index.scss'
import { getSearch, addMusicToCart } from "../../api"
import { Toast } from 'antd-mobile'

export default class Search extends Component {
    state = {
        q: '',
        musics: []
    };
    componentDidMount() {
        this.onSearch();
    }
    componentDidUpdate() {
        this.onSearch();
    }
    onSearch() {
        Toast.loading("loading...");
        let q =  decodeURI(this.props.location.search.substr(1).split("=")[1]);
        if (q !== this.state.q) {
            this.setState({ q });
            getSearch(q).then((res) => {
                let musics = res.data.musics;
                this.setState({musics});
                Toast.hide();
            });
        }
    }

    onAddMusicToCart = (musicId) => {
        addMusicToCart.call(this, musicId);
        Toast.success("添加购物车成功!");
    };

    render() {
        return (
            <div className="search">
                <table cellSpacing="0">
                    <thead>
                        <tr>
                            <th>歌名</th>
                            <th>编号</th>
                            <th>曲风</th>
                            <th>时间</th>
                            <th>试听</th>
                            <th>购买</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.musics.map((v, k) => (
                            <tr key={ k }>
                                <td>{ v.name }</td>
                                <td>{ v.number }</td>
                                <td>{
                                    ((str)=> {
                                         if (str.length > 5) {
                                            return str.substr(0, 5);
                                         }
                                         return str;
                                    })(v.class)}
                                </td>
                                <td>{ v.duration }</td>
                                <td><i className="fa fa-play-circle-o" onClick={ () => this.props.history.push(`/listen/${v.id}`) } /></td>
                                <td><i className="fa fa-shopping-cart" onClick={ this.onAddMusicToCart.bind(this, v.id) } /></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}