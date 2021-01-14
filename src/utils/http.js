// 导入react
import React from 'react';
// 导入axios
import axios from 'axios';
// 配置基础域名
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = '/api';
} else {
    axios.defaults.baseURL = 'http://localhost:4000';
}


// 响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
});

// 将axios挂载到react的原型对象上, 方便在组件中直接通过this调用
React.Component.prototype.$http = axios;

// 导出
export default axios;