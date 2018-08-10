import React, { Component } from "react"
import './index.scss'

export default class CreditChild extends Component {
    state = {
        url: ''
    };

    componentDidMount() {
        switch (this.props.match.params.name) {
            case "classify":
                this.setState({url: "/img/credit/classify.jpg"});
                break;
            case "flow":
                this.setState({url: "/img/credit/flow.jpg"});
                break;
            case "legal":
                this.setState({url: "/img/credit/legal.jpg"});
                break;
            case "attach":
                this.setState({url: "/img/credit/attach.jpg"});
                break;
        }
    }


    render() {
        return (
            <div className="credit-child">
                <img src={ this.state.url }/>
            </div>
        )
    }
}