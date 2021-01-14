import React, { Component } from 'react';
// 导入页面样式
import '../assets/css/hot.css';
// 按需导入antd
import { List } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
export default class Hot extends Component {
    state={
        // 音乐列表
        list:[],
        // 封面图
        coverImg:''
    }
    // 获取热歌列表
    getList(){
        this.$http.get('/top/list?idx=1').then(data=>{
            if(data.code===200){
                this.setState({list:data.playlist.tracks,coverImg:data.playlist.coverImgUrl});
            }
        })
    }
    componentWillMount(){
        this.getList();
    }
    render() {
        return (
            <div className="hot-container">
                {/* 热歌封面 */}
                <div className="cover" style={{backgroundImage:'url('+this.state.coverImg+')'}}></div>
                {/* 音乐列表 */}
                <List
                        size="large"
                        dataSource={this.state.list}
                        renderItem={item => <List.Item
                            onClick={()=>this.props.history.push(`/play/${item.id}`)}
                            actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name}</List.Item>}
                    />
            </div> 
        )
    }
    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount(){
        this.setState=()=>{return false}
    }
}
