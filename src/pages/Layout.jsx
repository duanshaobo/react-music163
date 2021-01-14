import React, { Component,Suspense } from 'react';
// 按需导入antd
import { PageHeader, Button } from 'antd';
// 导入页面样式
import '../assets/css/layout.css';

// 导入路由组件
import { HashRouter as Router, NavLink } from 'react-router-dom';

import RouterView from '../router/RouterView';
// 路由对象数组
import routes from '../router/routes';

export default class Layout extends Component {
    render() {
        return (
            <Router>
                <div className="layout-container">
                    <div className="header">
                        <PageHeader
                            className="site-page-header"
                            title="优音乐"
                        />
                        <Button className="btn-download" shape="round">下载App</Button>
                    </div>
                    {/* 路由导航链接 */}
                    <div className="navbar">
                        <NavLink to="/recommend">推荐</NavLink>
                        <NavLink to="/hot">热歌</NavLink>
                        <NavLink to="/search">搜索</NavLink>
                    </div>
                    {/* 配置路由规则 */}
                    <Suspense fallback={<h1>loading...</h1>}>
                        <RouterView routes={routes}/>
                    </Suspense>
                </div>
            </Router>
        )
    }
}
