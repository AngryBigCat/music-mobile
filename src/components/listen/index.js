import React, { Component } from 'react';
import "./index.scss"
import { Slider } from "antd-mobile"
import { getMusic } from "../../api"

export default class Listen extends Component {
    state = {
        progressState: 0,
        durationTime: "0:00",
        currentTime: "0:00"
    };
    componentWillMount() {
        let music = getMusic(37);
    }
    componentDidMount() {
        this.durationComputed();
        this.currentTimeIncrement();
    }
    durationComputed() {
        setTimeout(() => {
            let durationTime = Math.floor(this.refs.audio.duration / 60) + ":" + Math.floor(this.refs.audio.duration % 60);
            this.setState({
                durationTime
            });
        }, 1000);
    }
    currentTimeIncrement() {
        setInterval(() => {
            // 进度条
            let progressState = this.refs.audio.currentTime / this.refs.audio.duration * 100;
            // 当前播放时间
            let second = Math.floor(this.refs.audio.currentTime) % 60;
            let minute = Math.floor(this.refs.audio.currentTime / 60);
            if (second < 10) {
                second = "0" + second
            }
            let currentTime = minute + ":" + second;
            //更新
            this.setState({currentTime, progressState});
            //删除定时器
            if (this.refs.audio.currentTime >= this.refs.audio.duration) {
                this.refs.playBtn.classList.remove("fa-pause-circle-o");
                this.refs.playBtn.classList.add("fa-play-circle-o");
                this.refs.disk.classList.remove("run");
                this.refs.disk.classList.add("pause");
                this.setState({
                    progressState: 0,
                    currentTime: "0:00"
                })
            }
        }, 1000);
    }
    onChangeSlider = (v) => {
        this.refs.audio.currentTime = this.refs.audio.duration * v / 100;
    };
    onToggleAudioPlay = (e) => {
        if (this.refs.audio.paused) {
            e.target.classList.remove("fa-play-circle-o");
            e.target.classList.add("fa-pause-circle-o");
            this.refs.disk.classList.remove("pause");
            this.refs.disk.classList.add("run");
            this.refs.audio.play()
        } else {
            e.target.classList.remove("fa-pause-circle-o");
            e.target.classList.add("fa-play-circle-o");
            this.refs.disk.classList.remove("run");
            this.refs.disk.classList.add("pause");
            this.refs.audio.pause()
        }
    };
    onBackToPage = () => {
        alert("返回");
    };
    render() {
        return (
            <div className="listen">
                <audio src="/test/bgm.mp3" ref="audio"/>
                <div className="player">
                    <div className="header">
                        <i className="fa fa-chevron-left backBtn" onClick={ this.onBackToPage }/>
                        <div className="title">巴西漫游</div>
                    </div>
                    <div className="main">
                        <div className="disk pause" ref="disk">
                            <img src="/img/listen/music.png" alt="music"/>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="progress">
                            <div className="currentTime">{ this.state.currentTime }</div>
                            <div className="slider">
                                <Slider
                                    onChange={ this.onChangeSlider }
                                    handleStyle={{ borderColor: "#d51807" }}
                                    trackStyle={{ backgroundColor: "#d51807" }}
                                    value={this.state.progressState}
                                />
                            </div>
                            <div className="durationTime">{ this.state.durationTime }</div>
                        </div>
                        <div className="control">
                            <div className="play"><i className="fa fa-play-circle-o" ref="playBtn" onClick={ this.onToggleAudioPlay } /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}