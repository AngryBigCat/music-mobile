import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';
import Menu from './menu';
import { withRouter } from 'react-router-dom';

class Nav extends Component {

    state = {
      menuShow: false
    };

    onOpenMenu = () => {
        this.setState({ menuShow: true });
    };

    handleCloseMenu = () => {
        this.setState({ menuShow: false });
    };

    onSearchSubmit = () => {
        let v = this.refs.searchBar.state.value;
        this.props.history.push(`/search?q=${v}`);
    };

    render() {
        return (
            <div className="nav">
                <div className="nav-header">
                    <div className="nav-container">
                        <div className="list">
                            <img src="/img/list.png" alt="list" onClick={ this.onOpenMenu } />
                        </div>
                        <div className="search">
                            <SearchBar ref="searchBar" placeholder="请搜索您想查询的音乐" onSubmit={ this.onSearchSubmit } />
                        </div>
                        <div className="cart">
                            <img src="/img/cart.png" alt="cart" onClick={ () => this.props.history.push('/cart')  }/>
                        </div>
                    </div>
                </div>
                <Menu menuShow={ this.state.menuShow } {...this.props} handleCloseMenu={ this.handleCloseMenu } />
            </div>
        )
    }
}

export default withRouter(Nav);