import React, { Component } from "react"
import './index.scss'

export default class Qr extends Component {
    state = {
        url: ''
    };
    componentDidMount() {
        let url = window.atob(this.props.match.params.url);
        this.setState({url});
        this.listenPayState();
    }

    listenPayState = () => {
        let ws = new WebSocket('ws://59.110.20.181:2346');
        let timer;
        ws.onopen = () => {
            timer = setInterval(() => {
                ws.send(this.props.location.search.split('=')[1]);
            }, 1000);
        };
        ws.onmessage = (evt) => {
            if (parseInt(evt.data)) {
                clearInterval(timer);
                ws.close();
            } else {
                console.log(0);
            }
        };
    };

    render() {
        return (
            <div className="qr">
                <img src={ this.state.url } />
            </div>
        )
    }


}