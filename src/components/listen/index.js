import React, { Component } from 'react';
import "./index.scss"
import { Slider } from "antd-mobile"
import { getMusic } from "../../api"

export default class Listen extends Component {
    state = {
        progressState: 0,
        durationTime: "0:00",
        currentTime: "0:00",
        musicFilePath: '',
        musicName: '',
        timer: null,
        durationFlag: false
    };
    componentDidMount() {
        this.setMusic();
    }
    setMusic() {
        let musicFilePath = "http://youbanquan.oss-cn-shanghai.aliyuncs.com/music/";
        getMusic(this.props.match.params.id).then((res) => {
            let musicName = res.data.music.name;
            musicFilePath += res.data.music.filename;
            this.setState({musicFilePath, musicName});
        });
    }
    durationComputed() {
        if (this.state.durationFlag) return;
        let durationFlag = true;
        let second =  Math.floor(this.refs.audio.duration % 60);
        if (second < 10) {
            second = "0" + second;
        }
        let durationTime = Math.floor(this.refs.audio.duration / 60) + ":" + second;
        this.setState({ durationTime, durationFlag });
    }
    currentTimeIncrement = () => {
        let timer = setInterval(() => {
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
        this.clearCurrentTimeInterval();
        this.setState({timer})
    };
    clearCurrentTimeInterval() {
        if (this.state.timer) {
            clearInterval(this.state.timer)
        }
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
            this.refs.audio.play();
            this.currentTimeIncrement();
            this.durationComputed();
        } else {
            e.target.classList.remove("fa-pause-circle-o");
            e.target.classList.add("fa-play-circle-o");
            this.refs.disk.classList.remove("run");
            this.refs.disk.classList.add("pause");
            this.refs.audio.pause();
            this.clearCurrentTimeInterval();
        }
    };
    onBackToPage = () => {
        this.clearCurrentTimeInterval();
        this.refs.audio.pause();
        this.props.history.goBack();
    };
    render() {
        return (
            <div className="listen">
                <audio src="/static/media/watermark.mp3" loop autoPlay ref="watermark" />
                <audio src={ this.state.musicFilePath } ref="audio"/>
                <div className="player">
                    <div className="header">
                        <i className="fa fa-chevron-left backBtn" onClick={ this.onBackToPage }/>
                        <div className="title">{ this.state.musicName }</div>
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