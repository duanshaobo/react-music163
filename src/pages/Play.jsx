import React, { Component } from 'react';
// 导入页面样式
import '../assets/css/play.css';

export default class Play extends Component {
    state = {
        // true:表示暂停, flase表示播放
        playStatus: true,
        // 音乐详情
        info: {},
        // 歌词
        lyric: [],
        // 音乐播放地址
        playUrl:''
    }
    // 切换播放状态
    toggleStatus() {
        this.setState({ playStatus: !this.state.playStatus },()=>{
            // play: 实现音乐播放
            // pause: 暂停播放
            if(this.state.playStatus){
                this.refs.audio.pause();
            }else{
                this.refs.audio.play();
            }
        });

    }

    // 获取音乐详情
    getDetail() {
        this.$http.get('/song/detail', { params: { ids: this.props.match.params.id } }).then(data => {
            if (data.code === 200) {
                // 更新数据
                const info = data.songs[0];
                this.setState({ info: info.al });
            }
        })
    }
    // 获取歌词
    getLyric() {
        const id = this.props.match.params.id;
        this.$http.get('/lyric', { params: { id } }).then(data => {
            if (data.code === 200) {
                // 格式化歌词
                const lyric = this.lyricFmt(data.lrc.lyric);
                // 更新数据
                this.setState({ lyric });
            }
        })
    }

    // 获取音乐播放地址
    getPlayUrl(){
        const id=this.props.match.params.id;
        this.$http.get('/song/url',{
            params:{id}
        }).then(data=>{
            if(data.code===200){
                this.setState({playUrl:data.data[0].url});
            }
        });
    }

    // 歌词格式化
    lyricFmt(lyric) {
        const reg = /(\[.*\])(.*)/g;
        const res = [];
        lyric.replace(reg, function (all, first, second) {
            if (second !== '') {
                res.push(second);
            }
        });
        return res;
    }

    componentWillMount() {
        if(isNaN(this.props.match.params.id)){
           return this.props.history.push('/recommend')
        }
        this.getDetail();
        this.getLyric();
        this.getPlayUrl();
    }

    render() {
        const { info } = this.state;
        return (
            <div className="play-container">
                <div className="play-tools" style={{ transform: `rotate(${this.state.playStatus ? -15 : 0}deg)` }}></div>
                <div className="play-box">
                    <img src={info.picUrl} alt="" />
                    <div onClick={() => this.toggleStatus()} className={['btn', this.state.playStatus ? 'btn-play' : 'btn-pause'].join(' ')}></div>
                </div>
                <div className="content">
                    <h3>{info.name}</h3>
                    {this.state.lyric.map((item, index) => <p key={index}>{item}</p>)}
                </div>
                <audio ref="audio" src={this.state.playUrl} controls style={{display:'none'}}/>
            </div>
        )
    }


    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount(){
        this.setState=()=>{return false}
    }
}
