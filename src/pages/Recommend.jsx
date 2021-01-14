import React, { Component } from 'react';
// 导入页面样式文件
import '../assets/css/recommend.css';

import { Carousel, List, Card } from 'antd';

// 按需导入图标
import { PlayCircleOutlined } from '@ant-design/icons';


export default class Recommend extends Component {
    // 定义状态数据
    state = {
        // 轮播图
        banners: [],
        // 推荐歌单
        songList: [],
        // 最新音乐
        newSong:[]
    }
    // 获取轮播图
    getBanner() {
        this.$http.get('/banner').then(data => {
            // console.log(data);
            if (data.code === 200) {
                // 更新数据
                this.setState({ banners: data.banners });
            }
        })
    }

    // 请求歌单
    getSongList() {
        this.$http.get('/personalized').then(data => {
            if (data.code === 200) {
                // 更新数据
                this.setState({ songList: data.result });
            }
        })
    }
    // 最新音乐
    getNewSong(){
        this.$http.get('/personalized/newsong').then(data=>{
            if(data.code===200){
                // 更新数据
                this.setState({newSong:data.result});
            }
        })
    }

    componentWillMount() {
        this.getBanner();
        this.getSongList();
        this.getNewSong();
    }

    render() {
        return (
            <div className="rec-container">
                {/* 轮播图 */}
                <Carousel>
                    {
                        this.state.banners.map(item => (
                            <div key={item.targetId}>
                                <img src={item.imageUrl} alt="" />
                            </div>
                        ))
                    }
                </Carousel>
                {/* 推荐歌单 */}
                <div className="section">
                    <h3>推荐歌单</h3>
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={this.state.songList}
                        renderItem={item => (
                            <List.Item>
                                <Card onClick={()=>this.props.history.push(`/songlist/${item.id}`)}>
                                    <img src={item.picUrl} alt="" />
                                    <h5>{item.name.substr(0,8)}...</h5>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

                {/* 最新音乐 */}
                <div className="section">
                    <h3>最新音乐</h3>
                    <List
                        size="large"
                        dataSource={this.state.newSong}
                        renderItem={item => <List.Item
                            onClick={()=>this.props.history.push(`/play/${item.id}`)}
                            actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name}</List.Item>}
                    />
                </div>
            </div>
        )
    }

    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount(){
        this.setState=()=>{return false}
    }
}
