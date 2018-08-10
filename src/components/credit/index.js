import React, { Component } from "react"
import './index.scss'

export default class Credit extends Component {
    state = {

    };

    componentDidMount() {

    }


    onNavTo = (type) => {
        this.props.history.push("/c/" + type);
    };

    render() {
        return (
            <div className="credit">
                <header>
                    <span/>
                    授权说明
                </header>
                <div className="main">
                    <div onClick={ this.onNavTo.bind(this, "classify") }>授权分类说明</div>
                    <div onClick={ this.onNavTo.bind(this, "flow") }>授权流程介绍</div>
                    <div onClick={ this.onNavTo.bind(this, "legal") }>著作权法律说明</div>
                    <div onClick={ this.onNavTo.bind(this, "attach") }>音乐授权实务补充知识</div>
                </div>
            </div>
        )
    }
}