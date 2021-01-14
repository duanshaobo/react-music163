import React, { Component } from 'react';
// 导入页面样式
import '../assets/css/search.css';
import { Input, Divider, Button, List, message } from 'antd';
import { SearchOutlined, PlayCircleOutlined } from '@ant-design/icons';

export default class Search extends Component {

    state = {
        // 搜索热词
        hots: [],
        // 搜索关键词
        keywords: '',
        // 搜索结果
        list: []
    }
    // 获取搜索热词
    getHotkey() {
        this.$http.get('/search/hot').then(data => {
            if (data.code === 200) {
                this.setState({
                    hots: data.result.hots
                });
            }
        })
    }

    // 搜索
    search() {
        if (this.state.keywords.trim() === '') {
            return message.warning('请输入搜索关键词');
        }
        this.$http.get('/search', {
            params: { keywords: this.state.keywords }
        }).then(data => {
            if (data.code === 200) {
                // 更新数据
                this.setState({ list: data.result.songs });
            }
        })
    }

    // 提交搜索
    submit(e) {
        if (e.keyCode === 13) {
            this.search();
        }
    }

    componentWillMount() {
        this.getHotkey();
    }
    // 手动同步数据
    keywordsUpdate(e) {
        this.setState({ keywords: e.target.value });
    }
    // 点击搜索热词实现音乐搜索
    handle(keywords) {
        // 1-更新数据keywords&&2-执行搜索操作
        this.setState({ keywords }, () => {
            this.search();
        });
    }

    render() {
        return (
            <div className="search-container">
                <Input onKeyUp={(e) => this.submit(e)} value={this.state.keywords} onChange={(e) => this.keywordsUpdate(e)} size="large" placeholder="搜索关键词" prefix={<SearchOutlined />} />
                <Divider />
                {/* 搜索热词 */}
                <div className="hot-keywords">
                    {
                        this.state.hots.map((item, index) => <Button onClick={() => this.handle(item.first)} key={index} shape="round">{item.first}</Button>)
                    }
                </div>
                <Divider />
                {/* 搜索结构 */}
                <List
                    size="large"
                    dataSource={this.state.list}
                    renderItem={item => <List.Item
                        onClick={()=>this.props.history.push(`/play/${item.id}`)}
                        actions={[<PlayCircleOutlined style={{ fontSize: 22 }} />]}>{item.name.substr(0,20)}...</List.Item>}
                />
            </div>
        )
    }

    // 组件即将卸载的时候, 对this.setState()进行重写
    componentWillUnmount(){
        this.setState=()=>{return false}
    }
}
